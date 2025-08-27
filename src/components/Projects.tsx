import React from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Anchor from "@/components/Anchor";
import { PROJECTS } from "@/data/projects";

export default function Projects() {
  return (
    <Section id="projects" className="py-12 md:py-20">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Projects
        </h2>

        {PROJECTS.length === 0 ? (
          <p className="mt-2 text-subtext">Coming soon.</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, idx) => (
              <article
                key={p.title}
                className="group flex flex-col justify-between rounded-3xl border border-border bg-panel p-5 transition-colors hover:border-accent-blue hover:shadow-sm"
              >
                <div>
                  <h3 className="text-lg font-medium">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-subtext">
                    {p.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t, i) => {
                      // Light sprinkle of accent borders on tags
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
                          className={`rounded-full border px-2.5 py-1 text-xs ${style} bg-bg`}
                        >
                          {t}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {p.link && (
                  <div className="mt-6">
                    <Anchor href={p.link}>Case study</Anchor>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}