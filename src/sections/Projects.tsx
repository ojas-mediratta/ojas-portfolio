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
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null)
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
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Projects
          </h2>
          
          {/* Filter buttons */}
          <div 
            className="flex flex-wrap items-center gap-3"
            onMouseLeave={() => setHoveredFilter(null)}
          >
            {filters.map((filter) => {
              const isActive = activeFilter === filter.value && !hoveredFilter
              const isHovered = hoveredFilter === filter.value
              const isHighlighted = isHovered || isActive
              
              return (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  onMouseEnter={() => setHoveredFilter(filter.value)}
                  className="rounded-xl border px-3 py-1.5 text-sm transition-all duration-300 ease-out"
                  style={{
                    borderColor: isHighlighted ? 'var(--color-accent-purple)' : 'var(--color-border)',
                    color: isHighlighted ? 'var(--color-accent-purple)' : 'var(--color-subtext)'
                  }}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedItems.map((p, idx) => (
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-panel transition-all hover:border-accent-purple hover:shadow-sm hover:-translate-y-1 cursor-pointer"
              onMouseEnter={() => setHoveredSlug(p.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
            >
              <div className="pt-4 px-4">
                <MediaPreview
                  title={p.title}
                  thumb={p.thumb}
                  previewVideo={p.previewVideo}
                  previewGif={p.previewGif}
                  fitVideoToWindow={Boolean(p.fitPreviewVideo)}
                  hovering={hoveredSlug === p.slug}
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                {/* Title */}
                <h3 className="text-base font-medium text-accent-white transition-all">
                  {p.title}
                </h3>

                <div className="flex-grow">
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
                          'border-accent-red text-accent-red',
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
                </div>

                {/* Buttons/Active indicator - anchored to bottom */}
                {(p.links?.link || p.links?.code || p.links?.paper || p.status === 'Active') && (
                  <div className="mt-4 flex items-center gap-4 items-center">
                    {p.links?.link && (
                      <a
                        href={p.links.link}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1 rounded-2xl border border-border px-4 py-2 text-sm font-medium text-text transition-colors text-accent-white hover:text-accent-purple hover:border-accent-purple cursor-pointer"
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
                        className="group inline-flex items-center gap-1 rounded-2xl border border-border px-4 py-2 text-sm font-medium text-text transition-colors text-accent-white hover:text-accent-purple hover:border-accent-purple cursor-pointer"
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
                        className="group inline-flex items-center gap-1 rounded-2xl border border-border px-4 py-2 text-sm font-medium text-text transition-colors text-accent-white hover:text-accent-purple hover:border-accent-purple cursor-pointer"
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
            </Link>
          ))}
        </div>

        {/* Show More Button */}
        {hasMoreItems && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-2 rounded-2xl border border-border px-6 py-3 text-sm font-medium text-accent-white transition-all hover:border-accent-purple hover:text-accent-purple hover:shadow-sm"
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