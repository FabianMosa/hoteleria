import Image from "next/image";

/**
 * Cabecera de tarjeta: foto con leve viñeta inferior o degradado de respaldo.
 */
export default function RoomCoverImage({
  imageUrl,
  alt,
  aspectClassName = "aspect-[4/3] sm:aspect-[16/10]",
}) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-surface-muted ${aspectClassName}`}
    >
      {imageUrl ? (
        <>
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/[0.12] via-transparent to-transparent"
            aria-hidden
          />
        </>
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-brand-soft/90 via-surface to-surface-muted"
          aria-hidden
        />
      )}
    </div>
  );
}
