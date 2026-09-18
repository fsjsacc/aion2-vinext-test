import type { MapPayload } from "./map-types";

const PROGRESS_FORMAT_VERSION = "3";
const LEGACY_PROGRESS_FORMAT_VERSION = "1";
const LEGACY_SPARSE_PROGRESS_FORMAT_VERSION = "2";
const POINT_FORMAT_VERSION = "2";
const ROUTE_FORMAT_VERSION = "2";
const LEGACY_ROUTE_FORMAT_VERSION = "1";
const BUILD_FINGERPRINT_LENGTH = 12;
const MAP_FINGERPRINT_LENGTH = 22;
const MAX_MAP_NAME_BYTES = 128;
const MAX_MARKER_ID_BYTES = 128;
const MAX_PROGRESS_STATE_BYTES = 2_800;
const MAX_ROUTE_STATE_BYTES = 2_800;

export const MAX_POINT_TOKEN_LENGTH = 512;
export const MAX_PROGRESS_TOKEN_LENGTH = 4_096;
export const MAX_ROUTE_TOKEN_LENGTH = 4_096;
export const MAX_ROUTE_MARKERS = 64;

export type SharedProgressScope =
  | { readonly kind: "all-maps" }
  | { readonly kind: "current-map"; readonly mapName: string };

export type SharedProgressScopeInput = SharedProgressScope | string;

export const ALL_MAPS_PROGRESS_SCOPE: SharedProgressScope = { kind: "all-maps" };

export function currentMapProgressScope(mapName: string): SharedProgressScope {
  return { kind: "current-map", mapName };
}

export type SharedProgress = {
  byMapName: Map<string, Set<string>>;
  foundCount: number;
  totalCount: number;
  scope: SharedProgressScope;
};

export type EncodedProgress = {
  token: string;
  foundCount: number;
  totalCount: number;
  scope: SharedProgressScope;
};

type MapMarkerLayout = {
  mapName: string;
  markerIds: string[];
  markerIdSet: Set<string>;
  fingerprint: string;
};

type ProgressLayout = {
  scope: SharedProgressScope;
  scopeSegment: string;
  maps: Array<{ mapName: string; markerIds: string[] }>;
  fingerprint: string;
  totalCount: number;
};

const BASE64URL_PATTERN = /^[A-Za-z0-9_-]+$/u;
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder("utf-8", { fatal: true });

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return globalThis
    .btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/u, "");
}

function base64UrlLength(byteLength: number) {
  return Math.floor((byteLength * 4 + 2) / 3);
}

function decodedBase64UrlLength(value: string) {
  if (value.length % 4 === 1) return null;
  return Math.floor((value.length * 3) / 4);
}

function isBoundedBase64Url(value: string, maximumBytes: number, allowEmpty = false) {
  if (
    (value.length === 0 && !allowEmpty) ||
    value.length > base64UrlLength(maximumBytes) ||
    (value.length > 0 && !BASE64URL_PATTERN.test(value))
  ) {
    return false;
  }
  const decodedLength = decodedBase64UrlLength(value);
  return decodedLength !== null && decodedLength <= maximumBytes;
}

function base64UrlToBytes(
  value: string,
  options: { maxBytes: number; exactBytes?: number; allowEmpty?: boolean },
) {
  if (!isBoundedBase64Url(value, options.maxBytes, options.allowEmpty)) {
    return null;
  }

  const expectedLength = decodedBase64UrlLength(value);
  if (
    expectedLength === null ||
    expectedLength > options.maxBytes ||
    (options.exactBytes !== undefined && expectedLength !== options.exactBytes)
  ) {
    return null;
  }

  try {
    const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
    const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
    const binary = globalThis.atob(`${normalized}${padding}`);
    if (binary.length !== expectedLength) return null;
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return bytesToBase64Url(bytes) === value ? bytes : null;
  } catch {
    return null;
  }
}

function boundedTextBytes(value: string, maximumBytes: number) {
  if (typeof value !== "string" || value.length === 0) return null;
  const bytes = textEncoder.encode(value);
  return bytes.length <= maximumBytes ? bytes : null;
}

function decodeBoundedText(bytes: Uint8Array, maximumBytes: number) {
  if (bytes.length === 0 || bytes.length > maximumBytes) return null;
  try {
    const value = textDecoder.decode(bytes);
    const canonicalBytes = textEncoder.encode(value);
    if (canonicalBytes.length !== bytes.length) return null;
    for (let index = 0; index < bytes.length; index += 1) {
      if (canonicalBytes[index] !== bytes[index]) return null;
    }
    return value;
  } catch {
    return null;
  }
}

function fingerprintParts(parts: Iterable<string>) {
  let h1 = 0x6a09e667;
  let h2 = 0xbb67ae85;
  let h3 = 0x3c6ef372;
  let h4 = 0xa54ff53a;

  const mix = (byte: number) => {
    h1 = Math.imul(h1 ^ byte, 0x239b961b);
    h2 = Math.imul(h2 ^ byte, 0xab0e9789);
    h3 = Math.imul(h3 ^ byte, 0x38b34ae5);
    h4 = Math.imul(h4 ^ byte, 0xa1e38b93);
  };

  for (const part of parts) {
    const bytes = textEncoder.encode(part);
    for (let shift = 0; shift < 32; shift += 8) mix((bytes.length >>> shift) & 0xff);
    for (const byte of bytes) mix(byte);
  }

  h1 = Math.imul(h3 ^ (h1 >>> 18), 0x239b961b);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 0xab0e9789);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 0x38b34ae5);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 0xa1e38b93);
  const words = [h1 ^ h2 ^ h3 ^ h4, h2 ^ h1, h3 ^ h1, h4 ^ h1];
  const bytes = new Uint8Array(16);
  const view = new DataView(bytes.buffer);
  words.forEach((word, index) => view.setUint32(index * 4, word >>> 0));
  return bytesToBase64Url(bytes);
}

function encodedMapScope(mapName: string) {
  const bytes = boundedTextBytes(mapName, MAX_MAP_NAME_BYTES);
  return bytes ? bytesToBase64Url(bytes) : null;
}

function mapMarkerLayout(payload: MapPayload, mapName: string): MapMarkerLayout | null {
  const matchingMaps = payload.maps.filter((candidate) => candidate.name === mapName);
  if (matchingMaps.length !== 1 || !encodedMapScope(mapName)) return null;
  const [map] = matchingMaps;

  const markers = payload.markersByMap[mapName] ?? [];
  const markerIds: string[] = [];
  const markerIdSet = new Set<string>();
  for (const marker of markers) {
    if (!boundedTextBytes(marker.id, MAX_MARKER_ID_BYTES) || markerIdSet.has(marker.id)) {
      return null;
    }
    markerIds.push(marker.id);
    markerIdSet.add(marker.id);
  }

  const mapId = typeof map.id === "string" ? map.id : "";
  const fingerprint = fingerprintParts([
    "map-marker-layout-v1",
    mapName,
    mapId,
    String(markerIds.length),
    ...markerIds,
  ]);
  return { mapName, markerIds, markerIdSet, fingerprint };
}

export function getMapDataFingerprint(payload: MapPayload, mapName: string) {
  return mapMarkerLayout(payload, mapName)?.fingerprint ?? null;
}

function normalizeProgressScope(scope: SharedProgressScopeInput): SharedProgressScope | null {
  if (typeof scope === "string") return currentMapProgressScope(scope);
  if (scope.kind === "all-maps") return ALL_MAPS_PROGRESS_SCOPE;
  if (scope.kind !== "current-map" || !encodedMapScope(scope.mapName)) return null;
  return currentMapProgressScope(scope.mapName);
}

function progressLayout(payload: MapPayload, requestedScope: SharedProgressScopeInput) {
  const scope = normalizeProgressScope(requestedScope);
  if (!scope) return null;

  const selectedMaps =
    scope.kind === "current-map"
      ? payload.maps.filter((map) => map.name === scope.mapName)
      : payload.maps;
  if (scope.kind === "current-map" && selectedMaps.length !== 1) return null;

  const maps: ProgressLayout["maps"] = [];
  const fingerprintInput = ["progress-layout-v1", scope.kind];
  let totalCount = 0;
  for (const map of selectedMaps) {
    const layout = mapMarkerLayout(payload, map.name);
    if (!layout) return null;
    maps.push({ mapName: map.name, markerIds: layout.markerIds });
    fingerprintInput.push(map.name, layout.fingerprint, String(layout.markerIds.length));
    totalCount += layout.markerIds.length;
  }

  const scopeSegment =
    scope.kind === "current-map" ? `m${encodedMapScope(scope.mapName)}` : "a";
  return {
    scope,
    scopeSegment,
    maps,
    fingerprint: fingerprintParts(fingerprintInput),
    totalCount,
  } satisfies ProgressLayout;
}

function appendVarint(bytes: number[], value: number) {
  let remaining = value >>> 0;
  do {
    let byte = remaining & 0x7f;
    remaining >>>= 7;
    if (remaining > 0) byte |= 0x80;
    bytes.push(byte);
  } while (remaining > 0);
}

function encodeVarints(values: number[]) {
  const bytes: number[] = [];
  for (const value of values) appendVarint(bytes, value);
  return Uint8Array.from(bytes);
}

function decodeVarints(bytes: Uint8Array, maximumValues: number) {
  const values: number[] = [];
  let value = 0;
  let byteCount = 0;

  for (const byte of bytes) {
    const chunk = byte & 0x7f;
    byteCount += 1;
    if (byteCount > 5 || (byteCount === 5 && chunk > 0x0f)) return null;
    value += chunk * 2 ** ((byteCount - 1) * 7);

    if ((byte & 0x80) === 0) {
      if (byteCount > 1 && chunk === 0) return null;
      values.push(value);
      if (values.length > maximumValues) return null;
      value = 0;
      byteCount = 0;
    }
  }

  if (byteCount !== 0) return null;
  const canonical = encodeVarints(values);
  if (canonical.length !== bytes.length) return null;
  for (let index = 0; index < bytes.length; index += 1) {
    if (canonical[index] !== bytes[index]) return null;
  }
  return values;
}

function readVarint(bytes: Uint8Array, startOffset: number) {
  let value = 0;
  let byteCount = 0;
  let offset = startOffset;
  while (offset < bytes.length) {
    const byte = bytes[offset];
    const chunk = byte & 0x7f;
    byteCount += 1;
    if (byteCount > 5 || (byteCount === 5 && chunk > 0x0f)) return null;
    value += chunk * 2 ** ((byteCount - 1) * 7);
    offset += 1;
    if ((byte & 0x80) === 0) {
      if (byteCount > 1 && chunk === 0) return null;
      return { value, offset };
    }
  }
  return null;
}

function progressFromIndexes(layout: ProgressLayout, foundIndexes: ReadonlySet<number>) {
  const byMapName = new Map<string, Set<string>>();
  let markerIndex = 0;
  let foundCount = 0;

  for (const map of layout.maps) {
    const foundMarkerIds = new Set<string>();
    for (const markerId of map.markerIds) {
      if (foundIndexes.has(markerIndex)) {
        foundMarkerIds.add(markerId);
        foundCount += 1;
      }
      markerIndex += 1;
    }
    byMapName.set(map.mapName, foundMarkerIds);
  }

  return {
    byMapName,
    foundCount,
    totalCount: markerIndex,
    scope: layout.scope,
  } satisfies SharedProgress;
}

function decodeProgressState(encodedState: string, totalCount: number) {
  const expectedByteCount = Math.ceil(totalCount / 8);
  if (expectedByteCount > MAX_PROGRESS_STATE_BYTES || encodedState.length === 0) return null;

  const mode = encodedState[0];
  const encodedBytes = encodedState.slice(1);
  const foundIndexes = new Set<number>();

  if (mode === "b") {
    if (encodedBytes.length !== base64UrlLength(expectedByteCount)) return null;
    const bytes = base64UrlToBytes(encodedBytes, {
      maxBytes: expectedByteCount,
      exactBytes: expectedByteCount,
      allowEmpty: expectedByteCount === 0,
    });
    if (!bytes) return null;
    if (totalCount % 8 !== 0 && bytes.length > 0) {
      const validMask = (1 << (totalCount % 8)) - 1;
      if ((bytes[bytes.length - 1] & ~validMask) !== 0) return null;
    }
    for (let markerIndex = 0; markerIndex < totalCount; markerIndex += 1) {
      if ((bytes[markerIndex >> 3] & (1 << (markerIndex & 7))) !== 0) {
        foundIndexes.add(markerIndex);
      }
    }
    return foundIndexes;
  }

  if (mode !== "s" || expectedByteCount === 0) return null;
  const maximumSparseBytes = expectedByteCount - 1;
  if (encodedBytes.length > base64UrlLength(maximumSparseBytes)) return null;
  const bytes = base64UrlToBytes(encodedBytes, {
    maxBytes: maximumSparseBytes,
    allowEmpty: true,
  });
  if (!bytes) return null;
  const deltas = decodeVarints(bytes, totalCount);
  if (!deltas) return null;

  let markerIndex = -1;
  for (const delta of deltas) {
    if (delta === 0) return null;
    markerIndex += delta;
    if (markerIndex < 0 || markerIndex >= totalCount) return null;
    foundIndexes.add(markerIndex);
  }
  return foundIndexes;
}

function hasValidProgressStateEnvelope(encodedState: string) {
  return (
    (encodedState[0] === "b" || encodedState[0] === "s") &&
    isBoundedBase64Url(encodedState.slice(1), MAX_PROGRESS_STATE_BYTES, true)
  );
}

function legacyProgressLayout(payload: MapPayload): ProgressLayout | null {
  const maps: ProgressLayout["maps"] = [];
  let totalCount = 0;
  for (const map of payload.maps) {
    const markerIds = (payload.markersByMap[map.name] ?? []).map((marker) => marker.id);
    maps.push({ mapName: map.name, markerIds });
    totalCount += markerIds.length;
  }
  if (Math.ceil(totalCount / 8) > MAX_PROGRESS_STATE_BYTES) return null;
  return {
    scope: ALL_MAPS_PROGRESS_SCOPE,
    scopeSegment: "a",
    maps,
    fingerprint: "",
    totalCount,
  };
}

function expectedLegacyBuild(payload: MapPayload) {
  const build = payload.source?.build;
  return typeof build === "string" ? build.slice(0, BUILD_FINGERPRINT_LENGTH) : "";
}

function decodeLegacyProgress(payload: MapPayload, token: string): SharedProgress | null {
  const [formatVersion, buildFingerprint, encodedBytes, ...extra] = token.split(".");
  const layout = legacyProgressLayout(payload);
  if (
    !layout ||
    extra.length > 0 ||
    formatVersion !== LEGACY_PROGRESS_FORMAT_VERSION ||
    buildFingerprint !== expectedLegacyBuild(payload) ||
    !buildFingerprint ||
    encodedBytes === undefined ||
    encodedBytes.length !== base64UrlLength(Math.ceil(layout.totalCount / 8))
  ) {
    return null;
  }

  const bytes = base64UrlToBytes(encodedBytes, {
    maxBytes: Math.ceil(layout.totalCount / 8),
    exactBytes: Math.ceil(layout.totalCount / 8),
    allowEmpty: layout.totalCount === 0,
  });
  if (!bytes) return null;
  if (layout.totalCount % 8 !== 0 && bytes.length > 0) {
    const validMask = (1 << (layout.totalCount % 8)) - 1;
    if ((bytes[bytes.length - 1] & ~validMask) !== 0) return null;
  }

  const foundIndexes = new Set<number>();
  for (let markerIndex = 0; markerIndex < layout.totalCount; markerIndex += 1) {
    if ((bytes[markerIndex >> 3] & (1 << (markerIndex & 7))) !== 0) {
      foundIndexes.add(markerIndex);
    }
  }
  return progressFromIndexes(layout, foundIndexes);
}

function decodeLegacySparseProgress(payload: MapPayload, token: string) {
  const [formatVersion, buildFingerprint, encodedState, ...extra] = token.split(".");
  const layout = legacyProgressLayout(payload);
  if (
    !layout ||
    extra.length > 0 ||
    formatVersion !== LEGACY_SPARSE_PROGRESS_FORMAT_VERSION ||
    buildFingerprint !== expectedLegacyBuild(payload) ||
    !buildFingerprint ||
    !encodedState
  ) {
    return null;
  }
  const foundIndexes = decodeProgressState(encodedState, layout.totalCount);
  return foundIndexes ? progressFromIndexes(layout, foundIndexes) : null;
}

export function encodeSharedProgress(
  payload: MapPayload,
  mapName: string,
  foundMarkerIds: ReadonlySet<string>,
): EncodedProgress;
export function encodeSharedProgress(
  payload: MapPayload,
  foundForMap: (mapName: string) => ReadonlySet<string>,
  scope?: SharedProgressScopeInput,
): EncodedProgress;
export function encodeSharedProgress(
  payload: MapPayload,
  foundForMapOrMapName: ((mapName: string) => ReadonlySet<string>) | string,
  scopeOrFoundMarkerIds?: SharedProgressScopeInput | ReadonlySet<string>,
): EncodedProgress {
  let foundForMap: (mapName: string) => ReadonlySet<string>;
  let scope: SharedProgressScopeInput;
  if (typeof foundForMapOrMapName === "string") {
    const foundMarkerIds = scopeOrFoundMarkerIds as ReadonlySet<string> | undefined;
    if (!foundMarkerIds || typeof foundMarkerIds.has !== "function") {
      throw new TypeError("Current-map progress requires a marker ID set");
    }
    const mapName = foundForMapOrMapName;
    foundForMap = (candidateMapName) =>
      candidateMapName === mapName ? foundMarkerIds : new Set<string>();
    scope = currentMapProgressScope(mapName);
  } else {
    foundForMap = foundForMapOrMapName;
    scope = (scopeOrFoundMarkerIds as SharedProgressScopeInput | undefined) ??
      ALL_MAPS_PROGRESS_SCOPE;
  }

  const layout = progressLayout(payload, scope);
  if (!layout) throw new RangeError("Unable to encode progress for the requested map scope");

  const bitset = new Uint8Array(Math.ceil(layout.totalCount / 8));
  if (bitset.length > MAX_PROGRESS_STATE_BYTES) {
    throw new RangeError("Shared progress exceeds the token size limit");
  }

  const foundIndexes: number[] = [];
  let markerIndex = 0;
  for (const map of layout.maps) {
    const foundMarkerIds = foundForMap(map.mapName);
    for (const markerId of map.markerIds) {
      if (foundMarkerIds.has(markerId)) {
        bitset[markerIndex >> 3] |= 1 << (markerIndex & 7);
        foundIndexes.push(markerIndex);
      }
      markerIndex += 1;
    }
  }

  const sparseDeltas = foundIndexes.map((index, position) =>
    position === 0 ? index + 1 : index - foundIndexes[position - 1],
  );
  const sparseBytes = encodeVarints(sparseDeltas);
  const encodedState =
    sparseBytes.length < bitset.length
      ? `s${bytesToBase64Url(sparseBytes)}`
      : `b${bytesToBase64Url(bitset)}`;
  const token = `${PROGRESS_FORMAT_VERSION}.${layout.scopeSegment}.${layout.fingerprint}.${encodedState}`;
  if (token.length > MAX_PROGRESS_TOKEN_LENGTH) {
    throw new RangeError("Shared progress exceeds the token size limit");
  }

  return {
    token,
    foundCount: foundIndexes.length,
    totalCount: layout.totalCount,
    scope: layout.scope,
  };
}

export function encodeSharedMapProgress(
  payload: MapPayload,
  mapName: string,
  foundMarkerIds: ReadonlySet<string>,
) {
  return encodeSharedProgress(payload, mapName, foundMarkerIds);
}

export function decodeSharedProgress(payload: MapPayload, token: string): SharedProgress | null {
  if (typeof token !== "string" || token.length === 0 || token.length > MAX_PROGRESS_TOKEN_LENGTH) {
    return null;
  }

  if (token.startsWith(`${LEGACY_PROGRESS_FORMAT_VERSION}.`)) {
    return decodeLegacyProgress(payload, token);
  }
  if (token.startsWith(`${LEGACY_SPARSE_PROGRESS_FORMAT_VERSION}.`)) {
    return decodeLegacySparseProgress(payload, token);
  }

  const [formatVersion, scopeSegment, fingerprint, encodedState, ...extra] = token.split(".");
  if (
    extra.length > 0 ||
    formatVersion !== PROGRESS_FORMAT_VERSION ||
    !scopeSegment ||
    !fingerprint ||
    fingerprint.length !== MAP_FINGERPRINT_LENGTH ||
    !BASE64URL_PATTERN.test(fingerprint) ||
    !encodedState ||
    !hasValidProgressStateEnvelope(encodedState)
  ) {
    return null;
  }

  let scope: SharedProgressScope;
  if (scopeSegment === "a") {
    scope = ALL_MAPS_PROGRESS_SCOPE;
  } else if (scopeSegment.startsWith("m")) {
    const encodedMapName = scopeSegment.slice(1);
    const mapNameBytes = base64UrlToBytes(encodedMapName, { maxBytes: MAX_MAP_NAME_BYTES });
    if (!mapNameBytes) return null;
    const mapName = decodeBoundedText(mapNameBytes, MAX_MAP_NAME_BYTES);
    if (!mapName || encodedMapScope(mapName) !== encodedMapName) return null;
    scope = currentMapProgressScope(mapName);
  } else {
    return null;
  }

  const layout = progressLayout(payload, scope);
  if (
    !layout ||
    layout.scopeSegment !== scopeSegment ||
    layout.fingerprint !== fingerprint
  ) {
    return null;
  }
  const foundIndexes = decodeProgressState(encodedState, layout.totalCount);
  return foundIndexes ? progressFromIndexes(layout, foundIndexes) : null;
}

export function encodeSharedPoint(payload: MapPayload, mapName: string, markerId: string) {
  const layout = mapMarkerLayout(payload, mapName);
  const mapScope = encodedMapScope(mapName);
  const markerIdBytes = boundedTextBytes(markerId, MAX_MARKER_ID_BYTES);
  if (!layout || !mapScope || !markerIdBytes || !layout.markerIdSet.has(markerId)) return null;

  const token = `${POINT_FORMAT_VERSION}.${mapScope}.${layout.fingerprint}.${bytesToBase64Url(markerIdBytes)}`;
  return token.length <= MAX_POINT_TOKEN_LENGTH ? token : null;
}

export function decodeSharedPoint(payload: MapPayload, mapName: string, token: string) {
  if (typeof token !== "string" || token.length === 0 || token.length > MAX_POINT_TOKEN_LENGTH) {
    return null;
  }

  const layout = mapMarkerLayout(payload, mapName);
  if (!layout) return null;

  if (!token.startsWith(`${POINT_FORMAT_VERSION}.`)) {
    if (boundedTextBytes(token, MAX_MARKER_ID_BYTES) && layout.markerIdSet.has(token)) {
      return token;
    }
    if (!/^[0-9a-z]+$/iu.test(token)) return null;
    const markerIndex = Number.parseInt(token, 36);
    return Number.isSafeInteger(markerIndex) ? layout.markerIds[markerIndex] ?? null : null;
  }

  const [formatVersion, mapScope, fingerprint, encodedMarkerId, ...extra] = token.split(".");
  const expectedMapScope = encodedMapScope(mapName);
  if (
    !layout ||
    !expectedMapScope ||
    extra.length > 0 ||
    formatVersion !== POINT_FORMAT_VERSION ||
    mapScope !== expectedMapScope ||
    !fingerprint ||
    fingerprint !== layout.fingerprint ||
    fingerprint.length !== MAP_FINGERPRINT_LENGTH ||
    encodedMarkerId === undefined
  ) {
    return null;
  }

  const markerIdBytes = base64UrlToBytes(encodedMarkerId, { maxBytes: MAX_MARKER_ID_BYTES });
  if (!markerIdBytes) return null;
  const markerId = decodeBoundedText(markerIdBytes, MAX_MARKER_ID_BYTES);
  return markerId && layout.markerIdSet.has(markerId) ? markerId : null;
}

export function encodeSharedRoute(payload: MapPayload, mapName: string, markerIds: string[]) {
  if (
    markerIds.length < 2 ||
    markerIds.length > MAX_ROUTE_MARKERS ||
    new Set(markerIds).size !== markerIds.length
  ) {
    return null;
  }

  const layout = mapMarkerLayout(payload, mapName);
  const mapScope = encodedMapScope(mapName);
  if (!layout || !mapScope || markerIds.some((markerId) => !layout.markerIdSet.has(markerId))) {
    return null;
  }

  const state: number[] = [];
  appendVarint(state, markerIds.length);
  for (const markerId of markerIds) {
    const markerIdBytes = boundedTextBytes(markerId, MAX_MARKER_ID_BYTES);
    if (!markerIdBytes) return null;
    appendVarint(state, markerIdBytes.length);
    state.push(...markerIdBytes);
    if (state.length > MAX_ROUTE_STATE_BYTES) return null;
  }

  const token = `${ROUTE_FORMAT_VERSION}.${mapScope}.${layout.fingerprint}.s${bytesToBase64Url(Uint8Array.from(state))}`;
  return token.length <= MAX_ROUTE_TOKEN_LENGTH ? token : null;
}

export function decodeSharedRoute(payload: MapPayload, mapName: string, token: string) {
  if (typeof token !== "string" || token.length === 0 || token.length > MAX_ROUTE_TOKEN_LENGTH) {
    return null;
  }

  if (token.startsWith(`${LEGACY_ROUTE_FORMAT_VERSION}.`)) {
    const [formatVersion, buildFingerprint, encodedIndexes, ...extra] = token.split(".");
    if (
      extra.length > 0 ||
      formatVersion !== LEGACY_ROUTE_FORMAT_VERSION ||
      buildFingerprint !== expectedLegacyBuild(payload) ||
      !encodedIndexes
    ) {
      return null;
    }
    const bytes = base64UrlToBytes(encodedIndexes, { maxBytes: MAX_ROUTE_STATE_BYTES });
    const indexes = bytes ? decodeVarints(bytes, MAX_ROUTE_MARKERS) : null;
    const markers = payload.markersByMap[mapName] ?? [];
    if (!indexes || indexes.length < 2 || indexes.length > MAX_ROUTE_MARKERS) return null;
    const markerIds = indexes.map((index) => markers[index]?.id);
    if (markerIds.some((markerId) => !markerId)) return null;
    return new Set(markerIds).size === markerIds.length ? markerIds as string[] : null;
  }

  const [formatVersion, mapScope, fingerprint, encodedState, ...extra] = token.split(".");
  const layout = mapMarkerLayout(payload, mapName);
  const expectedMapScope = encodedMapScope(mapName);
  if (
    !layout ||
    !expectedMapScope ||
    extra.length > 0 ||
    formatVersion !== ROUTE_FORMAT_VERSION ||
    mapScope !== expectedMapScope ||
    !fingerprint ||
    fingerprint !== layout.fingerprint ||
    fingerprint.length !== MAP_FINGERPRINT_LENGTH ||
    !encodedState ||
    encodedState[0] !== "s"
  ) {
    return null;
  }

  const encodedMarkerIds = encodedState.slice(1);
  const bytes = base64UrlToBytes(encodedMarkerIds, { maxBytes: MAX_ROUTE_STATE_BYTES });
  if (!bytes) return null;
  const countValue = readVarint(bytes, 0);
  if (
    !countValue ||
    countValue.value < 2 ||
    countValue.value > MAX_ROUTE_MARKERS
  ) {
    return null;
  }

  const markerIds: string[] = [];
  let offset = countValue.offset;
  for (let index = 0; index < countValue.value; index += 1) {
    const lengthValue = readVarint(bytes, offset);
    if (
      !lengthValue ||
      lengthValue.value < 1 ||
      lengthValue.value > MAX_MARKER_ID_BYTES ||
      lengthValue.offset + lengthValue.value > bytes.length
    ) {
      return null;
    }
    const markerId = decodeBoundedText(
      bytes.subarray(lengthValue.offset, lengthValue.offset + lengthValue.value),
      MAX_MARKER_ID_BYTES,
    );
    if (!markerId || !layout.markerIdSet.has(markerId)) return null;
    markerIds.push(markerId);
    offset = lengthValue.offset + lengthValue.value;
  }

  if (offset !== bytes.length || new Set(markerIds).size !== markerIds.length) return null;
  return markerIds;
}
