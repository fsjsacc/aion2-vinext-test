import { access } from "node:fs/promises";
import path from "node:path";

function routeModuleForTool(root, tool) {
  if (tool.route?.kind === "registry") {
    return path.join(root, "app", "[locale]", "tools", "[tool]", "page.tsx");
  }
  if (tool.route?.kind !== "custom") return null;

  const segments = tool.route.href.split("/").filter(Boolean);
  if (
    segments.length < 2 ||
    segments[0] !== "tools" ||
    segments.some((segment) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(segment))
  ) {
    return null;
  }
  return path.join(root, "app", "[locale]", ...segments, "page.tsx");
}

export async function validateLiveToolRouteFiles({ root, tools }) {
  const issues = [];
  for (const tool of tools ?? []) {
    if (tool?.status !== "live") continue;
    const routeModule = routeModuleForTool(root, tool);
    if (!routeModule) {
      issues.push(`Live tool ${tool?.slug ?? "unknown"} has an invalid route contract.`);
      continue;
    }
    try {
      await access(routeModule);
    } catch {
      const routeLabel = tool.route.kind === "custom" ? "custom entity route" : "registry route";
      issues.push(
        `Live tool ${tool.slug} requires a ${routeLabel}: ${path.relative(root, routeModule)}`,
      );
    }
  }
  return issues;
}

export async function assertLiveToolRouteFiles(options) {
  const issues = await validateLiveToolRouteFiles(options);
  if (issues.length > 0) {
    throw new Error(`Live tool route validation failed:\n- ${issues.join("\n- ")}`);
  }
}
