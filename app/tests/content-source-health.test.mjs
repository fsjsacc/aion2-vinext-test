import assert from "node:assert/strict";
import test from "node:test";

import {
  collectRemoteReferences,
  readImageDimensions,
} from "../scripts/content/check-remote-sources.mjs";

test("remote source collection deduplicates documents and preserves image dimensions", () => {
  const entries = [
    {
      section: "guides",
      slug: "verified-guide",
      sources: [{ id: "official", url: "https://example.com/guide" }],
      heroImage: {
        src: "https://cdn.example.com/hero.png",
        sourceUrl: "https://example.com/guide",
        width: 1200,
        height: 630,
      },
    },
    {
      section: "news",
      slug: "verified-news",
      sources: [{ id: "same-official", url: "https://example.com/guide" }],
      heroImage: {
        src: "https://cdn.example.com/hero.png",
        sourceUrl: "https://example.com/guide",
        width: 1200,
        height: 630,
      },
    },
  ];
  const references = collectRemoteReferences(entries);
  assert.equal(references.length, 2);
  const document = references.find((reference) => reference.kind === "document");
  const image = references.find((reference) => reference.kind === "image");
  assert.equal(document.identities.length, 4);
  assert.deepEqual(image.expectedDimensions, [{ width: 1200, height: 630 }]);
  assert.equal(collectRemoteReferences(entries, { section: "guides" }).length, 2);
  assert.equal(collectRemoteReferences(entries, { slug: "missing" }).length, 0);
});

test("image dimension reader recognizes publication-safe PNG, GIF, and WebP headers", () => {
  const png = new Uint8Array(24);
  png.set([0x89, 0x50, 0x4e, 0x47], 0);
  new DataView(png.buffer).setUint32(16, 1792);
  new DataView(png.buffer).setUint32(20, 1024);
  assert.deepEqual(readImageDimensions(png), { width: 1792, height: 1024 });

  const gif = new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x80, 0x02, 0x68, 0x01]);
  assert.deepEqual(readImageDimensions(gif), { width: 640, height: 360 });

  const webp = new Uint8Array(30);
  webp.set([0x52, 0x49, 0x46, 0x46], 0);
  webp.set([0x57, 0x45, 0x42, 0x50], 8);
  webp.set([0x56, 0x50, 0x38, 0x58], 12);
  webp.set([0xff, 0x04, 0x00], 24);
  webp.set([0xcf, 0x02, 0x00], 27);
  assert.deepEqual(readImageDimensions(webp), { width: 1280, height: 720 });
  assert.equal(readImageDimensions(new Uint8Array([1, 2, 3])), null);
});
