import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { execFileSync } from "node:child_process";

function sourceBuildId() {
  if (process.env.VERCEL_GIT_COMMIT_SHA) return process.env.VERCEL_GIT_COMMIT_SHA;
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  } catch {
    return `suspec-${process.env.npm_package_version ?? "dev"}`;
  }
}

const nextConfig = (phase: string): NextConfig => ({
  output: "export",
  generateBuildId: async () => sourceBuildId(),
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : "dist",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
});

export default nextConfig;
