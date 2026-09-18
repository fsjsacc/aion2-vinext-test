"use client";

// Keep the global stylesheet behind a client reference. Vinext otherwise
// combines every server-component CSS module in the application into the
// layout stylesheet, making unrelated database, admin, and tool styles block
// the homepage's first paint.
import "../globals.css";

export function GlobalStyles() {
  return null;
}
