/**
 * Build modes
 * -----------
 * - default (Vercel, Node hosts, `next dev`): full Next.js — SSG + dev server.
 * - `DEPLOY_TARGET=github-pages`: emits a fully static site to `out/`
 *   with basePath/assetPrefix from `NEXT_PUBLIC_BASE_PATH` so it can be
 *   served from `https://<user>.github.io/<repo>/`.
 */

const isGhPages = process.env.DEPLOY_TARGET === "github-pages";
// Under GitHub Pages the site is served from https://<user>.github.io/<repo>/,
// so it needs a basePath. Defaults to the repo name but can be overridden with
// NEXT_PUBLIC_BASE_PATH (the workflow sets it explicitly).
const basePath = isGhPages
  ? process.env.NEXT_PUBLIC_BASE_PATH || "/Cybersecurity-Outline"
  : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isGhPages && {
    output: "export",
    images: { unoptimized: true },
    trailingSlash: true,
    basePath,
    assetPrefix: basePath || undefined,
  }),
};

export default nextConfig;
