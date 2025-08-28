import React, { useMemo, useRef, useState } from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import { PROJECTS } from "@/data/projects";
import { ExternalLink, Github } from "lucide-react";

/** Build a base-aware URL for files in /public */
const withBase = (path?: string) =>
  path ? `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}` : undefined;

function Preview({
  title,
  thumb,
  previewVideo,
  previewGif,
}: {
  title: string;
  thumb?: string;
  previewVideo?: string;
  previewGif?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasVideo = Boolean(previewVideo);
  const hasGif = Boolean(previewGif);

  const onEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
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

export default function Projects() {
  // (Optional) category filter — keep off for now; enable when you want.
  const [activeFilter] = useState<"All" | "Robotics" | "Embedded" | "ML" | "Systems" | "Other">("All");

  const items = useMemo(() => {
    if (activeFilter === "All") return PROJECTS;
    return PROJECTS.filter(p => p.area === activeFilter);
  }, [activeFilter]);

  const empty = items.length === 0;

  return (
    <Section id="projects" className="py-12 md:py-20">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Projects</h2>

        {/* (Optional) Filters — uncomment to enable */}
        {false && (
          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            {["All", "Robotics", "Embedded", "ML", "Systems", "Other"].map((f) => (
              <button
                key={f}
                // onClick={() => setActiveFilter(f as any)}
                className={`rounded-full border px-3 py-1 transition-colors ${
                  activeFilter === f
                    ? "border-accent-blue text-accent-blue"
                    : "border-border text-subtext hover:border-accent-purple hover:text-accent-purple"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        {empty ? (
          <p className="mt-2 text-subtext">Coming soon.</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, idx) => (
              <article
                key={p.title}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-panel transition-all hover:-translate-y-0.5 hover:border-accent-blue hover:shadow-sm"
              >
                <Preview title={p.title} thumb={p.thumb} previewVideo={p.previewVideo} previewGif={p.previewGif} />

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-medium">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-subtext">{p.blurb}</p>

                  {p.tags?.length ? (
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
                  ) : null}

                  {(p.links?.live || p.links?.code) && (
                    <div className="mt-4 flex items-center gap-3">
                      {p.links.live && (
                        <a
                          className="group inline-flex items-center gap-1 text-accent-blue underline-offset-4 transition-colors hover:text-accent-purple hover:underline"
                          href={p.links.live}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live <ExternalLink className="size-4 opacity-70 transition-transform group-hover:translate-x-0.5" />
                        </a>
                      )}
                      {p.links.code && (
                        <a
                          className="group inline-flex items-center gap-1 text-accent-blue underline-offset-4 transition-colors hover:text-accent-purple hover:underline"
                          href={p.links.code}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Code <Github className="size-4 opacity-70 transition-transform group-hover:translate-x-0.5" />
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