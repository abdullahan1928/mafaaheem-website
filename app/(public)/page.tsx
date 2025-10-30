"use client";

import HeroSection from "@/components/home/Hero";
import AboutSection from "@/components/home/About";
import ActivitiesSection from "@/components/home/Activities";
import ProgramsSection from "@/components/home/Programs";
import ValuesSection from "@/components/home/Values";
import CTASection from "@/components/home/CTA";
import { useEffect } from "react";
import { initScrollReveal } from "@/lib/scroll-reveal";

const HomePage = () => {
  useEffect(() => {
    const cleanup = initScrollReveal();
    return cleanup;
  }, []);

  return (
    <main id="main-content" role="main">
      <HeroSection />
      <AboutSection />
      <ActivitiesSection />
      <ProgramsSection />
      <ValuesSection />
      <CTASection />
    </main>
  );
};

export default HomePage;
