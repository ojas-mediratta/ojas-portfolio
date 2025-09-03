import React, { useMemo, useRef, useState, useEffect } from 'react'
import Section from '@/components/Section'
import Container from '@/components/Container'
import { PROJECTS } from '@/data/projects'
import { Link } from 'react-router-dom'
import { Github, ExternalLink } from 'lucide-react'

const withBase = (path?: string) =>
  path ? `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}` : undefined

function Preview({
  title,
  thumb,
  previewVideo,
  hovering,
}: {
  title: string
  thumb?: string
  previewVideo?: string
  hovering: boolean
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (hovering && videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => { })
    } else if (!hovering && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [hovering])

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-bg">
      {hovering && previewVideo ? (
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
  )
}

export default function Projects() {
  const [activeFilter] = useState<
    'All' | 'Robotics' | 'Embedded' | 'ML' | 'Systems' | 'Other'
  >('All')
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)

  const items = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS
    return PROJECTS.filter((p) => p.area === activeFilter)
  }, [activeFilter])

  return (
    <Section id="projects" className="py-12 md:py-20">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Projects
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, idx) => (
            <article
              key={p.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-panel transition-all hover:border-accent-purple hover:shadow-sm"
              onMouseEnter={() => setHoveredSlug(p.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
            >
                <Link to={`/projects/${p.slug}`} className="block p-4">
                <Preview
                  title={p.title}
                  thumb={p.thumb}
                  previewVideo={p.previewVideo}
                  hovering={hoveredSlug === p.slug}
                />
                </Link>

              <div className="flex flex-1 flex-col p-5">
                {/* Title */}
                <Link
                  to={`/projects/${p.slug}`}
                  className="text-base font-medium text-accent-white transition-all hover:text-accent-purple hover:underline"
                >
                  {p.title}
                </Link>

                {/* Blurb */}
                <p className="mt-2 text-sm leading-relaxed text-subtext">
                  {p.blurb}
                </p>

                {/* Tags */}
                {p.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t, i) => {
                      const accents = [
                        'border-accent-purple text-accent-purple',
                        'border-accent-green text-accent-green',
                        'border-accent-orange text-accent-orange',
                        'border-accent-yellow text-accent-yellow',
                        'border-accent-blue text-accent-blue',
                        'border-accent-cyan text-accent-cyan',
                      ]
                      const style = accents[i % accents.length]
                      return (
                        <span
                          key={t}
                          className={`rounded-full border px-2.5 py-1 text-[11px] ${style} bg-bg`}
                        >
                          {t}
                        </span>
                      )
                    })}
                  </div>
                ) : null}

                {(p.links?.live || p.links?.code || p.active || p.status === 'In Progress') && (
                  <div className="mt-4 flex items-center gap-4 items-center">
                    {p.links?.live && (
                      <a
                        href={p.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1 rounded-2xl border border-border px-4 py-2 text-sm font-medium text-text transition-colors text-accent-white hover:text-accent-purple hover:border-accent-purple"
                      >
                        Link{' '}
                        <ExternalLink className="size-4 transition-transform" />
                      </a>
                    )}
                    {p.links?.code && (
                      <a
                        href={p.links.code}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1 rounded-2xl border border-border px-4 py-2 text-sm font-medium text-text transition-colors text-accent-white hover:text-accent-purple hover:border-accent-purple"
                      >
                        Code{' '}
                        <Github className="size-4 transition-transform" />
                      </a>
                    )}

                    {(p.active || p.status === 'Active') && (
                      <span className="ml-auto inline-flex items-center gap-2 text-sm font-medium text-emerald-400 px-2">
                        <span className="relative inline-flex h-2.5 w-2.5">
                          {/* bright core */}
                          <span
                          className="absolute inset-0 rounded-full bg-emerald-400 opacity-100 shadow-[0_0_12px_3px_rgba(16,185,129,0.9)]"
                          aria-hidden
                          />
                          {/* soft halo with enhanced pulse */}
                          <span
                          className="absolute inset-0 rounded-full bg-emerald-400/80 blur-[4px] animate-[pulse_1.5s_ease-in-out_infinite]"
                          aria-hidden
                          />
                        </span>
                        Active
                      </span>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}