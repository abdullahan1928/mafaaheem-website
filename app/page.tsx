"use client";

import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Activities from "@/components/home/Activities";
import Programs from "@/components/home/Programs";
import Values from "@/components/home/Values";
import CallToAction from "@/components/home/CallToAction";
import { useEffect } from "react";
import { initScrollReveal } from "@/lib/scroll-reveal";

const HomePage = () => {
  useEffect(() => {
    const cleanup = initScrollReveal();
    return cleanup;
  }, []);

  return (
    <main id="main-content" role="main">
      <Hero />
      <About />
      <Activities />
      <Programs />
      <Values />
      <CallToAction />
    </main>
  );
};

export default HomePage;
