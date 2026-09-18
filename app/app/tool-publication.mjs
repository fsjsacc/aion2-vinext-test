/** Expand only generic registry-backed tools into localized static params. */
export function expandRegistryToolStaticParams(tools, locales) {
  return (tools ?? []).flatMap((tool) =>
    tool?.status === "live" && tool.route?.kind === "registry"
      ? (locales ?? []).map((locale) => ({ locale, tool: tool.slug }))
      : [],
  );
}
