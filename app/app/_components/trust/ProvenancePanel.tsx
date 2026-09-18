"use client";

import { Clock3, Database, ExternalLink, ShieldCheck } from "lucide-react";

import {
  resolveLocalizedCopy,
  siteLocaleConfig,
  type SiteLocale,
} from "@/app/site-config";
import { AnalyticsLink } from "@/app/map-app/AnalyticsLink";

import { FeedbackReportDialog } from "./FeedbackReportDialog";
import styles from "./ProvenancePanel.module.css";

export type ProvenanceStatus =
  | "draft"
  | "review"
  | "published-first-party"
  | "published-unverified"
  | "published-verified"
  | "official-detail"
  | "catalog-summary";

export type ProvenanceSource = {
  kind?: "official" | "platform" | "third-party";
  label: string;
  publishedAt?: string | null;
  publisher?: string | null;
  retrievedAt?: string | null;
  url: string;
  verifiedAt?: string | null;
};

type Props = {
  locale: SiteLocale;
  note?: string | null;
  reportService?: "global" | "kr-tw-live" | "other" | "unknown";
  retrievedAt?: string | null;
  service?: string | null;
  sources?: readonly ProvenanceSource[];
  status: ProvenanceStatus;
  targetKey: string;
  targetKind: "content" | "item" | "map" | "tool";
  targetLabel: string;
  verifiedAt?: string | null;
  version?: string | null;
};

type ProvenanceCopy = {
  eyebrow: string;
  title: string;
  description: string;
  service: string;
  verified: string;
  sources: string;
  kinds: Record<NonNullable<ProvenanceSource["kind"]>, string>;
};

const provenanceCopy: Record<SiteLocale, ProvenanceCopy> = {
  "zh-hans": {
    eyebrow: "数据来源",
    title: "适用范围与更新日期",
    description: "查看资料适用的游戏服务、最后核实日期与原始来源；实时数值和状态请以游戏内为准。",
    service: "适用服务／地区",
    verified: "最后核实",
    sources: "来源",
    kinds: {
      official: "官方来源",
      platform: "官方平台",
      "third-party": "第三方来源",
    },
  },
  "zh-hant": {
    eyebrow: "資料來源",
    title: "適用範圍與更新日期",
    description: "查看這項資料適用的遊戲服務、最後核對日期與原始來源；即時數值和狀態請以遊戲內為準。",
    service: "適用服務／地區",
    verified: "最後核對",
    sources: "來源",
    kinds: {
      official: "官方來源",
      platform: "官方平台",
      "third-party": "第三方來源",
    },
  },
  en: {
    eyebrow: "DATA SOURCES",
    title: "Scope and update date",
    description: "Check the applicable game service, last verification date, and original sources. Confirm live values and availability in game.",
    service: "Applicable service / region",
    verified: "Last verified",
    sources: "Sources",
    kinds: {
      official: "Official source",
      platform: "Official platform",
      "third-party": "Third-party source",
    },
  },
  fr: {
    eyebrow: "SOURCES DES DONNÉES",
    title: "Périmètre et date de mise à jour",
    description: "Consultez le service de jeu concerné, la date de la dernière vérification et les sources d’origine. Confirmez les valeurs en temps réel dans le jeu.",
    service: "Service / région concernés",
    verified: "Dernière vérification",
    sources: "Sources",
    kinds: {
      official: "Source officielle",
      platform: "Plateforme officielle",
      "third-party": "Source tierce",
    },
  },
  de: {
    eyebrow: "DATENQUELLEN",
    title: "Geltungsbereich und Aktualisierungsdatum",
    description: "Prüfe den betroffenen Spielservice, das letzte Prüfdatum und die Originalquellen. Live-Werte und Verfügbarkeit bitte im Spiel bestätigen.",
    service: "Spielservice / Region",
    verified: "Zuletzt geprüft",
    sources: "Quellen",
    kinds: {
      official: "Offizielle Quelle",
      platform: "Offizielle Plattform",
      "third-party": "Drittanbieterquelle",
    },
  },
  es: {
    eyebrow: "FUENTES DE DATOS",
    title: "Ámbito y fecha de actualización",
    description: "Consulta el servicio de juego aplicable, la última fecha de verificación y las fuentes originales. Confirma los valores actuales dentro del juego.",
    service: "Servicio / región aplicable",
    verified: "Última verificación",
    sources: "Fuentes",
    kinds: {
      official: "Fuente oficial",
      platform: "Plataforma oficial",
      "third-party": "Fuente de terceros",
    },
  },
  ja: {
    eyebrow: "データ出典",
    title: "対象範囲と更新日",
    description: "対象のゲームサービス、最終確認日、原文の出典を確認できます。最新の数値や利用状況はゲーム内でも確認してください。",
    service: "対象サービス／地域",
    verified: "最終確認",
    sources: "出典",
    kinds: {
      official: "公式情報",
      platform: "公式プラットフォーム",
      "third-party": "第三者情報",
    },
  },
  "pt-br": {
    eyebrow: "FONTES DOS DADOS",
    title: "Escopo e data de atualização",
    description: "Confira o serviço de jogo aplicável, a última data de verificação e as fontes originais. Confirme valores e disponibilidade atuais no jogo.",
    service: "Serviço / região aplicável",
    verified: "Última verificação",
    sources: "Fontes",
    kinds: {
      official: "Fonte oficial",
      platform: "Plataforma oficial",
      "third-party": "Fonte de terceiros",
    },
  },
  ru: {
    eyebrow: "ИСТОЧНИКИ ДАННЫХ",
    title: "Область применения и дата обновления",
    description: "Проверьте применимый игровой сервис, дату последней проверки и исходные источники. Актуальные значения и доступность уточняйте в игре.",
    service: "Игровой сервис / регион",
    verified: "Последняя проверка",
    sources: "Источники",
    kinds: {
      official: "Официальный источник",
      platform: "Официальная платформа",
      "third-party": "Сторонний источник",
    },
  },
  ko: {
    eyebrow: "데이터 출처",
    title: "적용 범위와 업데이트 날짜",
    description: "적용 게임 서비스, 마지막 확인 날짜와 원문 출처를 확인하세요. 실시간 수치와 이용 가능 여부는 게임에서 다시 확인하세요.",
    service: "적용 서비스 / 지역",
    verified: "마지막 확인",
    sources: "출처",
    kinds: {
      official: "공식 출처",
      platform: "공식 플랫폼",
      "third-party": "서드파티 출처",
    },
  },
};

function validTimestamp(value: string | null | undefined) {
  if (!value) return null;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? timestamp : null;
}

function latestDate(values: readonly (string | null | undefined)[]) {
  return values.reduce<string | null>((latest, value) => {
    const timestamp = validTimestamp(value);
    if (timestamp === null) return latest;
    const latestTimestamp = validTimestamp(latest);
    return latestTimestamp === null || timestamp > latestTimestamp ? value ?? null : latest;
  }, null);
}

function formatDate(locale: SiteLocale, value: string | null | undefined) {
  const timestamp = validTimestamp(value);
  if (timestamp === null) return null;
  return new Intl.DateTimeFormat(siteLocaleConfig[locale].htmlLang, {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(timestamp));
}

function sourceHost(url: string) {
  try {
    return new URL(url, "https://aion2kina.com").hostname;
  } catch {
    return "unknown";
  }
}

export function ProvenancePanel({
  locale,
  note,
  reportService = "unknown",
  service,
  sources = [],
  targetKey,
  targetKind,
  targetLabel,
  verifiedAt,
  version,
}: Props) {
  const copy = resolveLocalizedCopy(provenanceCopy, locale);
  const lastVerified = verifiedAt ?? latestDate(sources.map((source) => source.verifiedAt));
  const formattedVerified = formatDate(locale, lastVerified);

  return (
    <section className={styles.panel} aria-labelledby={`provenance-${targetKind}-${targetKey}`}>
      <header className={styles.panelHeader}>
        <div className={styles.panelTitle}>
          <span className={styles.panelIcon}><ShieldCheck aria-hidden="true" size={20} /></span>
          <div>
            <p>{copy.eyebrow}</p>
            <h2 id={`provenance-${targetKind}-${targetKey}`}>{copy.title}</h2>
          </div>
        </div>
        <p>{copy.description}</p>
      </header>

      {service || formattedVerified ? (
        <dl className={styles.provenanceGrid}>
          {service ? (
            <div>
              <dt>{copy.service}</dt>
              <dd>{service}</dd>
            </div>
          ) : null}
          {formattedVerified ? (
            <div>
              <dt>{copy.verified}</dt>
              <dd><time dateTime={lastVerified ?? undefined}>{formattedVerified}</time></dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      {note ? <p className={styles.provenanceNote}><Clock3 aria-hidden="true" size={15} />{note}</p> : null}

      {sources.length ? <div className={styles.sourceSection}>
        <div className={styles.sourceHeading}>
          <Database aria-hidden="true" size={16} />
          <h3>{copy.sources}</h3>
        </div>
        <ul>
            {sources.map((source) => {
              const sourceDate = formatDate(locale, source.publishedAt);
              return (
                <li key={`${source.url}:${source.label}`}>
                  <AnalyticsLink
                    eventName="content_source_click"
                    href={source.url}
                    payload={{
                      locale,
                      link_location: "provenance",
                      service: reportService,
                      source_host: sourceHost(source.url),
                      source_kind: source.kind ?? "unknown",
                      surface: "content-detail",
                      target_key: targetKey,
                      target_kind: targetKind,
                    }}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>
                      <b>{source.label}</b>
                      <small>
                        {[source.publisher, source.kind ? copy.kinds[source.kind] : null, sourceDate]
                          .filter(Boolean)
                          .join(" · ")}
                      </small>
                    </span>
                    <ExternalLink aria-hidden="true" size={15} />
                  </AnalyticsLink>
                </li>
              );
            })}
        </ul>
      </div> : null}

      <footer className={styles.panelFooter}>
        <FeedbackReportDialog
          locale={locale}
          service={reportService}
          targetKey={targetKey}
          targetKind={targetKind}
          targetLabel={targetLabel}
          version={version}
        />
      </footer>
    </section>
  );
}

export default ProvenancePanel;
