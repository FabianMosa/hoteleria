import Link from "next/link";

/**
 * Datos de contacto y redes: en producción sustituí las URLs por las oficiales del hotel.
 * Los iconos son decorativos; el nombre de la red va en `aria-label` del enlace.
 */
const HOTEL_CONTACT = {
  email: "reservas@hoteleria.cl",
  phoneLabel: "+569 9999 9999",
  phoneHref: "tel:+56999999999",
};

/** URLs genéricas de plataforma; reemplazar por perfiles reales (p. ej. facebook.com/tuhotel). */
const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          fill="currentColor"
          d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          fill="currentColor"
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.881 0 1.44 1.44 0 012.881 0z"
        />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/5411000000000",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          fill="currentColor"
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
        />
      </svg>
    ),
  },
  {
    name: "Google Maps — cómo llegar",
    href: "",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          fill="currentColor"
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
        />
      </svg>
    ),
  },
];

/**
 * Pie: marca, navegación rápida, contacto, redes con foco visible y créditos (tema claro).
 */
export default function SiteFooter() {
  return (
    <footer className="relative mt-auto border-t border-border-hotel bg-gradient-to-b from-surface to-surface-muted/50">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/25 to-transparent"
        aria-hidden
      />
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div className="max-w-md">
            <p className="text-base font-semibold tracking-tight text-foreground">
              Hotelería
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-hotel">
              Espacios tranquilos para tu descanso. Elegí fechas, habitación y
              listo: confirmación inmediata, sin cuentas de usuario.
            </p>
          </div>

          <nav aria-label="Enlaces del pie">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80">
              Navegación
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <Link href="/" className="hotel-footer-link inline-block">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hotel-footer-link inline-block">
                  Habitaciones
                </Link>
              </li>
              <li>
                <Link
                  href="/reservations/new"
                  className="hotel-footer-link inline-block"
                >
                  Reservar
                </Link>
              </li>
            </ul>
          </nav>

          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80">
              Contacto y redes
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-hotel">
              <li>
                <a
                  href={`mailto:${HOTEL_CONTACT.email}`}
                  className="hotel-footer-link"
                >
                  {HOTEL_CONTACT.email}
                </a>
              </li>
              <li>
                <a href={HOTEL_CONTACT.phoneHref} className="hotel-footer-link">
                  {HOTEL_CONTACT.phoneLabel}
                </a>
              </li>
            </ul>
            <ul
              className="mt-5 flex flex-wrap items-center gap-3"
              aria-label="Redes sociales y ubicación"
            >
              {SOCIAL_LINKS.map(({ name, href, icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-hotel bg-surface text-muted-hotel transition-colors duration-200 hover:border-brand/40 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border-hotel/80 pt-8">
          <p className="text-center text-[11px] leading-relaxed text-muted-hotel sm:text-left">
            © {new Date().getFullYear()} Hotelería · Desarrollo: Bernardo
            Morales · Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
