import Hero from "@/components/sections/Hero";
import ProofRail from "@/components/sections/ProofRail";
import Pillars from "@/components/sections/Pillars";
import Method from "@/components/sections/Method";
import FoundingFamily from "@/components/sections/FoundingFamily";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CTA from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofRail />
      <Pillars />
      <Method />
      <FoundingFamily />
      <FaqAccordion />
      <CTA note="We're accepting a limited number of students for the summer semester. Spots are allocated as tutors are matched, not held in reserve." />
    </>
  );
}
