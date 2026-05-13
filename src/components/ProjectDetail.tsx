import React, { useMemo, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Gallery from "@/components/Gallery";
import MouseGlow from "@/components/MouseGlow";
import { PROJECTS, ContentSection } from "@/data/projects";
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import katex from "katex";
import "katex/dist/katex.min.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const withBase = (path?: string) =>
  path ? `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}` : undefined;

const renderKatex = (expression: string, displayMode = false, key?: string) => (
  <span
    key={key}
    className={displayMode ? "my-4 block overflow-x-auto text-center" : "align-baseline"}
    dangerouslySetInnerHTML={{
      __html: katex.renderToString(expression, { displayMode, throwOnError: false, strict: "warn" }),
    }}
  />
);

const renderInlineContent = (text: string) => {
  const nodes: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  const tokenRegex = /\[([^\]]+)\]\(([^)]+)\)|\$([^$\n]+?)\$/g;
  let match;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      nodes.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noreferrer"
          className="text-accent-blue underline hover:text-accent-purple"
        >
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      nodes.push(renderKatex(match[3], false, String(match.index)));
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
};

const renderRichText = (text: string) => {
  const blocks = text.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);

  return blocks.map((block, index) => {
    const trimmed = block.trim();
    const isDisplayMath = trimmed.startsWith("$$") && trimmed.endsWith("$$");

    if (isDisplayMath) {
      const expression = trimmed.slice(2, -2).trim();
      return renderKatex(expression, true, `math-${index}`);
    }

    return (
      <p key={index} className="whitespace-pre-line leading-relaxed">
        {renderInlineContent(trimmed)}
      </p>
    );
  });
};

const renderSlideBody = (text: string) => {
  const notesMatch = text.match(/\n\s*Notes(?: for the equation)?:\s*\n/);

  if (!notesMatch || notesMatch.index === undefined) {
    return renderRichText(text);
  }

  const bodyText = text.slice(0, notesMatch.index).trim();
  const notesText = text.slice(notesMatch.index + notesMatch[0].length).trim();
  const noteLines = notesText.split(/\n+/).map((line) => line.trim()).filter(Boolean);

  return [
    ...renderRichText(bodyText),
    <div key="notes-section" className="mt-6">
      <p className="font-semibold text-text">Notes</p>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-text">
        {noteLines.map((line, index) => (
          <li key={index} className="leading-relaxed">
            {renderInlineContent(line)}
          </li>
        ))}
      </ul>
    </div>,
  ];
};

// Helper function to extract YouTube video ID from URL or return ID if already provided
const getYouTubeVideoId = (input: string): string => {
  // If it's already a video ID (11 characters, alphanumeric + hyphens/underscores)
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return input;
  }
  
  // Extract from various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
  ];
  
  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) return match[1];
  }
  
  return input; // Return as-is if no pattern matches
};

function SectionCarousel({
  items,
  title,
}: {
  items: { src: string; caption?: string }[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const AUTO_ROTATE_MS = 4500;

  const next = () => setIndex((prev) => (prev + 1) % items.length);
  const prev = () => setIndex((prev) => (prev - 1 + items.length) % items.length);

  useEffect(() => {
    if (items.length <= 1) return;
    const intervalId = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(intervalId);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) {
      setProgress(0);
      return undefined;
    }

    let animationId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const nextProgress = Math.min(elapsed / AUTO_ROTATE_MS, 1);
      setProgress(nextProgress);

      if (nextProgress < 1) {
        animationId = window.requestAnimationFrame(tick);
      }
    };

    animationId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationId);
  }, [index, items.length]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex h-[320px] w-full max-w-4xl items-center justify-center overflow-hidden rounded-2xl border border-border bg-panel sm:h-[420px] md:h-[520px] lg:h-[620px]">
        {items.map((item, itemIdx) => (
          <div
            key={item.src}
            className={`transition-opacity duration-300 ${itemIdx === index ? "block" : "hidden"}`}
          >
            <img
              src={withBase(item.src)}
              alt={item.caption || `${title} carousel ${itemIdx + 1}`}
              className="h-full w-full object-contain bg-bg/50"
              loading="lazy"
            />
          </div>
        ))}

        {items.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-border bg-panel p-2 text-text transition-colors hover:bg-bg hover:text-accent-purple"
              aria-label="Previous slide"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-border bg-panel p-2 text-text transition-colors hover:bg-bg hover:text-accent-purple"
              aria-label="Next slide"
            >
              <ChevronRight className="size-6" />
            </button>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div className="h-1 w-36 overflow-hidden rounded-full bg-border/60">
          <div
            className="h-full bg-accent-purple transition-[width] duration-100"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      )}

      {items[index]?.caption && (
        <p className="text-center text-sm text-subtext italic">{items[index].caption}</p>
      )}

      {items.length > 1 && (
        <div className="flex justify-center gap-2">
          {items.map((_, itemIdx) => (
            <button
              key={itemIdx}
              onClick={() => setIndex(itemIdx)}
              className={`h-2 rounded-full transition-all ${
                itemIdx === index ? "w-8 bg-accent-purple" : "w-2 bg-border hover:bg-subtext"
              }`}
              aria-label={`Go to slide ${itemIdx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PdfSlidesViewer({
  src,
  caption,
  slides,
  title,
}: {
  src: string;
  caption?: string;
  slides: { title?: string; body: string }[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState(0);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const hasSlides = slides.length > 0;
  const totalSlides = numPages ?? Math.max(slides.length, 1);
  const currentSlide = hasSlides ? slides[index % slides.length] : undefined;
  const pdfSrc = withBase(src);
  const pdfFile = useMemo(() => (pdfSrc ? { url: pdfSrc } : null), [pdfSrc]);

  useEffect(() => {
    if (!container) return;
    const observer = new ResizeObserver(() => {
      setPageWidth(container.clientWidth);
    });
    observer.observe(container);
    setPageWidth(container.clientWidth);
    return () => observer.disconnect();
  }, [container]);

  useEffect(() => {
    setIndex(0);
    setNumPages(null);
  }, [src]);

  useEffect(() => {
    if (!totalSlides) return;
    setIndex((prev) => prev % totalSlides);
  }, [totalSlides]);

  if (!hasSlides) {
    return null;
  }

  const next = () => setIndex((prev) => (prev + 1) % totalSlides);
  const prev = () => setIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-panel" ref={setContainer}>
        {pdfFile ? (
          <div className="flex min-h-[320px] w-full items-center justify-center p-2">
            <Document
              file={pdfFile}
              onLoadSuccess={({ numPages: loadedPages }) => setNumPages(loadedPages)}
              loading={<p className="text-subtext">Loading slides...</p>}
              error={<p className="px-4 text-center text-subtext">Unable to load PDF slides.</p>}
            >
              <Page
                pageNumber={Math.min(index + 1, totalSlides)}
                width={pageWidth > 0 ? Math.max(pageWidth - 16, 280) : undefined}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        ) : (
          <div className="flex min-h-[320px] items-center justify-center px-6 text-center text-subtext">
            Slides unavailable.
          </div>
        )}

        {totalSlides > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-border bg-panel p-2 text-text transition-colors hover:bg-bg hover:text-accent-purple"
              aria-label="Previous slide"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-border bg-panel p-2 text-text transition-colors hover:bg-bg hover:text-accent-purple"
              aria-label="Next slide"
            >
              <ChevronRight className="size-6" />
            </button>
          </>
        )}
      </div>

      <div className="w-full max-w-5xl rounded-2xl border border-border bg-bg/40 p-4">
        <p className="text-xs uppercase tracking-wider text-subtext">
          Slide {index + 1} / {totalSlides}
        </p>
        {currentSlide?.title && (
          <h3 className="mt-1 text-lg font-semibold text-text">{currentSlide.title}</h3>
        )}
        <div className="mt-2 text-text">
          {currentSlide ? renderSlideBody(currentSlide.body) : null}
        </div>
      </div>

      {caption && <p className="text-center text-sm text-subtext italic">{caption}</p>}

      {totalSlides > 1 && (
        <div className="flex justify-center gap-2">
          {slides.map((_, itemIdx) => (
            <button
              key={itemIdx}
              onClick={() => setIndex(itemIdx)}
              className={`h-2 rounded-full transition-all ${
                itemIdx === index ? "w-8 bg-accent-purple" : "w-2 bg-border hover:bg-subtext"
              }`}
              aria-label={`Go to slide ${itemIdx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = useMemo(() => PROJECTS.find(p => p.slug === slug), [slug]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryProgress, setGalleryProgress] = useState(0);
  const GALLERY_ROTATE_MS = 4500;

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const nextSlide = () => {
    if (project?.gallery) {
      setCurrentIndex((prev) => (prev + 1) % project.gallery!.length);
    }
  };

  const prevSlide = () => {
    if (project?.gallery) {
      setCurrentIndex((prev) => (prev - 1 + project.gallery!.length) % project.gallery!.length);
    }
  };

  useEffect(() => {
    if (!project?.gallery || project.gallery.length <= 1) {
      setGalleryProgress(0);
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % project.gallery!.length);
    }, GALLERY_ROTATE_MS);

    return () => window.clearInterval(intervalId);
  }, [project?.gallery?.length]);

  useEffect(() => {
    if (!project?.gallery || project.gallery.length <= 1) {
      setGalleryProgress(0);
      return undefined;
    }

    let animationId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const nextProgress = Math.min(elapsed / GALLERY_ROTATE_MS, 1);
      setGalleryProgress(nextProgress);

      if (nextProgress < 1) {
        animationId = window.requestAnimationFrame(tick);
      }
    };

    animationId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationId);
  }, [currentIndex, project?.gallery?.length]);


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
    <>
      <MouseGlow />
      <Section id={`project-detail-${slug ?? "unknown"}`} className="relative py-12 md:py-20">
        <Container>
        <div className="relative z-10 rounded-3xl border border-border bg-panel p-5 md:p-8">
          <div className="mb-6">
            <Link to="/" className="group inline-flex items-center gap-1 rounded-2xl border border-border px-4 py-2 text-sm font-medium text-text transition-colors text-accent-white hover:text-accent-purple hover:border-accent-purple">
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

            {/* Top-right links: Link / Code / Paper*/}
            <div className="mb-3 flex items-center gap-4 md:absolute md:right-8 md:top-8 md:mt-0 ">
              {project.links?.link && (
                <a
                  href={project.links.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 rounded-2xl border border-border px-4 py-2 text-sm font-medium text-text transition-colors text-accent-white hover:text-accent-purple hover:border-accent-purple"
                >
                  Link <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              )}
              {project.links?.code && (
                <a
                  href={project.links.code}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 rounded-2xl border border-border px-4 py-2 text-sm font-medium text-text transition-colors text-accent-white hover:text-accent-purple hover:border-accent-purple"
                >
                  Code <Github className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              )}
              {project.links?.paper && (
                <a
                  href={/^https?:\/\//.test(project.links.paper) ? project.links.paper : withBase(project.links.paper)}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 rounded-2xl border border-border px-4 py-2 text-sm font-medium text-text transition-colors text-accent-white hover:text-accent-purple hover:border-accent-purple"
                >
                  Paper <FileText className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          </div>

          {/* Hero media */}
          {!project.hideHeroMedia && (
            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-panel">
              {project.youtubeVideo ? (
                <div className="aspect-video w-full">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(project.youtubeVideo)}`}
                    title={`${project.title} video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : project.mainVideo ? (
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
          )}

          {/* Body (legacy) */}
          {project.body && (
            <div className="mt-6 max-w-none whitespace-pre-line text-text">
              {project.body}
            </div>
          )}

          {/* Sections (new structured content) */}
          {project.sections && project.sections.length > 0 && (
            <div className="mt-6 space-y-6">
              {project.sections.map((section: ContentSection, idx: number) => {
                switch (section.type) {
                  case 'text':
                    return (
                      <div key={idx} className="space-y-3 text-text">
                        {renderRichText(section.content)}
                      </div>
                    );
                  case 'video':
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <video
                          src={withBase(section.src)}
                          className="w-1/2 min-w-[250px] max-h-[500px] rounded-2xl border border-border bg-bg/50 object-contain"
                          muted
                          playsInline
                          controls
                          preload="metadata"
                        />
                        {section.caption && (
                          <p className="text-sm text-subtext italic">{section.caption}</p>
                        )}
                      </div>
                    );
                  case 'videos':
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <div className="flex w-full flex-wrap justify-center gap-4">
                          {section.items.map((src, vidIdx) => (
                            <video
                              key={vidIdx}
                              src={withBase(src)}
                              className="w-[calc(50%-1rem)] min-w-[250px] max-h-[500px] rounded-2xl border border-border bg-bg/50 object-contain"
                              muted
                              playsInline
                              controls
                              preload="metadata"
                            />
                          ))}
                        </div>
                        {section.caption && (
                          <p className="text-sm text-subtext italic">{section.caption}</p>
                        )}
                      </div>
                    );
                  case 'image':
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <img
                          src={withBase(section.src)}
                          alt={section.caption || ''}
                          className="w-1/2 min-w-[250px] max-h-[500px] rounded-2xl border border-border object-contain"
                        />
                        {section.caption && (
                          <p className="text-sm text-subtext italic">{section.caption}</p>
                        )}
                      </div>
                    );
                  case 'images':
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <div className="flex w-full flex-wrap justify-center gap-4">
                          {section.items.map((src, imgIdx) => {
                            const isVideo = /\.(mp4|webm|mov)$/i.test(src);
                            return isVideo ? (
                              <video
                                key={imgIdx}
                                src={withBase(src)}
                                className="w-[calc(50%-1rem)] min-w-[250px] max-h-[500px] rounded-2xl border border-border bg-bg/50 object-contain"
                                muted
                                playsInline
                                controls
                                preload="metadata"
                              />
                            ) : (
                              <img
                                key={imgIdx}
                                src={withBase(src)}
                                alt={section.caption || ''}
                                className="w-[calc(50%-1rem)] min-w-[250px] max-h-[500px] rounded-2xl border border-border object-contain"
                              />
                            );
                          })}
                        </div>
                        {section.caption && (
                          <p className="text-sm text-subtext italic">{section.caption}</p>
                        )}
                      </div>
                    );
                  case 'carousel':
                    return (
                      <div key={idx}>
                        <SectionCarousel items={section.items} title={project.title} />
                      </div>
                    );
                  case 'pdfSlides':
                    return (
                      <div key={idx}>
                        <PdfSlidesViewer
                          src={section.src}
                          caption={section.caption}
                          slides={section.slides}
                          title={project.title}
                        />
                      </div>
                    );
                  case 'youtube':
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <div className="aspect-video w-1/2 min-w-[250px] overflow-hidden rounded-2xl border border-border">
                          <iframe
                            className="h-full w-full"
                            src={`https://www.youtube.com/embed/${section.videoId}`}
                            title="YouTube video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        {section.caption && (
                          <p className="text-sm text-subtext italic">{section.caption}</p>
                        )}
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          )}

          {/* Gallery (carousel) */}
          {project.gallery?.length ? (
            <div className="mt-8 flex justify-center">
              <div className="w-1/2 min-w-[400px]">
                <h2 className="mb-4 text-center text-xl font-semibold">Gallery</h2>
                <div className="relative">
                <div className="overflow-hidden rounded-2xl border border-border bg-panel">
                {project.gallery.map((g, idx) => {
                  const isVideo = g.endsWith('.mp4') || g.endsWith('.webm') || g.endsWith('.mov');
                  const isImage = g.endsWith('.jpg') || g.endsWith('.jpeg') || g.endsWith('.png') || 
                                 g.endsWith('.gif') || g.endsWith('.webp') || g.endsWith('.svg');
                  
                  return (
                    <div
                      key={idx}
                      className={`transition-opacity duration-300 ${
                        idx === currentIndex ? 'block' : 'hidden'
                      }`}
                    >
                      {isVideo ? (
                        <video
                          src={withBase(g)}
                          className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-contain bg-bg/50"
                          muted
                          playsInline
                          controls
                          preload="metadata"
                        />
                      ) : isImage ? (
                        <img
                          src={withBase(g)}
                          className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-contain bg-bg/50"
                          alt={`${project.title} gallery ${idx + 1}`}
                          loading="lazy"
                        />
                      ) : (
                        <img
                          src={withBase(g)}
                          className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-contain bg-bg/50"
                          alt={`${project.title} gallery ${idx + 1}`}
                          loading="lazy"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              {project.gallery.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-border bg-panel p-2 text-text transition-colors hover:bg-bg hover:text-accent-purple"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-border bg-panel p-2 text-text transition-colors hover:bg-bg hover:text-accent-purple"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </>
              )}

              {/* Indicators */}
              {project.gallery.length > 1 && (
                <>
                  <div className="mt-4 flex justify-center">
                    <div className="h-1 w-36 overflow-hidden rounded-full bg-border/60">
                      <div
                        className="h-full bg-accent-purple transition-[width] duration-100"
                        style={{ width: `${Math.round(galleryProgress * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex justify-center gap-2">
                    {project.gallery.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === currentIndex
                            ? 'w-8 bg-accent-purple'
                            : 'w-2 bg-border hover:bg-subtext'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
              </div>
              </div>
            </div>
          ) : null}
        </div>
        </Container>
      </Section>
    </>
  );
}