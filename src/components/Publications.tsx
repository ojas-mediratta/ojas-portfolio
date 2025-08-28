import React, { useMemo, useRef } from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import { PUBLICATIONS } from "@/data/publications";
import { ExternalLink } from "lucide-react";

/** Build a base-aware URL for files in /public */
const withBase = (path?: string) =>
  path ? `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}` : undefined;

function MediaThumb({
  thumb,
  previewVideo,
  previewGif,
  title,
}: {
  thumb?: string;
  previewVideo?: string;
  previewGif?: string;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasVideo = Boolean(previewVideo);
  const hasGif = Boolean(previewGif);

  const onEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      // play() may return a promise; ignore errors for autoplay policies (muted OK)
      videoRef.current.play().catch(() => {});
    }
  };
  const onLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border bg-bg"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {hasVideo ? (
        <video
          ref={videoRef}
          className="h-44 w-full object-cover md:h-48"
          muted
          playsInline
          loop
          preload="metadata"
          poster={thumb ? withBase(thumb) : undefined}
          src={withBase(previewVideo)}
          aria-label={`${title} preview`}
        />
      ) : hasGif ? (
        <img
          className="h-44 w-full object-cover md:h-48"
          src={withBase(previewGif)}
          alt={`${title} preview`}
        />
      ) : thumb ? (
        <img
          className="h-44 w-full object-cover md:h-48"
          src={withBase(thumb)}
          alt={`${title} thumbnail`}
        />
      ) : (
        <div className="flex h-44 w-full items-center justify-center text-subtext md:h-48">
          No preview
        </div>
      )}
    </div>
  );
}

export default function Publications() {
  const items = useMemo(() => PUBLICATIONS, []);
  const empty = items.length === 0;

  return (
    <Section id="publications" className="py-12 md:py-20">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Publications &amp; Media
        </h2>

        {empty ? (
          <p className="mt-2 text-subtext">None yet — check back soon!</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, idx) => (
              <article
                key={`${p.title}-${idx}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-panel transition-colors hover:border-accent-blue"
              >
                {/* Preview */}
                <MediaThumb
                  title={p.title}
                  thumb={p.thumb}
                  previewVideo={p.previewVideo}
                  previewGif={p.previewGif}
                />

                {/* Meta */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-medium">{p.title}</h3>

                  <div className="mt-1 text-xs text-subtext">
                    {p.outlet && <span>{p.outlet}</span>}
                    {p.outlet && p.date && <span className="mx-1">•</span>}
                    {p.date && <span>{p.date}</span>}
                    {p.type && (
                      <>
                        {(p.outlet || p.date) && <span className="mx-1">•</span>}
                        <span className="capitalize">{p.type}</span>
                      </>
                    )}
                  </div>

                  {p.tags && p.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((t, i) => {
                        const accents = [
                          "border-accent-blue text-accent-blue",
                          "border-accent-green text-accent-green",
                          "border-accent-yellow text-accent-yellow",
                          "border-accent-orange text-accent-orange",
                          "border-accent-purple text-accent-purple",
                        ];
                        const style = accents[(idx + i) % accents.length];
                        return (
                          <span
                            key={t}
                            className={`rounded-full border px-2.5 py-1 text-[11px] ${style} bg-bg`}
                          >
                            {t}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-3">
                    {p.href && (
                      <a
                        className="group inline-flex items-center gap-1 text-accent-blue underline-offset-4 transition-colors hover:text-accent-purple hover:underline"
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                        <ExternalLink className="size-4 opacity-70 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    )}
                    {p.pdf && (
                      <a
                        className="group inline-flex items-center gap-1 text-accent-blue underline-offset-4 transition-colors hover:text-accent-purple hover:underline"
                        href={withBase(p.pdf)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        PDF
                        <ExternalLink className="size-4 opacity-70 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}