import React, { useMemo, useRef, useState, useEffect } from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import { PUBLICATIONS } from "@/data/publications";
import { ExternalLink, Github } from "lucide-react";

/** Build a base-aware URL for files in /public */
const withBase = (path?: string) =>
  path ? `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}` : undefined;

function MediaPreview({
  title,
  thumb,
  previewVideo,
  hovering,
}: {
  title: string;
  thumb?: string;
  previewVideo?: string;
  hovering: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (hovering && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => { });
    } else if (!hovering && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [hovering]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-bg">
      {hovering && previewVideo ? (
        <video
          ref={videoRef}
          className="h-24 w-40 object-cover sm:h-28 sm:w-48 md:h-32 md:w-56 lg:h-36 lg:w-64"
          muted
          playsInline
          loop
          preload="metadata"
          poster={thumb ? withBase(thumb) : undefined}
          src={withBase(previewVideo)}
          aria-label={`${title} preview`}
        />
      ) : thumb ? (
        <img
          className="h-24 w-40 object-cover sm:h-28 sm:w-48 md:h-32 md:w-56 lg:h-36 lg:w-64"
          src={withBase(thumb)}
          alt={`${title} thumbnail`}
          loading="lazy"
        />
      ) : (
        <div className="flex h-24 w-40 items-center justify-center text-subtext sm:h-28 sm:w-48 md:h-32 md:w-56 lg:h-36 lg:w-64">
          No preview
        </div>
      )}
    </div>
  );
}

function formatAuthors(authors?: string[] | string) {
  if (!authors) return null;
  const list = Array.isArray(authors)
    ? authors
    : authors.split(/\s*,\s*/).filter(Boolean);
  return (
    <>
      {list.map((name, i) => {
        const isOjas = /ojas\s+mediratta/i.test(name);
        return (
          <span key={`${name}-${i}`} className={isOjas ? "text-accent-orange" : undefined}>
            {name}
            {i < list.length - 1 ? ", " : ""}
          </span>
        );
      })}
    </>
  );
}

export default function Publications() {
  const items = useMemo(() => PUBLICATIONS, []);
  const empty = items.length === 0;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Section id="publications" className="py-12 md:py-20">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Publications &amp; Media
        </h2>

        {empty ? (
          <p className="mt-2 text-subtext">None yet — check back soon!</p>
        ) : (
          <div className="mt-8 space-y-4">
            {items.map((p, idx) => (
              <article
                key={`${p.title}-${idx}`}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-panel p-4 transition-colors hover:border-accent-orange md:gap-5 md:p-5"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Left: media preview */}
                <MediaPreview
                  title={p.title}
                  thumb={p.thumb}
                  previewVideo={p.previewVideo}
                  hovering={hoveredIndex === idx}
                />

                {/* Right: metadata */}
                <div className="min-w-0 flex-1">
                  {/* Title */}
                  <h3 className="text-lg font-medium tracking-tight sm:text-xl">
                    {p.title}
                  </h3>

                  {/* Citation-like line (authors) */}
                  {p.authors && (
                    <p className="mt-1 text-sm leading-relaxed text-subtext">
                      {formatAuthors(p.authors)}
                    </p>
                  )}

                  {/* Outlet / venue line in accent orange */}
                    {(p.outlet || p.date) && (
                    <p className="mt-1 text-sm">
                      <span className="text-subtext">{p.outlet}</span>
                      {p.outlet && p.date ? " • " : ""}
                      <span className="text-accent-orange">{p.date}</span>
                    </p>
                    )}

                  {/* Links: Paper / Code */}
                  {(p.href || p.code) && (
                    <div className="mt-3 flex items-center gap-4">
                      {p.href && (
                        <a
                          className="group inline-flex items-center gap-1 rounded-2xl border border-border px-4 py-2 text-sm font-medium text-text transition-colors text-accent-white hover:text-accent-orange hover:border-accent-orange"
                          href={p.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Paper
                          <ExternalLink className="size-4 transition-transform" />
                        </a>
                      )}
                      {p.code && (
                        <a
                          className="group inline-flex items-center gap-1 rounded-2xl border border-border px-4 py-2 text-sm font-medium text-text transition-colors text-accent-white hover:text-accent-orange hover:border-accent-orange"
                          href={p.code}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Code
                          <Github className="size-4 transition-transform" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}