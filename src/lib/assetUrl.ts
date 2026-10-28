// Files in public/ are referenced as "/images/…". Prefix them with Vite's base
// so they still load when the app is served from a subpath (GitHub Pages).
export function assetUrl(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}
