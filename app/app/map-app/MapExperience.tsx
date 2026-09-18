"use client";

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";

import { trackEvent } from "@/app/analytics";

import { UI_TEXT } from "./i18n";
import type { Locale } from "./map-types";
import "./map-activation.css";

const InteractiveMap = lazy(async () => {
  const interactiveMapModule = await import("./InteractiveMap");
  return { default: interactiveMapModule.InteractiveMap };
});

type Props = {
  initialLocale: Locale;
  initialMapName: string;
  assetBasePath: string;
  routeSuffix: string;
  eager?: boolean;
};

const activationCopy: Record<
  Locale,
  { title: string; description: string; action: string }
> = {
  "zh-Hant": {
    title: "按需載入地圖",
    description: "地圖接近畫面時會自動載入，也可以立即啟用。",
    action: "啟用互動地圖",
  },
  "zh-Hans": {
    title: "按需加载地图",
    description: "地图接近屏幕时会自动加载，也可以立即启用。",
    action: "启用互动地图",
  },
  en: {
    title: "Load the map when you need it",
    description:
      "The map loads automatically as it approaches the viewport, or you can enable it now.",
    action: "Enable interactive map",
  },
  fr: {
    title: "Chargez la carte quand vous en avez besoin",
    description:
      "La carte se charge automatiquement à l’approche de l’écran, ou vous pouvez l’activer maintenant.",
    action: "Activer la carte interactive",
  },
  de: {
    title: "Karte bei Bedarf laden",
    description:
      "Die Karte wird automatisch geladen, sobald sie sich dem sichtbaren Bereich nähert. Du kannst sie auch sofort aktivieren.",
    action: "Interaktive Karte aktivieren",
  },
  "es-ES": {
    title: "Carga el mapa cuando lo necesites",
    description:
      "El mapa se carga automáticamente cuando se acerca a la pantalla, aunque también puedes activarlo ahora.",
    action: "Activar mapa interactivo",
  },
  ja: {
    title: "必要なときにマップを読み込む",
    description:
      "マップは画面に近づくと自動で読み込まれます。今すぐ有効にすることもできます。",
    action: "インタラクティブマップを有効にする",
  },
  "pt-BR": {
    title: "Carregue o mapa quando precisar",
    description:
      "O mapa é carregado automaticamente quando se aproxima da tela, ou você pode ativá-lo agora.",
    action: "Ativar mapa interativo",
  },
  ru: {
    title: "Загрузите карту, когда она понадобится",
    description:
      "Карта загрузится автоматически при приближении к области просмотра. Её также можно открыть сейчас.",
    action: "Открыть интерактивную карту",
  },
  ko: {
    title: "필요할 때 지도 불러오기",
    description:
      "지도가 화면에 가까워지면 자동으로 불러오며, 지금 바로 활성화할 수도 있습니다.",
    action: "인터랙티브 지도 활성화",
  },
};

export function MapExperience(props: Props) {
  const [mode, setMode] = useState<"idle" | "direct">(() => props.eager ? "direct" : "idle");
  const activationRef = useRef<HTMLDivElement | null>(null);
  const activate = useCallback(
    () => setMode((current) => current === "idle" ? "direct" : current),
    [],
  );
  const localizedMapText = UI_TEXT[props.initialLocale];
  const copy = {
    eyebrow: localizedMapText.documentTitle,
    loading: localizedMapText.loadingMapApp,
    ...activationCopy[props.initialLocale],
  };

  useEffect(() => {
    if (mode !== "idle") return;
    const target = activationRef.current;
    if (!target) return;

    const hash = window.location.hash;
    if (hash.includes("poi=") || hash.includes("type=")) {
      const frame = window.requestAnimationFrame(activate);
      return () => window.cancelAnimationFrame(frame);
    }

    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          activate();
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px", threshold: 0.01 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [activate, mode]);

  if (mode === "direct") {
    return (
      <Suspense
        fallback={(
          <div className="map-shell map-activation-shell" data-embedded="true" aria-busy="true">
            <div className="map-activation-card" aria-live="polite">
              <p>{copy.eyebrow}</p>
              <h3>{copy.loading}</h3>
              <span>{copy.description}</span>
            </div>
          </div>
        )}
      >
        <InteractiveMap
          initialServerLocale={props.initialLocale}
          initialMapName={props.initialMapName}
          assetBasePath={props.assetBasePath}
          embedded
        />
      </Suspense>
    );
  }

  return (
    <div ref={activationRef} className="map-shell map-activation-shell" data-embedded="true">
      <div className="map-activation-card">
        <p>{copy.eyebrow}</p>
        <h3>{copy.title}</h3>
        <span>{copy.description}</span>
        <button
          type="button"
          onClick={() => {
            trackEvent("map_activate", {
              locale: props.initialLocale,
              map_name: props.initialMapName,
              surface: "interactive-map",
              entry_source: "map-activation-card",
            });
            activate();
          }}
        >
          {copy.action}
        </button>
      </div>
    </div>
  );
}
