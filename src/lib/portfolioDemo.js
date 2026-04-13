/**
 * Modo portafolio: solo lectura / visualización.
 * Activa con `NEXT_PUBLIC_PORTFOLIO_DEMO=true` (build + runtime en API y UI).
 * El backend debe bloquear mutaciones aunque alguien llame la API directamente.
 */
export function isPortfolioDemo() {
  return process.env.NEXT_PUBLIC_PORTFOLIO_DEMO === "true";
}
