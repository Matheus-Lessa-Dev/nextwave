// Deployment configuration. Public copy belongs in src/i18n/dictionaries/.
function getSiteUrl(): string | undefined {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (!configured) return undefined;
  try {
    const url = new URL(configured);
    return ["https:", "http:"].includes(url.protocol) ? url.origin : undefined;
  } catch {
    return undefined;
  }
}
export const site = { name: "NextWave", url: getSiteUrl() } as const;
