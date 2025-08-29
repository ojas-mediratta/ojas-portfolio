import React from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import { EDUCATION } from "@/data/education";
import GTLogo from "@/assets/gt_logo.svg?react";

// simple registry: add more schools by importing and mapping here
const eduLogos = {
  gt: GTLogo,
} as const;

export default function Education() {
  return (
    <Section id="education" className="py-12 md:py-0">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Education
        </h2>

        <div className="mt-8 space-y-6">
          {EDUCATION.map((edu, idx) => {
            const Logo = edu.logoKey ? eduLogos[edu.logoKey] : null;
            const size = edu.logoSize ?? 56;
            const stroke = edu.logoStroke ?? 4.0;

            return (
              <div
                key={idx}
                className="group rounded-xl border border-border bg-panel p-5 transition-colors hover:border-accent-yellow"
              >
                <div className="flex items-center gap-4">
                  {/* Left: logo — left-justified, vertically centered */}
                  <Logo
                    className={"text-subtext transition-colors group-hover:text-accent-yellow [&_*]:fill-current"}
                    style={{
                      width: size,
                      height: size,
                      strokeWidth: stroke,
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                    }}
                    aria-hidden
                  />

                  {/* Right: content */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-medium">{edu.school}</h3>
                    <p className="text-sm text-accent-yellow">{edu.degree}</p>
                    <p className="text-xs text-subtext">{edu.date}</p>

                    {edu.details?.length ? (
                      <ul className="mt-3 list-disc list-inside text-sm text-subtext space-y-1">
                        {edu.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}