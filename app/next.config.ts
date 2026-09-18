import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Canonical document slashes are enforced in worker/index.ts. Vinext 0.x
  // otherwise applies this option to asset filenames too, redirecting
  // `/assets/app.js` to the invalid `/assets/app.js/` URL.
  trailingSlash: false,
};

export default nextConfig;
