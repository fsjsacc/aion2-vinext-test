declare module "cloudflare:workers" {
  const env: {
    DB?: Parameters<typeof import("drizzle-orm/d1").drizzle>[0];
  };

  export { env };
}
