import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Boxes, Play } from "lucide-react";
import { LandingBackground } from "@/components/landing/LandingBackground";
import { HeroScene } from "@/components/landing/HeroScene";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { InteractiveProperty } from "@/components/landing/InteractiveProperty";
import {
  CapabilitiesSection,
  ContextSection,
  TechSection,
} from "@/components/landing/EditorialSections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BHUMI-3D — 3D ULPIN & Vertical Property Intelligence" },
      {
        name: "description",
        content:
          "Transform 2D cadastral parcels into structured 3D property identities with vertical units, spatial relationships, and underground infrastructure intelligence.",
      },
      { property: "og:title", content: "BHUMI-3D — 3D ULPIN & Vertical Property Intelligence" },
      {
        property: "og:description",
        content:
          "Transform 2D cadastral parcels into structured 3D property identities with vertical units, spatial relationships, and underground infrastructure intelligence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Header() {
  return (
    <header className="absolute left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-6 md:px-12">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center bg-primary/20 backdrop-blur-md">
          <Boxes className="size-5 text-primary" />
        </div>
        <div className="leading-tight">
          <div className="text-lg font-bold tracking-[0.2em] text-foreground">BHUMI-3D</div>
          <div className="hidden text-[10px] uppercase tracking-widest text-muted-foreground md:block">
            3D ULPIN &amp; Vertical Property Intelligence
          </div>
        </div>
      </div>

      <div className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-muted-foreground lg:flex">
        <a href="#how-it-works" className="transition-colors hover:text-foreground">
          How It Works
        </a>
        <a href="#technology" className="transition-colors hover:text-foreground">
          Technology
        </a>
        <div className="h-1 w-1 rounded-full bg-border" />
        <span className="text-primary/70">Maharashtra</span>
      </div>

      <Link
        to="/app"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-sm border border-primary/50 bg-primary/10 px-5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-md transition-all hover:bg-primary/20"
      >
        Open Workspace
      </Link>
    </header>
  );
}

function Landing() {
  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-primary/30">
      <LandingBackground />
      <Header />

      {/* Hero Section */}
      <section className="relative flex min-h-screen w-full flex-col overflow-hidden lg:flex-row">
        {/* Left: Text Content */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pt-32 pb-12 lg:px-16 lg:py-0 xl:px-24">
          <div className="mb-6 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
              Geospatial Land Intelligence
            </span>
          </div>

          <h1 className="max-w-2xl text-4xl font-light leading-[1.15] tracking-tight md:text-6xl lg:text-7xl">
            Give Every Property a <br />
            <span className="font-semibold text-primary drop-shadow-[0_0_15px_rgba(var(--color-primary),0.3)]">
              Third Dimension.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Transform 2D cadastral parcels into structured 3D property identities with vertical
            units, spatial relationships, and underground infrastructure intelligence.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              to="/app"
              className="group inline-flex h-14 items-center gap-3 rounded-sm bg-primary px-8 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90"
            >
              Enter 3D Workspace
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex h-14 items-center gap-3 rounded-sm border border-border bg-background/50 px-8 text-sm font-bold uppercase tracking-wider text-foreground backdrop-blur-sm transition-colors hover:bg-surface"
            >
              <Play className="size-4 text-muted-foreground" />
              See How It Works
            </a>
          </div>

          <div className="absolute bottom-8 left-6 lg:left-16 lg:bottom-12 xl:left-24">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
              Maharashtra • 3D Land Intelligence
            </span>
          </div>
        </div>

        {/* Right: 3D Visualization */}
        <div className="relative h-[60vh] w-full lg:h-auto lg:w-1/2 lg:flex-none">
          {/* Subtle gradient overlay to blend 3D canvas with text */}
          <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent hidden lg:block" />
          <div className="absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-background to-transparent lg:hidden" />

          <HeroScene />
        </div>
      </section>

      {/* The Third Dimension Section */}
      <section className="relative z-10 mx-auto max-w-5xl py-24 px-6 text-center">
        <h2 className="text-3xl font-light tracking-tight md:text-5xl">
          Land Is More Than a <span className="font-semibold text-primary">Surface.</span>
        </h2>
        <div className="mt-16 flex flex-col items-center gap-2">
          {["Surface", "Structure", "Vertical Units", "Underground Assets"].map((layer, i) => (
            <div
              key={layer}
              className="flex w-full max-w-md items-center justify-center rounded-sm border border-border/50 bg-surface/30 py-6 text-sm font-bold tracking-[0.2em] text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/40 hover:text-foreground md:py-8"
              style={{ width: `${100 - i * 10}%`, opacity: 1 - i * 0.15 }}
            >
              {layer}
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <div id="how-it-works" className="relative z-10">
        <ProcessSection />
      </div>

      {/* 3D Property Intelligence */}
      <section className="relative z-10 overflow-hidden bg-surface/20">
        <InteractiveProperty />
      </section>

      {/* Capabilities */}
      <section className="relative z-10">
        <CapabilitiesSection />
      </section>

      {/* Context */}
      <section className="relative z-10">
        <ContextSection />
      </section>

      {/* Tech Stack */}
      <section id="technology" className="relative z-10 bg-surface/20">
        <TechSection />
      </section>

      {/* Final CTA */}
      <section className="relative z-10 border-t border-border bg-background py-32 text-center">
        <h2 className="mb-6 text-4xl font-light tracking-tight md:text-6xl">
          See Property in <span className="font-semibold text-primary">Three Dimensions.</span>
        </h2>
        <p className="mb-12 text-lg text-muted-foreground">
          Step inside the BHUMI-3D geospatial workspace.
        </p>
        <Link
          to="/app"
          className="inline-flex h-16 items-center gap-3 rounded-sm bg-primary px-10 text-sm font-bold uppercase tracking-widest text-primary-foreground shadow-2xl transition-all hover:scale-105 hover:bg-primary/90"
        >
          Launch BHUMI-3D
          <ArrowRight className="size-5" />
        </Link>
        <div className="mt-16 text-[10px] uppercase tracking-widest text-muted-foreground/40">
          Synthetic Demonstration Data • Prototype
        </div>
      </section>
    </main>
  );
}
