import React, { useMemo, useState, useEffect } from 'react'
import Section from '@/components/Section'
import Container from '@/components/Container'
import StatusIndicator from '@/components/StatusIndicator'
import MediaPreview, { withBase } from '@/components/MediaPreview'
import { PROJECTS } from '@/data/projects'
import { Link } from 'react-router-dom'
import { Github, ExternalLink, ChevronDown, ChevronUp, FileText } from 'lucide-react'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<
    'All' | 'Robotics' | 'Embedded' | 'AI/ML' | 'Other'
  >('All')
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const filters = [
    { label: 'All', value: 'All' as const },
    { label: 'Robotics', value: 'Robotics' as const },
    { label: 'Embedded', value: 'Embedded' as const },
    { label: 'AI/ML', value: 'AI/ML' as const }, 
    { label: 'Other', value: 'Other' as const },
  ]

  const items = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS
    return PROJECTS.filter((p) => {
      if (!p.area) return false
      if (Array.isArray(p.area)) {
        return p.area.includes(activeFilter)
      }
      return p.area === activeFilter
    })
  }, [activeFilter])

  const displayedItems = useMemo(() => {
    if (showAll) return items
    return items.slice(0, 6)
  }, [items, showAll])

  const hasMoreItems = items.length > 6
  const hiddenCount = Math.max(0, items.length - 6)

  useEffect(() => {
    const preloadVideos = () => {
      items.forEach((project) => {
        if (project.previewVideo) {
          const video = document.createElement('video')
          video.preload = 'auto'
          video.src = withBase(project.previewVideo) || ''
          video.muted = true
          video.playsInline = true
          video.load()
        }
      })
    }

    preloadVideos()
  }, [items])

  // Reset showAll when filter changes
  useEffect(() => {
    setShowAll(false)
  }, [activeFilter])

  return (
    <Section id="projects" className="py-12 md:py-20">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Projects
          </h2>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.value
              
              return (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  aria-pressed={isActive}
                  className={`py-2 text-sm underline-offset-4 transition-colors hover:text-accent-purple ${isActive ? 'text-accent-purple underline' : 'text-subtext'}`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {displayedItems.map((p) => (
            <article
              key={p.slug}
              className="flex min-w-0 flex-col gap-5 border-b border-border pb-8"
              onMouseEnter={() => setHoveredSlug(p.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              onFocus={() => setHoveredSlug(p.slug)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setHoveredSlug(null)
              }}
            >
              <Link to={`/projects/${p.slug}`} className="block" aria-label={p.title}>
                <MediaPreview
                  title={p.title}
                  thumb={p.thumb}
                  previewVideo={p.previewVideo}
                  previewGif={p.previewGif}
                  fitVideoToWindow={Boolean(p.fitPreviewVideo)}
                  hovering={hoveredSlug === p.slug}
                  size="lg"
                  rounded="md"
                  framed={false}
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                {/* Title */}
                <h3 className="text-lg font-medium text-accent-white">
                  <Link to={`/projects/${p.slug}`} className="text-accent-white hover:text-accent-purple hover:underline underline-offset-4">{p.title}</Link>
                </h3>

                <div className="flex-grow">
                  {/* Blurb */}
                  <p className="mt-2 text-sm leading-relaxed text-subtext">
                    {p.blurb}
                  </p>

                  {/* Tags */}
                  {p.tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[11px] text-accent-purple">
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                {/* Buttons/Active indicator - anchored to bottom */}
                {(p.links?.link || p.links?.code || p.links?.paper || p.status === 'Active') && (
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                    {p.links?.link && (
                      <a
                        href={p.links.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 py-2 text-sm font-medium text-accent-white transition-colors hover:text-accent-purple hover:underline underline-offset-4"
                        onClick={(e) => e.stopPropagation()}
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
                        className="inline-flex items-center gap-1 py-2 text-sm font-medium text-accent-white transition-colors hover:text-accent-purple hover:underline underline-offset-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Code{' '}
                        <Github className="size-4 transition-transform" />
                      </a>
                    )}
                    {p.links?.paper && (
                      <a
                        href={/^https?:\/\//.test(p.links.paper) ? p.links.paper : `${import.meta.env.BASE_URL}${p.links.paper.replace(/^\/+/, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 py-2 text-sm font-medium text-accent-white transition-colors hover:text-accent-purple hover:underline underline-offset-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Paper{' '}
                        <FileText className="size-4 transition-transform" />
                      </a>
                    )}

                    {p.status === 'Active' && (
                      <StatusIndicator label="Active" className="ml-auto px-2" />
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Show More Button */}
        {hasMoreItems && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-2 py-3 text-sm font-medium text-accent-white transition-colors hover:text-accent-purple hover:underline underline-offset-4"
            >
              {showAll ? 'Show Less' : `Show ${hiddenCount} more`}
              {showAll ? (
                <ChevronUp className="size-4 transition-transform duration-200" />
              ) : (
                <ChevronDown className="size-4 transition-transform duration-200" />
              )}
            </button>
          </div>
        )}
      </Container>
    </Section>
  )
}
