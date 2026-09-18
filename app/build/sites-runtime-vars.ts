type RuntimeEnvironment = Readonly<Record<string, string | undefined>>;

const PUBLIC_RUNTIME_ENV_KEYS = [
] as const;

const LOCAL_DEVELOPMENT_ONLY_ENV_KEYS = [
  "ADMIN_AUTH_SECRET",
  "ADMIN_PASSWORD_HASH",
  "ADMIN_API_KEY",
  "ANALYTICS_PSEUDONYM_KEY",
  "ANALYTICS_IP_ENCRYPTION_KEY",
] as const;

function copyDefinedRuntimeValues(
  target: Record<string, string>,
  environment: RuntimeEnvironment,
  keys: readonly string[],
) {
  for (const key of keys) {
    const value = environment[key];
    if (value) target[key] = value;
  }
}

export function createSitesRuntimeVars(
  command: "build" | "serve",
  mapReleaseBootstrapVersion: string,
  environment: RuntimeEnvironment = process.env,
) {
  const vars: Record<string, string> = {
    MAP_RELEASE_BOOTSTRAP_VERSION: mapReleaseBootstrapVersion,
  };

  copyDefinedRuntimeValues(vars, environment, PUBLIC_RUNTIME_ENV_KEYS);

  // These values are server-only production secrets. Sites injects them at
  // runtime; only the local development server may copy them from process.env.
  if (command === "serve") {
    copyDefinedRuntimeValues(
      vars,
      environment,
      LOCAL_DEVELOPMENT_ONLY_ENV_KEYS,
    );
  }

  return vars;
}
