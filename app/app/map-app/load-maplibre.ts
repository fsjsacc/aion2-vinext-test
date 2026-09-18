import type * as MapLibre from "maplibre-gl";

let mapLibrePromise: Promise<typeof MapLibre> | null = null;

export function loadMapLibre() {
  if (!mapLibrePromise) {
    mapLibrePromise = import("maplibre-gl").catch((error) => {
      mapLibrePromise = null;
      throw error;
    });
  }

  return mapLibrePromise;
}
