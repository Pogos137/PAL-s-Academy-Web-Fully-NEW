import Hero from "@/components/sections/Hero";
import ProofRail from "@/components/sections/ProofRail";
import Pillars from "@/components/sections/Pillars";
import Method from "@/components/sections/Method";
import FoundingFamily from "@/components/sections/FoundingFamily";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CTA from "@/components/sections/CTA";
import JsonLd from "@/components/seo/JsonLd";
import { homepageFaqs } from "@/lib/faq-content";

// FAQPage structured data for the curated FAQ set shown in the accordion below.
// Matches the visible Q&A 1:1 (Google requires parity), and stays in sync because
// both read from lib/faq-content.ts.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homepageFaqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a }
  }))
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <Hero />
      <ProofRail />
      <Pillars />
      <Method />
      <FoundingFamily />
      <FaqAccordion />
      {/* Deliberately seasonless. This used to name the summer semester, which
          reads as neglected copy the moment the term turns over. */}
      <CTA note="We're accepting a limited number of students this term. Spots are allocated as tutors are matched, not held in reserve." />
    </>
  );
}
