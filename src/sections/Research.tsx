import React, { useMemo, useState } from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import StatusIndicator from "@/components/StatusIndicator";
import MediaPreview from "@/components/MediaPreview";
import { RESEARCH } from "@/data/research";
import { ExternalLink, Github } from "lucide-react";

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
          <span key={`${name}-${i}`} className={isOjas ? "font-semibold text-accent-red" : undefined}>
            {name}
            {i < list.length - 1 ? ", " : ""}
          </span>
        );
      })}
    </>
  );
}

export default function Research() {
  const items = useMemo(() => RESEARCH, []);
  const empty = items.length === 0;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Section id="research" className="py-12 md:py-20">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Research
        </h2>

        {empty ? (
          <p className="mt-2 text-subtext">Papers under review — check back soon!</p>
        ) : (
          <div className="mt-8 space-y-4">
            {items.map((p, idx) => (
              <article
                key={`${p.title}-${idx}`}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-panel p-4 transition-all hover:border-accent-red md:gap-5 md:p-5 hover:shadow-sm hover:-translate-y-1"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Left: media preview */}
                <MediaPreview
                  title={p.title}
                  thumb={p.thumb}
                  previewVideo={p.previewVideo}
                  hovering={hoveredIndex === idx}
                  size="sm"
                  rounded="xl"
                />

                {/* Right: metadata */}
                <div className="min-w-0 flex-1">
                  {/* Title */}
                  <h3 className="text-lg font-medium tracking-tight sm:text-xl transition-all">
                    {p.title}
                  </h3>

                  {/* Citation-like line (authors) */}
                  {p.authors && (
                    <p className="mt-1 text-sm leading-relaxed text-subtext">
                      {formatAuthors(p.authors)}
                    </p>
                  )}

                  {/* Outlet, Date, Type line */}
                  <p className="mt-1 text-sm">
                    {p.outlet && <span className="text-subtext">{p.outlet}</span>}
                    {p.date && <><span className="text-subtext"> • </span><span className="text-accent-red">{p.date}</span></>}
                    <span className="text-subtext"> • </span>
                    <span className="text-accent-red capitalize">{p.type}</span>
                  </p>

                  {/* Links: Paper / Code */}
                  {(p.href || p.code || p.status === "Under Review") && (
                    <div className="mt-3 flex items-center gap-4">
                      {p.href && (
                        <a
                          className="group inline-flex items-center gap-1 rounded-2xl border border-border px-4 py-2 text-sm font-medium text-text transition-colors text-accent-white hover:text-accent-red hover:border-accent-red"
                          href={p.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Link
                          <ExternalLink className="size-4 transition-transform" />
                        </a>
                      )}
                      {p.code && (
                        <a
                          className="group inline-flex items-center gap-1 rounded-2xl border border-border px-4 py-2 text-sm font-medium text-text transition-colors text-accent-white hover:text-accent-red hover:border-accent-red"
                          href={p.code}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Code
                          <Github className="size-4 transition-transform" />
                        </a>
                      )}
                      
                      {p.status === "Under Review" && (
                        <StatusIndicator label="Under Review" className="ml-auto px-2" />
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