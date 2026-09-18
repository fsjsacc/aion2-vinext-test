import { siteLocales } from "./site-config";

export const mirroredAnalyticsEvents = [
  "checklist_clear_completed",
  "checklist_item_complete",
  "checklist_item_create",
  "checklist_item_reopen",
  "checklist_region_change",
  "checklist_reset",
  "checklist_to_map_open",
  "code_copy_confirm_open",
  "code_copy_failure",
  "code_copy_success",
  "code_redeem_official_click",
  "code_reveal_complete",
  "code_reveal_start",
  "content_card_click",
  "content_faq_toggle",
  "content_primary_action_click",
  "content_source_click",
  "event_timer_filter_change",
  "event_timer_map_open",
  "event_timer_open",
  "event_timer_service_change",
  "event_timer_source_open",
  "guide_click",
  "guide_to_map_click",
  "home_checklist_open",
  "language_change",
  "map_activate",
  "map_fullscreen_change",
  "map_marker_found_toggle",
  "map_point_share",
  "map_progress_share",
  "map_ready",
  "map_route_share",
  "map_site_navigation_click",
  "map_type_filter_open",
  "map_to_checklist_add",
  "map_to_guide_click",
  "marker_open",
  "material_calculator_add_material",
  "material_calculator_add_stage",
  "material_calculator_copy_shortage",
  "material_calculator_remove_material",
  "material_calculator_remove_stage",
  "material_calculator_reset",
  "material_calculator_save",
  "material_calculator_share",
  "material_calculator_start",
  "material_calculator_template_select",
  "not_found_recovery_click",
  "marker_found",
  "poster_open",
  "question_answer",
  "report_outdated_start",
  "report_outdated_submit",
  "result_view",
  "save_local",
  "tool_open",
  "tool_start",
] as const;

export type MirroredAnalyticsEvent = (typeof mirroredAnalyticsEvents)[number];

export const analyticsLocales = [...siteLocales, "unknown"] as const;
export type AnalyticsLocale = (typeof analyticsLocales)[number];

export const analyticsServices = [
  "kr-tw-live",
  "global",
  "unknown",
  "other",
] as const;
export type AnalyticsService = (typeof analyticsServices)[number];

export const analyticsSurfaces = [
  "unknown",
  "home",
  "home-hero",
  "home-core-entry",
  "home-directory",
  "faction-gate",
  "content-hub",
  "content-detail",
  "map-seo",
  "interactive-map",
  "daily-checklist",
  "event-timer",
  "class-finder",
  "material-calculator",
  "correction-report",
  "not-found",
] as const;
export type AnalyticsSurface = (typeof analyticsSurfaces)[number];

export const analyticsTargetKinds = [
  "none",
  "content",
  "item",
  "map",
  "tool",
] as const;
export type AnalyticsTargetKind = (typeof analyticsTargetKinds)[number];

const mirroredEventSet = new Set<string>(mirroredAnalyticsEvents);
const localeSet = new Set<string>(analyticsLocales);
const serviceSet = new Set<string>(analyticsServices);
const surfaceSet = new Set<string>(analyticsSurfaces);
const targetKindSet = new Set<string>(analyticsTargetKinds);

export function isMirroredAnalyticsEvent(
  value: unknown,
): value is MirroredAnalyticsEvent {
  return typeof value === "string" && mirroredEventSet.has(value);
}

export function isAnalyticsLocale(value: unknown): value is AnalyticsLocale {
  return typeof value === "string" && localeSet.has(value);
}

export function isAnalyticsService(value: unknown): value is AnalyticsService {
  return typeof value === "string" && serviceSet.has(value);
}

export function isAnalyticsSurface(value: unknown): value is AnalyticsSurface {
  return typeof value === "string" && surfaceSet.has(value);
}

export function isAnalyticsTargetKind(
  value: unknown,
): value is AnalyticsTargetKind {
  return typeof value === "string" && targetKindSet.has(value);
}

export type MirroredAnalyticsPayload = {
  event: MirroredAnalyticsEvent;
  locale: AnalyticsLocale;
  service: AnalyticsService;
  surface: AnalyticsSurface;
  targetKind: AnalyticsTargetKind;
  targetKey: string;
};
