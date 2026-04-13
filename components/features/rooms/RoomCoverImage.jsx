import Image from "next/image";

/**
 * Cabecera visual de tarjeta de habitación: foto remota o degradado de respaldo (tema claro).
 */
export default function RoomCoverImage({
  imageUrl,
  alt,
  aspectClassName = "aspect-[4/3] sm:aspect-[16/10]",
}) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-zinc-100 ${aspectClassName}`}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-zinc-100 via-white to-sky-100"
          aria-hidden
        />
      )}
    </div>
  );
}
