import type { Locale, MapInfo } from "./map-types";
import { numberLocaleForMapLocale } from "./i18n";

const CARD_WIDTH = 1200;
const CARD_HEIGHT = 630;
export const DEFAULT_SHARE_IMAGE_TIMEOUT_MS = 6_000;

const MAX_SHARE_IMAGE_TIMEOUT_MS = 30_000;

export type ShareCardAssetOptions = {
  signal?: AbortSignal;
  imageTimeoutMs?: number;
};

export type BaseShareCardOptions = ShareCardAssetOptions & {
  map: MapInfo;
  mapName: string;
  locale: Locale;
  shareUrl: string;
  linkLabel: string;
};

export type ProgressBreakdownItem = {
  name: string;
  foundCount: number;
  totalCount: number;
  iconUrl: string;
};

export type ProgressShareCardOptions = BaseShareCardOptions & {
  foundCount: number;
  totalCount: number;
  breakdown: ProgressBreakdownItem[];
  progressLabel: string;
  breakdownLabel: string;
  noBreakdownLabel: string;
};

export type PointShareCardOptions = BaseShareCardOptions & {
  markerName: string;
  categoryLabel: string;
  subtypeLabel: string;
  coordinates: string;
  region: string;
  iconUrl: string;
  pointLabel: string;
  coordinatesLabel: string;
  regionLabel: string;
};

export type RouteCardStep = {
  name: string;
  iconUrl: string;
};

export type RouteShareCardOptions = BaseShareCardOptions & {
  steps: RouteCardStep[];
  routeLabel: string;
  stopsLabel: string;
};

function abortError() {
  const error = new Error("Share image generation was cancelled");
  error.name = "AbortError";
  return error;
}

function isAbortError(error: unknown) {
  return error instanceof Error && error.name === "AbortError";
}

function throwIfAborted(signal?: AbortSignal) {
  if (signal?.aborted) throw abortError();
}

function imageTimeout(options: ShareCardAssetOptions) {
  if (options.imageTimeoutMs === undefined) return DEFAULT_SHARE_IMAGE_TIMEOUT_MS;
  if (!Number.isFinite(options.imageTimeoutMs)) return DEFAULT_SHARE_IMAGE_TIMEOUT_MS;
  return Math.min(MAX_SHARE_IMAGE_TIMEOUT_MS, Math.max(0, Math.floor(options.imageTimeoutMs)));
}

function loadImage(url: string, options: ShareCardAssetOptions) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    if (options.signal?.aborted) {
      reject(abortError());
      return;
    }

    const image = new Image();
    let settled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const cleanup = () => {
      if (timer !== null) globalThis.clearTimeout(timer);
      options.signal?.removeEventListener("abort", onAbort);
      image.onload = null;
      image.onerror = null;
    };
    const fail = (error: Error, cancelRequest = false) => {
      if (settled) return;
      settled = true;
      cleanup();
      if (cancelRequest) {
        try {
          image.src = "";
        } catch {
          // Some image mocks expose a read-only src; the promise should still settle.
        }
      }
      reject(error);
    };
    const onAbort = () => fail(abortError(), true);

    image.decoding = "async";
    image.onload = () => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(image);
    };
    image.onerror = () => fail(new Error(`Unable to load share image asset: ${url}`));
    options.signal?.addEventListener("abort", onAbort, { once: true });
    timer = globalThis.setTimeout(() => {
      const error = new Error(`Timed out loading share image asset: ${url}`);
      error.name = "TimeoutError";
      fail(error, true);
    }, imageTimeout(options));
    image.src = url;
  });
}

async function loadOptionalImage(url: string, options: ShareCardAssetOptions) {
  if (!url) return null;
  try {
    return await loadImage(url, options);
  } catch (error) {
    if (isAbortError(error)) throw error;
    return null;
  }
}

function roundedRectPath(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
}

function drawImageCover(
  context: CanvasRenderingContext2D,
  image: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const scale = Math.max(width / sourceWidth, height / sourceHeight);
  const cropWidth = width / scale;
  const cropHeight = height / scale;
  const sourceX = (sourceWidth - cropWidth) / 2;
  const sourceY = (sourceHeight - cropHeight) / 2;
  context.drawImage(image, sourceX, sourceY, cropWidth, cropHeight, x, y, width, height);
}

function fontFamily(locale: Locale) {
  if (locale === "zh-Hant") return '"Microsoft JhengHei", "Noto Sans TC", sans-serif';
  if (locale === "zh-Hans") return '"Microsoft YaHei", "Noto Sans SC", sans-serif';
  if (locale === "ja") return '"Yu Gothic", "Noto Sans JP", sans-serif';
  if (locale === "ko") return '"Malgun Gothic", "Noto Sans KR", sans-serif';
  if (locale === "ru") return '"Segoe UI", "Noto Sans", Arial, sans-serif';
  return '"Segoe UI", Arial, sans-serif';
}

function numberLocale(locale: Locale) {
  return numberLocaleForMapLocale(locale);
}

function fitText(
  context: CanvasRenderingContext2D,
  value: string,
  maxWidth: number,
  initialSize: number,
  minimumSize: number,
  family: string,
) {
  let size = initialSize;
  while (size > minimumSize) {
    context.font = `750 ${size}px ${family}`;
    if (context.measureText(value).width <= maxWidth) break;
    size -= 2;
  }
  return size;
}

function ellipsize(context: CanvasRenderingContext2D, value: string, maxWidth: number) {
  if (context.measureText(value).width <= maxWidth) return value;
  let shortened = value;
  while (shortened.length > 1 && context.measureText(`${shortened}…`).width > maxWidth) {
    shortened = shortened.slice(0, -1);
  }
  return `${shortened}…`;
}

async function createCardBase(options: BaseShareCardOptions) {
  throwIfAborted(options.signal);
  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas 2D rendering is unavailable");

  context.fillStyle = "#0a0e14";
  context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
  const landmark = await loadOptionalImage(`/landmarks/${options.map.slug}.webp`, options);
  if (landmark && landmark.naturalWidth > 0 && landmark.naturalHeight > 0) {
    drawImageCover(
      context,
      landmark,
      landmark.naturalWidth,
      landmark.naturalHeight,
      0,
      0,
      CARD_WIDTH,
      CARD_HEIGHT,
    );
  }
  const shade = context.createLinearGradient(0, 0, CARD_WIDTH, 0);
  shade.addColorStop(0, "rgba(5, 8, 12, 0.96)");
  shade.addColorStop(0.5, "rgba(7, 10, 15, 0.7)");
  shade.addColorStop(1, "rgba(6, 9, 13, 0.16)");
  context.fillStyle = shade;
  context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  const family = fontFamily(options.locale);
  context.fillStyle = "#f2c94c";
  context.font = `760 18px ${family}`;
  context.fillText("AION2 INTERACTIVE MAP", 52, 62);
  return { canvas, context, family };
}

function drawPanel(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
  roundedRectPath(context, x, y, width, height, 8);
  context.fillStyle = "rgba(6, 10, 15, 0.78)";
  context.fill();
  context.strokeStyle = "rgba(226, 232, 240, 0.22)";
  context.lineWidth = 2;
  context.stroke();
}

function drawLinkBand(
  context: CanvasRenderingContext2D,
  family: string,
  linkLabel: string,
  shareUrl: string,
) {
  context.fillStyle = "rgba(4, 7, 10, 0.94)";
  context.fillRect(0, 552, CARD_WIDTH, 78);
  context.fillStyle = "rgba(242, 201, 76, 0.82)";
  context.font = `720 14px ${family}`;
  context.fillText(linkLabel, 52, 581);
  context.fillStyle = "rgba(241, 245, 249, 0.92)";
  context.font = '500 16px Consolas, "Courier New", monospace';
  context.fillText(formatShareUrlForCard(shareUrl), 52, 610);
}

function canvasToBlob(canvas: HTMLCanvasElement, signal?: AbortSignal) {
  return new Promise<Blob>((resolve, reject) => {
    if (signal?.aborted) {
      reject(abortError());
      return;
    }

    let settled = false;
    const cleanup = () => signal?.removeEventListener("abort", onAbort);
    const onAbort = () => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(abortError());
    };
    signal?.addEventListener("abort", onAbort, { once: true });
    try {
      canvas.toBlob((blob) => {
        if (settled) return;
        settled = true;
        cleanup();
        if (blob) resolve(blob);
        else reject(new Error("Unable to encode the share image"));
      }, "image/png");
    } catch (error) {
      settled = true;
      cleanup();
      reject(error);
    }
  });
}

export function formatShareUrlForCard(value: string, maxLength = 112) {
  const limit = Number.isFinite(maxLength)
    ? Math.max(0, Math.floor(maxLength))
    : maxLength === Number.POSITIVE_INFINITY
      ? value.length
      : 0;
  if (value.length <= limit) return value;
  if (limit <= 3) return value.slice(0, limit);
  const availableLength = limit - 3;
  const tailLength = Math.min(12, Math.floor(availableLength / 3));
  const headLength = availableLength - tailLength;
  const tail = tailLength > 0 ? value.slice(-tailLength) : "";
  return `${value.slice(0, headLength)}...${tail}`;
}

export function progressShareCardFilename(map: MapInfo, locale: Locale) {
  return `aion2-${map.slug}-${locale}-progress.png`;
}

export function pointShareCardFilename(map: MapInfo, locale: Locale) {
  return `aion2-${map.slug}-${locale}-point.png`;
}

export function routeShareCardFilename(map: MapInfo, locale: Locale) {
  return `aion2-${map.slug}-${locale}-route.png`;
}

async function renderProgressShareCard(options: ProgressShareCardOptions) {
  const base = await createCardBase(options);
  const { canvas, context, family } = base;
  const icons = await Promise.all(
    options.breakdown.slice(0, 8).map((item) => loadOptionalImage(item.iconUrl, options)),
  );
  const titleSize = fitText(context, options.mapName, 520, 50, 30, family);
  context.fillStyle = "#f8fafc";
  context.font = `750 ${titleSize}px ${family}`;
  context.fillText(options.mapName, 52, 138);

  context.fillStyle = "rgba(226, 232, 240, 0.72)";
  context.font = `650 20px ${family}`;
  context.fillText(options.progressLabel, 52, 225);
  const locale = numberLocale(options.locale);
  const progressValue = `${options.foundCount.toLocaleString(locale)} / ${options.totalCount.toLocaleString(locale)}`;
  const percentage = options.totalCount > 0
    ? Math.round((options.foundCount / options.totalCount) * 100)
    : 0;
  context.fillStyle = "#ffffff";
  context.font = `780 64px ${family}`;
  context.fillText(progressValue, 52, 310);
  roundedRectPath(context, 52, 354, 500, 14, 7);
  context.fillStyle = "rgba(255, 255, 255, 0.14)";
  context.fill();
  if (percentage > 0) {
    roundedRectPath(context, 52, 354, Math.max(14, 500 * (percentage / 100)), 14, 7);
    context.fillStyle = "#4dd6c8";
    context.fill();
  }
  context.fillStyle = "#9cebe4";
  context.font = `720 22px ${family}`;
  context.fillText(`${percentage}%`, 52, 410);

  drawPanel(context, 620, 54, 528, 468);
  context.fillStyle = "#f8fafc";
  context.font = `740 21px ${family}`;
  context.fillText(options.breakdownLabel, 648, 91);
  if (options.breakdown.length === 0) {
    context.fillStyle = "rgba(226, 232, 240, 0.66)";
    context.font = `600 18px ${family}`;
    context.fillText(options.noBreakdownLabel, 648, 145);
  }
  options.breakdown.slice(0, 8).forEach((item, index) => {
    const y = 120 + index * 48;
    const icon = icons[index];
    if (icon) context.drawImage(icon, 648, y, 30, 30);
    else {
      context.beginPath();
      context.arc(663, y + 15, 7, 0, Math.PI * 2);
      context.fillStyle = "#4dd6c8";
      context.fill();
    }
    context.fillStyle = "rgba(248, 250, 252, 0.94)";
    context.font = `650 17px ${family}`;
    context.fillText(ellipsize(context, item.name, 310), 692, y + 21);
    context.fillStyle = item.foundCount === item.totalCount ? "#7de2b3" : "#cbd5e1";
    context.font = '700 17px Consolas, "Courier New", monospace';
    const count = `${item.foundCount.toLocaleString(locale)}/${item.totalCount.toLocaleString(locale)}`;
    context.fillText(count, 1118 - context.measureText(count).width, y + 21);
  });
  drawLinkBand(context, family, options.linkLabel, options.shareUrl);
  return canvasToBlob(canvas, options.signal);
}

async function renderPointShareCard(options: PointShareCardOptions) {
  const base = await createCardBase(options);
  const { canvas, context, family } = base;
  const icon = await loadOptionalImage(options.iconUrl, options);
  context.fillStyle = "rgba(226, 232, 240, 0.72)";
  context.font = `650 18px ${family}`;
  context.fillText(options.mapName, 52, 110);
  const titleSize = fitText(context, options.markerName, 520, 50, 28, family);
  context.fillStyle = "#ffffff";
  context.font = `760 ${titleSize}px ${family}`;
  context.fillText(options.markerName, 52, 180);
  context.fillStyle = "#9cebe4";
  context.font = `680 20px ${family}`;
  context.fillText(`${options.categoryLabel} / ${options.subtypeLabel}`, 52, 225);

  drawPanel(context, 620, 54, 528, 468);
  if (icon) context.drawImage(icon, 660, 94, 92, 92);
  context.fillStyle = "#f2c94c";
  context.font = `720 16px ${family}`;
  context.fillText(options.pointLabel, 782, 112);
  context.fillStyle = "#f8fafc";
  context.font = `740 24px ${family}`;
  context.fillText(ellipsize(context, options.markerName, 326), 782, 151);
  context.fillStyle = "rgba(226, 232, 240, 0.7)";
  context.font = `600 17px ${family}`;
  context.fillText(ellipsize(context, options.subtypeLabel, 326), 782, 181);
  context.strokeStyle = "rgba(226, 232, 240, 0.16)";
  context.beginPath();
  context.moveTo(650, 216);
  context.lineTo(1118, 216);
  context.stroke();
  const fields = [
    [options.coordinatesLabel, options.coordinates],
    [options.regionLabel, options.region || "-"],
  ];
  fields.forEach(([label, value], index) => {
    const y = 270 + index * 86;
    context.fillStyle = "rgba(226, 232, 240, 0.62)";
    context.font = `620 16px ${family}`;
    context.fillText(label, 654, y);
    context.fillStyle = "#ffffff";
    context.font = index === 0
      ? '720 25px Consolas, "Courier New", monospace'
      : `720 23px ${family}`;
    context.fillText(ellipsize(context, value, 430), 654, y + 38);
  });
  drawLinkBand(context, family, options.linkLabel, options.shareUrl);
  return canvasToBlob(canvas, options.signal);
}

async function renderRouteShareCard(options: RouteShareCardOptions) {
  const base = await createCardBase(options);
  const { canvas, context, family } = base;
  const icons = await Promise.all(
    options.steps.slice(0, 8).map((step) => loadOptionalImage(step.iconUrl, options)),
  );
  const titleSize = fitText(context, options.mapName, 520, 50, 30, family);
  context.fillStyle = "#f8fafc";
  context.font = `750 ${titleSize}px ${family}`;
  context.fillText(options.mapName, 52, 138);
  context.fillStyle = "rgba(226, 232, 240, 0.72)";
  context.font = `650 20px ${family}`;
  context.fillText(options.routeLabel, 52, 225);
  context.fillStyle = "#ffffff";
  context.font = `780 64px ${family}`;
  context.fillText(String(options.steps.length), 52, 310);
  context.fillStyle = "#9cebe4";
  context.font = `700 22px ${family}`;
  context.fillText(options.stopsLabel, 52, 354);

  drawPanel(context, 620, 54, 528, 468);
  context.fillStyle = "#f8fafc";
  context.font = `740 21px ${family}`;
  context.fillText(options.routeLabel, 648, 91);
  options.steps.slice(0, 8).forEach((step, index) => {
    const y = 118 + index * 47;
    context.beginPath();
    context.arc(665, y + 15, 15, 0, Math.PI * 2);
    context.fillStyle = "#f2c94c";
    context.fill();
    context.fillStyle = "#0a0e14";
    context.font = '760 14px "Segoe UI", Arial, sans-serif';
    const order = String(index + 1);
    context.fillText(order, 665 - context.measureText(order).width / 2, y + 20);
    const icon = icons[index];
    if (icon) context.drawImage(icon, 692, y, 30, 30);
    context.fillStyle = "rgba(248, 250, 252, 0.94)";
    context.font = `650 17px ${family}`;
    context.fillText(ellipsize(context, step.name, 372), 734, y + 21);
  });
  if (options.steps.length > 8) {
    context.fillStyle = "rgba(226, 232, 240, 0.68)";
    context.font = `650 16px ${family}`;
    context.fillText(`+${options.steps.length - 8}`, 1066, 500);
  }
  drawLinkBand(context, family, options.linkLabel, options.shareUrl);
  return canvasToBlob(canvas, options.signal);
}

export function createProgressShareCard(options: ProgressShareCardOptions) {
  return renderProgressShareCard(options);
}

export function createPointShareCard(options: PointShareCardOptions) {
  return renderPointShareCard(options);
}

export function createRouteShareCard(options: RouteShareCardOptions) {
  return renderRouteShareCard(options);
}
