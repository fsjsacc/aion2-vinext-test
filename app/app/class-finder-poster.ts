import type {
  ClassFinderClassId,
  ClassFinderResult,
} from "./class-finder-data";
import {
  editorialClassFinderPosterCopy,
  type ClassFinderPosterCopy,
} from "./class-finder-localization";
import type { SiteLocale } from "./site-config";

export const CLASS_FINDER_ICON_PATHS = {
  gladiator: "/class-icons/gladiator.png",
  templar: "/class-icons/templar.png",
  assassin: "/class-icons/assassin.png",
  ranger: "/class-icons/ranger.png",
  sorcerer: "/class-icons/sorcerer.png",
  spiritmaster: "/class-icons/spiritmaster.png",
  cleric: "/class-icons/cleric.png",
  chanter: "/class-icons/chanter.png",
} as const satisfies Record<ClassFinderClassId, string>;

const corePosterCopy = {
  "zh-hant": {
    eyebrow: "AION2 KINA · 職業適性結果",
    title: "最適合先了解的三個職業",
    subtitle: "依據你的玩法偏好生成",
    primary: "首選",
    rank: (rank: number) => `第 ${rank} 名`,
    match: "適配度",
    preferences: "符合你的偏好",
    footer: "結果只反映玩法偏好，不代表職業強度、版本排名或官方結論。",
  },
  en: {
    eyebrow: "AION2 KINA · CLASS MATCH",
    title: "Three classes to explore first",
    subtitle: "Generated from your playstyle preferences",
    primary: "TOP MATCH",
    rank: (rank: number) => `MATCH ${rank}`,
    match: "MATCH",
    preferences: "WHY IT MATCHES",
    footer: "This result reflects playstyle preferences, not class power, patch tiers, or an official verdict.",
  },
  ko: {
    eyebrow: "AION2 KINA · 직업 적합도 결과",
    title: "먼저 살펴볼 직업 3개",
    subtitle: "플레이 취향을 바탕으로 생성된 결과입니다",
    primary: "최우선 추천",
    rank: (rank: number) => `${rank}순위 추천`,
    match: "적합도",
    preferences: "추천 이유",
    footer: "이 결과는 플레이 취향만 반영하며 직업 성능, 패치 티어 또는 공식 평가가 아닙니다.",
  },
} as const satisfies Record<"zh-hant" | "en" | "ko", ClassFinderPosterCopy>;

const posterCopy: Record<SiteLocale, ClassFinderPosterCopy> = {
  ...corePosterCopy,
  ...editorialClassFinderPosterCopy,
};

const WIDTH = 1200;
const HEIGHT = 1500;
const FONT_STACK =
  '"Noto Sans TC", "Noto Sans KR", "Microsoft JhengHei", "Malgun Gothic", Arial, sans-serif';

type LoadedPosterAssets = {
  logo: HTMLImageElement;
  icons: Map<ClassFinderClassId, HTMLImageElement>;
};

export type ClassFinderPoster = {
  blob: Blob;
  fileName: string;
  height: number;
  width: number;
};

function loadImage(path: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load poster asset: ${path}`));
    image.src = path;
  });
}

async function loadPosterAssets(
  recommendations: readonly ClassFinderResult[],
): Promise<LoadedPosterAssets> {
  const logoPromise = loadImage("/aion2-logo.png");
  const iconEntries = await Promise.all(
    recommendations.map(async (result) => [
      result.classId,
      await loadImage(CLASS_FINDER_ICON_PATHS[result.classId]),
    ] as const),
  );

  return {
    logo: await logoPromise,
    icons: new Map(iconEntries),
  };
}

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
}

function drawContainedImage(
  context: CanvasRenderingContext2D,
  image: CanvasImageSource & { height: number; width: number },
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const scale = Math.min(width / image.width, height / image.height);
  const targetWidth = image.width * scale;
  const targetHeight = image.height * scale;
  context.drawImage(
    image,
    x + (width - targetWidth) / 2,
    y + (height - targetHeight) / 2,
    targetWidth,
    targetHeight,
  );
}

function textSegments(text: string, locale: SiteLocale) {
  if (typeof Intl.Segmenter === "function") {
    const segmenter = new Intl.Segmenter(locale, { granularity: "word" });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }
  return Array.from(text);
}

function wrapLines(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  locale: SiteLocale,
) {
  const lines: string[] = [];
  let current = "";

  for (const segment of textSegments(text, locale)) {
    const candidate = `${current}${segment}`;
    if (!current || context.measureText(candidate).width <= maxWidth) {
      current = candidate;
      continue;
    }
    lines.push(current.trim());
    current = segment.trimStart();
  }

  if (current.trim()) lines.push(current.trim());
  return lines;
}

function drawWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  locale: SiteLocale,
  maxLines = Number.POSITIVE_INFINITY,
) {
  const lines = wrapLines(context, text, maxWidth, locale).slice(0, maxLines);
  lines.forEach((line, index) => {
    let output = line;
    if (index === maxLines - 1 && wrapLines(context, text, maxWidth, locale).length > maxLines) {
      while (output && context.measureText(`${output}…`).width > maxWidth) {
        output = output.slice(0, -1);
      }
      output = `${output.trimEnd()}…`;
    }
    context.fillText(output, x, y + index * lineHeight);
  });
  return lines.length * lineHeight;
}

function drawPreferencePills(
  context: CanvasRenderingContext2D,
  preferences: readonly string[],
  x: number,
  y: number,
  maxWidth: number,
  locale: SiteLocale,
) {
  context.font = `600 24px ${FONT_STACK}`;
  context.fillStyle = "#d9e5f5";
  let offsetY = y;

  for (const preference of preferences.slice(0, 2)) {
    context.fillStyle = "#79d8ff";
    context.beginPath();
    context.arc(x + 7, offsetY - 8, 5, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "#d9e5f5";
    const usedHeight = drawWrappedText(
      context,
      preference,
      x + 24,
      offsetY,
      maxWidth - 24,
      34,
      locale,
      2,
    );
    offsetY += Math.max(42, usedHeight + 8);
  }
}

function drawPrimaryResult(
  context: CanvasRenderingContext2D,
  result: ClassFinderResult,
  icon: HTMLImageElement,
  locale: SiteLocale,
) {
  const copy = posterCopy[locale];
  const x = 72;
  const y = 372;
  const width = 1056;
  const height = 430;

  roundedRect(context, x, y, width, height, 34);
  context.fillStyle = "#111525";
  context.fill();
  context.strokeStyle = "#8a77d9";
  context.lineWidth = 3;
  context.stroke();

  context.fillStyle = "#a997ff";
  context.fillRect(x, y, width, 7);
  drawContainedImage(context, icon, x + 48, y + 54, 310, 310);

  const contentX = x + 408;
  context.fillStyle = "#b7a8ff";
  context.font = `800 22px ${FONT_STACK}`;
  context.fillText(copy.primary, contentX, y + 78);

  context.fillStyle = "#f7f9ff";
  context.font = `700 62px ${FONT_STACK}`;
  context.fillText(result.name, contentX, y + 158);

  context.fillStyle = "#95a4bb";
  context.font = `600 25px ${FONT_STACK}`;
  context.fillText(result.weapon, contentX, y + 205);

  context.fillStyle = "#f7f9ff";
  context.font = `800 54px ${FONT_STACK}`;
  context.fillText(`${Math.round(result.matchPercent)}%`, x + width - 178, y + 82);
  context.fillStyle = "#95a4bb";
  context.font = `700 18px ${FONT_STACK}`;
  context.textAlign = "right";
  context.fillText(copy.match, x + width - 48, y + 112);
  context.textAlign = "left";

  context.fillStyle = "#718099";
  context.font = `700 18px ${FONT_STACK}`;
  context.fillText(copy.preferences, contentX, y + 267);
  drawPreferencePills(
    context,
    result.matchedPreferences,
    contentX,
    y + 313,
    width - 456,
    locale,
  );
}

function drawSecondaryResult(
  context: CanvasRenderingContext2D,
  result: ClassFinderResult,
  icon: HTMLImageElement,
  locale: SiteLocale,
  x: number,
) {
  const copy = posterCopy[locale];
  const y = 832;
  const width = 516;
  const height = 430;

  roundedRect(context, x, y, width, height, 28);
  context.fillStyle = "#0d111d";
  context.fill();
  context.strokeStyle = "#283247";
  context.lineWidth = 2;
  context.stroke();

  context.fillStyle = "#82dcff";
  context.font = `800 20px ${FONT_STACK}`;
  context.fillText(copy.rank(result.rank), x + 32, y + 49);

  drawContainedImage(context, icon, x + 28, y + 76, 190, 190);

  context.fillStyle = "#f7f9ff";
  context.font = `700 43px ${FONT_STACK}`;
  drawWrappedText(context, result.name, x + 246, y + 132, 236, 50, locale, 2);

  context.fillStyle = "#95a4bb";
  context.font = `600 21px ${FONT_STACK}`;
  context.fillText(result.weapon, x + 246, y + 218);

  context.fillStyle = "#f7f9ff";
  context.font = `800 38px ${FONT_STACK}`;
  context.fillText(`${Math.round(result.matchPercent)}%`, x + 246, y + 269);
  context.fillStyle = "#718099";
  context.font = `700 16px ${FONT_STACK}`;
  context.fillText(copy.match, x + 362, y + 267);

  context.strokeStyle = "#283247";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(x + 32, y + 295);
  context.lineTo(x + width - 32, y + 295);
  context.stroke();

  context.fillStyle = "#718099";
  context.font = `700 16px ${FONT_STACK}`;
  context.fillText(copy.preferences, x + 32, y + 333);
  drawPreferencePills(
    context,
    result.matchedPreferences,
    x + 32,
    y + 376,
    width - 64,
    locale,
  );
}

function canvasToBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("The browser could not create the result image."));
    }, "image/png");
  });
}

export async function createClassFinderPoster(
  locale: SiteLocale,
  recommendations: readonly ClassFinderResult[],
): Promise<ClassFinderPoster> {
  if (recommendations.length < 3) {
    throw new Error("Three recommendations are required to create a result image.");
  }

  if (document.fonts?.ready) await document.fonts.ready;
  const assets = await loadPosterAssets(recommendations.slice(0, 3));
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is unavailable in this browser.");

  const copy = posterCopy[locale];
  context.fillStyle = "#070a13";
  context.fillRect(0, 0, WIDTH, HEIGHT);

  context.fillStyle = "#5cc8ff";
  context.fillRect(0, 0, WIDTH, 8);
  drawContainedImage(context, assets.logo, 72, 48, 158, 118);

  context.fillStyle = "#87ddff";
  context.font = `800 20px ${FONT_STACK}`;
  context.fillText(copy.eyebrow, 264, 91);

  context.fillStyle = "#f7f9ff";
  context.font = `700 62px ${FONT_STACK}`;
  context.fillText(copy.title, 72, 238);

  context.fillStyle = "#96a5bc";
  context.font = `500 27px ${FONT_STACK}`;
  context.fillText(copy.subtitle, 72, 294);

  const primary = recommendations[0];
  const second = recommendations[1];
  const third = recommendations[2];
  drawPrimaryResult(
    context,
    primary,
    assets.icons.get(primary.classId)!,
    locale,
  );
  drawSecondaryResult(
    context,
    second,
    assets.icons.get(second.classId)!,
    locale,
    72,
  );
  drawSecondaryResult(
    context,
    third,
    assets.icons.get(third.classId)!,
    locale,
    612,
  );

  context.strokeStyle = "#263047";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(72, 1321);
  context.lineTo(1128, 1321);
  context.stroke();

  context.fillStyle = "#8795aa";
  context.font = `500 22px ${FONT_STACK}`;
  drawWrappedText(context, copy.footer, 72, 1378, 820, 34, locale, 2);

  context.fillStyle = "#d8e5f4";
  context.font = `800 22px ${FONT_STACK}`;
  context.textAlign = "right";
  context.fillText("aion2kina.com", 1128, 1380);
  context.textAlign = "left";

  const blob = await canvasToBlob(canvas);
  return {
    blob,
    fileName: `aion2-kina-class-match-${primary.classId}-${locale}.png`,
    height: HEIGHT,
    width: WIDTH,
  };
}
