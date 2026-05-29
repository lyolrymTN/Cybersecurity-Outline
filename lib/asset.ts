/**
 * Resolve a path to a file in /public so it works both locally and under a
 * GitHub Pages subpath (e.g. /Cybersecurity-Outline).
 *
 * next/image with `images.unoptimized: true` (required for `output: export`)
 * does NOT prepend `basePath`/`assetPrefix` to a string `src`, so a literal
 * `src="/Cyber.png"` would 404 on GitHub Pages. We prepend the base path here.
 *
 * NEXT_PUBLIC_BASE_PATH is inlined at build time:
 *   - local dev / Vercel  → "" → "/Cyber.png"
 *   - GitHub Pages build  → "/Cybersecurity-Outline" → "/Cybersecurity-Outline/Cyber.png"
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}
