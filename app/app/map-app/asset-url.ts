export function resolveMapAssetUrl(value: string, assetBasePath?: string) {
  const base = assetBasePath?.replace(/\/+$/u, "") ?? "";
  if (
    !value ||
    !base ||
    /^(?:data:|blob:|https?:\/\/)/u.test(value) ||
    value === base ||
    value.startsWith(`${base}/`)
  ) {
    return value;
  }
  return `${base}/${value.replace(/^\/+/u, "")}`;
}
