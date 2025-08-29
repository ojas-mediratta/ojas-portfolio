import React, { useMemo, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { PROJECTS } from "@/data/projects";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

const withBase = (path?: string) =>
  path ? `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}` : undefined;

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = useMemo(() => PROJECTS.find(p => p.slug === slug), [slug]);

  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);


  if (!project) {
    return (
      <Section id="project-detail-not-found">
        <Container>
          <p className="text-subtext">Project not found.</p>
          <Link to="/" className="mt-4 inline-flex items-center gap-1 text-accent-blue hover:text-accent-purple hover:underline">
            <ArrowLeft className="size-4" /> Back to home
          </Link>
        </Container>
      </Section>
    );
  }

  return (
    <Section id={`project-detail-${slug ?? "unknown"}`} className="relative py-12 md:py-20">
      <Container>
        {/* mouse glow under content */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div
            className="absolute h-[560px] w-[560px] rounded-full blur-3xl"
            style={{
              top: pos.y,
              left: pos.x,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(600px, rgba(89,194,255,0.15), transparent 80%)`,
            }}
          />
        </div>

        <div className="relative z-10 rounded-3xl border border-border bg-panel p-5 md:p-8">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center gap-1 text-accent-blue hover:text-accent-purple hover:underline">
              <ArrowLeft className="size-4" /> Back
            </Link>
          </div>

          {/* Header row */}
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {project.title}
              </h1>

              {/* Tags */}
              {project.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-accent-purple bg-bg px-2.5 py-1 text-[11px] text-accent-purple"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Top-right links: Live / Code */}
            <div className="mt-3 flex items-center gap-4 md:absolute md:right-6 md:top-6 md:mt-0">
              {project.links?.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 text-accent-blue hover:text-accent-purple hover:underline"
                >
                  Live <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              )}
              {project.links?.code && (
                <a
                  href={project.links.code}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 text-accent-blue hover:text-accent-purple hover:underline"
                >
                  Code <Github className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          </div>

          {/* Hero media */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-panel">
            {project.mainVideo ? (
              <video
                className="h-[340px] sm:h-[420px] md:h-[500px] w-full object-contain"
                muted
                playsInline
                controls
                preload="metadata"
                poster={project.thumb ? withBase(project.thumb) : undefined}
                src={withBase(project.mainVideo)}
              />
            ) : project.thumb ? (
              <img
                className="h-[340px] sm:h-[420px] md:h-[500px] w-full object-contain"
                src={withBase(project.thumb)}
                alt={`${project.title} hero`}
              />
            ) : (
              <div className="flex h-[340px] items-center justify-center text-subtext">No preview</div>
            )}
          </div>

          {/* Body */}
          {project.body && (
            <div className="prose prose-invert mt-6 max-w-none whitespace-pre-line">
              {project.body}
            </div>
          )}

            {/* Gallery */}
            {project.gallery?.length ? (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((g, idx) => {
              const isVideo = g.endsWith('.mp4') || g.endsWith('.webm');
              return (
                <a 
                key={idx}
                href={withBase(g)}
                target="_blank"
                rel="noreferrer"
                >
                {isVideo ? (
                  <video
                  src={withBase(g)}
                  className="w-full rounded-2xl border border-border object-cover hover:opacity-90 transition-opacity"
                  muted
                  playsInline
                  controls
                  preload="metadata"
                  />
                ) : (
                  <img
                  src={withBase(g)}
                  className="w-full rounded-2xl border border-border object-cover hover:opacity-90 transition-opacity"
                  alt={`${project.title} gallery ${idx + 1}`}
                  />
                )}
                </a>
              );
              })}
            </div>
            ) : null}
        </div>
      </Container>
    </Section>
  );
}