import { forwardRef } from "react";
import imageManifest from "@/lib/image-manifest.json";

type ManifestVariant = { width: number; path: string };
type ManifestEntry = {
  width: number;
  height: number;
  avif: ManifestVariant[];
  webp: ManifestVariant[];
  fallback: ManifestVariant[];
};

const manifest = imageManifest as Record<string, ManifestEntry>;

function toSrcSet(variants: ManifestVariant[]): string {
  return variants.map((v) => `${v.path} ${v.width}w`).join(", ");
}

type ResponsiveImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  objectFit?: "cover" | "contain";
  onError?: () => void;
  onLoad?: () => void;
  style?: React.CSSProperties;
  "aria-hidden"?: React.AriaAttributes["aria-hidden"];
};

export const ResponsiveImage = forwardRef<HTMLImageElement, ResponsiveImageProps>(function ResponsiveImage(
  { src, alt, sizes = "100vw", priority = false, className, objectFit, onError, onLoad, style, "aria-hidden": ariaHidden },
  ref
) {
  const entry = manifest[src];
  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : "auto";
  const fitStyle = objectFit ? { objectFit, ...style } : style;

  if (!entry) {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        aria-hidden={ariaHidden}
        className={className}
        style={fitStyle}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        onError={onError}
        onLoad={onLoad}
      />
    );
  }

  const fallbackLargest = entry.fallback[entry.fallback.length - 1];
  const avifSrcSet = toSrcSet(entry.avif);

  return (
    <>
      {priority ? (
        <link
          rel="preload"
          as="image"
          href={fallbackLargest.path}
          imageSrcSet={avifSrcSet}
          imageSizes={sizes}
          fetchPriority="high"
          type="image/avif"
        />
      ) : null}
      <picture>
        <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
        <source type="image/webp" srcSet={toSrcSet(entry.webp)} sizes={sizes} />
        <img
          ref={ref}
          src={fallbackLargest.path}
          srcSet={toSrcSet(entry.fallback)}
          sizes={sizes}
          alt={alt}
          aria-hidden={ariaHidden}
          width={entry.width}
          height={entry.height}
          className={className}
          style={fitStyle}
          loading={loading}
          decoding="async"
          fetchPriority={fetchPriority}
          onError={onError}
          onLoad={onLoad}
        />
      </picture>
    </>
  );
});
