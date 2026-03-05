import React, { useMemo, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Gallery from "@/components/Gallery";
import { PROJECTS, ContentSection } from "@/data/projects";
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "@/data/theme";

const withBase = (path?: string) =>
  path ? `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}` : undefined;

// Helper function to parse markdown links in text
const parseMarkdownLinks = (text: string) => {
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  
  // Match markdown links: [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  
  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    
    // Add the link
    const linkText = match[1];
    const url = match[2];
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-accent-blue hover:text-accent-purple underline"
      >
        {linkText}
      </a>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts.length > 0 ? parts : [text];
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

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = useMemo(() => PROJECTS.find(p => p.slug === slug), [slug]);
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const glowColor = theme === 'dark' ? DARK_THEME.mouseGlow : LIGHT_THEME.mouseGlow;

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
              background: `radial-gradient(600px, ${glowColor}, transparent 80%)`,
            }}
          />
        </div>

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

            {/* Top-right links: Live / Code */}
            <div className="mb-3 flex items-center gap-4 md:absolute md:right-8 md:top-8 md:mt-0 ">
              {project.links?.link && (
                <a
                  href={project.links.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 rounded-2xl border border-border px-4 py-2 text-sm font-medium text-text transition-colors text-accent-white hover:text-accent-purple hover:border-accent-purple"
                >
                  Live <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5" />
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
            </div>
          </div>

          {/* Hero media */}
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
                      <div key={idx} className="whitespace-pre-line text-text leading-relaxed">
                        {parseMarkdownLinks(section.content)}
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
                <div className="mt-4 flex justify-center gap-2">
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
              )}
              </div>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}