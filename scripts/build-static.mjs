// Builds a static copy of the site into out/ (for Cloudflare Pages direct upload, etc.).
// API routes can't be exported, so app/api is moved aside for the duration of the build.
import { execSync } from "node:child_process";
import { existsSync, renameSync } from "node:fs";

const api = "app/api";
const parked = ".api-parked";
if (existsSync(parked)) renameSync(parked, api); // recover from an interrupted run
renameSync(api, parked);
try {
  execSync("next build", { stdio: "inherit", env: { ...process.env, STATIC_EXPORT: "1" } });
} finally {
  renameSync(parked, api);
}
