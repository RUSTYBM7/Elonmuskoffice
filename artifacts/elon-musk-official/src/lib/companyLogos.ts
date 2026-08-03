/**
 * Official logo URLs for Elon Musk companies
 */
export const COMPANY_LOGOS = {
  Tesla: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
  SpaceX: "https://upload.wikimedia.org/wikipedia/commons/d/de/SpaceX-Logo.svg",
  Neuralink: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Neuralink_Logo.png",
  xAI: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Logo_Grok_AI_%28xAI%29_2025.png",
  X: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/X_logo_2023.svg/2048px-X_logo_2023.svg.png",
  Starlink: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Starlink_Logo.svg",
  "The Boring Company": "https://upload.wikimedia.org/wikipedia/commons/3/3b/The_Boring_Company_Logo.svg",
  "Boring Co.": "https://upload.wikimedia.org/wikipedia/commons/3/3b/The_Boring_Company_Logo.svg",
  Grok: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Logo_Grok_AI_%28xAI%29_2025.png",
} as const;

export type CompanyName = keyof typeof COMPANY_LOGOS;

export function logoFor(name: string): string {
  for (const [key, val] of Object.entries(COMPANY_LOGOS)) {
    if (name.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(name.toLowerCase())) {
      return val;
    }
  }
  return "";
}
