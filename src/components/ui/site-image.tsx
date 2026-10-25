import Image from "next/image";
import type { SiteImageKey } from "@/lib/site-images";
import { siteImages } from "@/lib/site-images";

type SiteImageProps = {
  imageKey: SiteImageKey;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fill?: boolean;
};

export function SiteImage({
  imageKey,
  alt,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, 980px",
  fill = false,
}: SiteImageProps) {
  const image = siteImages[imageKey];

  if (fill) {
    return (
      <Image
        src={image.src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <Image
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
