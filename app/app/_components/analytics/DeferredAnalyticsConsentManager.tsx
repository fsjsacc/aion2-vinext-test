"use client";

import { lazy, Suspense, useEffect, useState } from "react";

const LazyAnalyticsConsentManager = lazy(() =>
  import("./AnalyticsConsentManager").then((module) => ({
    default: module.AnalyticsConsentManager,
  })),
);

export function DeferredAnalyticsConsentManager() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 4000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <LazyAnalyticsConsentManager />
    </Suspense>
  );
}

