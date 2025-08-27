import React from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";

export default function Publications() {
  return (
    <Section id="publications" className="py-12 md:py-20">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Publications & Media
        </h2>
        <p className="mt-2 text-subtext">None yet — check back soon!</p>
      </Container>
    </Section>
  );
}