import { useRef, useState, useEffect } from "react";

/** Build a base-aware URL for files in /public */
export const withBase = (path?: string) =>
  path ? `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}` : undefined;

type MediaPreviewSize = "sm" | "lg";

interface MediaPreviewProps {
  title: string;
  thumb?: string;
  previewVideo?: string;
  previewGif?: string;
  hovering: boolean;
  /**
   * Size variant:
   * - "lg" (default): Used in Projects grid (h-44/md:h-48, full width)
   * - "sm": Used in Research list (fixed width, smaller height)
   */
  size?: MediaPreviewSize;
  /** Border radius: "xl" or "2xl" (default) */
  rounded?: "xl" | "2xl";
}

const sizeClasses: Record<MediaPreviewSize, string> = {
  lg: "h-44 w-full md:h-48",
  sm: "h-24 w-40 sm:h-28 sm:w-48 md:h-32 md:w-56 lg:h-36 lg:w-64",
};

export default function MediaPreview({
  title,
  thumb,
  previewVideo,
  previewGif,
  hovering,
  size = "lg",
  rounded = "2xl",
}: MediaPreviewProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (hovering && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    } else if (!hovering && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [hovering]);

  const sizeClass = sizeClasses[size];
  const roundedClass = rounded === "xl" ? "rounded-xl" : "rounded-2xl";

  return (
    <div className={`relative overflow-hidden ${roundedClass} border border-border bg-bg`}>
      {hovering && previewGif ? (
        <img
          className={`${sizeClass} object-cover`}
          src={withBase(previewGif)}
          alt={`${title} preview`}
          loading="lazy"
        />
      ) : hovering && previewVideo ? (
        <video
          ref={videoRef}
          className={`${sizeClass} object-cover`}
          muted
          playsInline
          loop
          preload={size === "lg" ? "none" : "metadata"}
          poster={thumb ? withBase(thumb) : undefined}
          src={withBase(previewVideo)}
          aria-label={`${title} preview`}
        />
      ) : thumb ? (
        <div className="relative">
          {!imageLoaded && (
            <div className={`absolute inset-0 bg-panel animate-pulse ${sizeClass}`} />
          )}
          <img
            className={`${sizeClass} object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            src={withBase(thumb)}
            alt={title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
        </div>
      ) : (
        <div className={`flex ${sizeClass} items-center justify-center text-subtext`}>
          No preview
        </div>
      )}
    </div>
  );
}
