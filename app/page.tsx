"use client";

import { useState } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollCanvas3D } from "@/components/ScrollCanvas3D";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { StorySection } from "@/components/StorySection";
import { ProblemComparison } from "@/components/ProblemComparison";
import { TransformationScene } from "@/components/TransformationScene";
import { FeatureCards } from "@/components/FeatureCards";
import { ThreeJsShowcase } from "@/components/ThreeJsShowcase";
import { PossibilitiesTracks } from "@/components/PossibilitiesTracks";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { ApplicationModal } from "@/components/ApplicationModal";

export default function Home() {
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  return (
    <SmoothScroll>
      <CustomCursor />

      {/* Persistent Fullscreen Three.js WebGL Canvas with Scroll-Driven Animation */}
      <ScrollCanvas3D />

      {/* Minimal Floating Navigation */}
      <Navigation onOpenApply={() => setIsApplyOpen(true)} />

      {/* Main Single-Page Storytelling Narrative */}
      <main className="relative flex flex-col w-full">
        {/* Hero Section */}
        <Hero />

        {/* Section 1 – The Introduction / Manifesto */}
        <StorySection />

        {/* Section 2 – The Problem / The Paradox */}
        <ProblemComparison />

        {/* Section 3 – The Transformation / Metamorphosis */}
        <TransformationScene />

        {/* Section 4 – The Experience / Interface OS */}
        <FeatureCards />

        {/* 3D Frontier Lab – Three.js Interactive Substrates & Example Showcase */}
        <ThreeJsShowcase />

        {/* Section 5 – The Possibilities / Research Tracks */}
        <PossibilitiesTracks />

        {/* Section 6 – Final Call to Action */}
        <FinalCTA onOpenApply={() => setIsApplyOpen(true)} />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Fellowship Application Drawer Modal */}
      <ApplicationModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />
    </SmoothScroll>
  );
}
