import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";
const [repositoryOwner = "yuxinww", repositoryName = "lianying-content-desk-mvp"] =
  process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const githubAssetPrefix = githubPages
  ? `https://${repositoryOwner}.github.io/${repositoryName}`
  : "";

const nextConfig: NextConfig = {
  ...(githubPages ? { output: "export" as const } : {}),
  assetPrefix: githubAssetPrefix,
  trailingSlash: githubPages,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
