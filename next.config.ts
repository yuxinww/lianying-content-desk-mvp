import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "lianying-content-desk-mvp";
const githubBasePath = githubPages ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  ...(githubPages ? { output: "export" as const } : {}),
  assetPrefix: githubBasePath,
  trailingSlash: githubPages,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
