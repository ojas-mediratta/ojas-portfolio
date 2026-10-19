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
  /** If true, preview videos use object-contain instead of object-cover. */
  fitVideoToWindow?: boolean;
  /**
   * Size variant:
   * - "lg" (default): Used in Projects grid (16:10 aspect ratio, full width)
   * - "sm": Used in Research list (fixed width, smaller height)
   */
  size?: MediaPreviewSize;
  /** Border radius: "md", "xl", or "2xl" (default) */
  rounded?: "md" | "xl" | "2xl";
  framed?: boolean;
}

const sizeClasses: Record<MediaPreviewSize, string> = {
  lg: "aspect-[16/10] w-full",
  sm: "h-24 w-40 sm:h-28 sm:w-48 md:h-32 md:w-56 lg:h-36 lg:w-64",
};

export default function MediaPreview({
  title,
  thumb,
  previewVideo,
  previewGif,
  hovering,
  fitVideoToWindow = false,
  size = "lg",
  rounded = "2xl",
  framed = true,
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
  const roundedClass = { md: "rounded-md", xl: "rounded-xl", "2xl": "rounded-2xl" }[rounded];
  const videoFitClass = fitVideoToWindow ? "object-contain" : "object-cover";

  return (
    <div className={`relative shrink-0 overflow-hidden ${roundedClass} ${framed ? 'border border-border' : ''} bg-bg`}>
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
          className={`${sizeClass} ${videoFitClass}`}
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
