import React, {useMemo, useState} from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import StatusIndicator from "@/components/StatusIndicator";
import { EXPERIENCES } from "@/data/experience";
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Experience() {
  const [showAll, setShowAll] = useState(false)

  const items = useMemo(() => {
    return EXPERIENCES
  }, [])

  const displayedItems = useMemo(() => {
    if (showAll) return items
    return items.slice(0, 3)
  }, [items, showAll])

  const hasMoreItems = items.length > 3
  const hiddenCount = Math.max(0, items.length - 3)
  
  return (
    <Section id="experience" className="py-12 md:py-20">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Experience</h2>
        <div className="mt-8 space-y-8">
          {displayedItems.map((exp, i) => (
            <div key={i} className="rounded-xl border border-border bg-panel p-5 hover:border-accent-green transition-all hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <h3 className="text-lg font-medium ">{exp.role}</h3>
                  <p className="text-sm text-accent-green">{exp.org}</p>
                  <p className="text-xs text-subtext">{exp.date}</p>
                </div>

                {exp.status && (
                  <div className="flex-shrink-0">
                    <StatusIndicator label={exp.status} />
                  </div>
                )}
              </div>
              
              {exp.details?.length ? (
                <ul className="mt-3 list-disc list-outside pl-5 text-sm text-subtext space-y-1">
                  {exp.details.map((detail, idx) => (
                    <li key={idx} className="leading-relaxed pl-1">{detail}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {hasMoreItems && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-2 rounded-2xl border border-border px-6 py-3 text-sm font-medium text-accent-white transition-all hover:border-accent-green hover:text-accent-green hover:shadow-sm"
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
  );
}