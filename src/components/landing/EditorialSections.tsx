import React from "react";
import { Layers, ShieldAlert, Fingerprint, Route } from "lucide-react";

export function CapabilitiesSection() {
  const capabilities = [
    {
      title: "VERTICAL PROPERTY",
      desc: "Represent multi-storey property units with explicit elevation boundaries.",
      icon: Layers,
    },
    {
      title: "UNDERGROUND INFRASTRUCTURE",
      desc: "Visualize buried utilities and underground corridors against parcel bounds.",
      icon: Route,
    },
    {
      title: "SPATIAL VALIDATION",
      desc: "Identify overlaps, cantilever encroachments and spatial conflicts.",
      icon: ShieldAlert,
    },
    {
      title: "DIGITAL PROPERTY IDENTITY",
      desc: "Connect parcel + structure + vertical unit + spatial identity via 3D ULPIN.",
      icon: Fingerprint,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl py-24 px-6">
      <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-16">
        {capabilities.map((cap, i) => (
          <div
            key={i}
            className="group relative flex flex-col items-start border-l border-border pl-6 transition-colors hover:border-primary"
          >
            <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-border transition-colors group-hover:bg-primary" />
            <cap.icon className="mb-6 size-8 text-primary/70 transition-colors group-hover:text-primary" />
            <h3 className="mb-3 text-sm font-bold tracking-[0.15em] text-foreground">
              {cap.title}
            </h3>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{cap.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContextSection() {
  return (
    <div className="relative mx-auto my-32 max-w-6xl overflow-hidden rounded-sm border border-border bg-surface/50 p-12 md:p-24 text-center">
      {/* Abstract Map Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg viewBox="0 0 800 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <path
            d="M150 100 L300 50 L500 150 L700 80 L750 300 L600 500 L300 550 L100 400 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <span className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
          Maharashtra
        </span>
        <h2 className="mb-6 text-3xl font-light tracking-tight md:text-5xl">
          Built for a <span className="font-semibold text-primary">Vertical</span> Maharashtra
        </h2>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Exploring how cadastral intelligence can evolve from surface parcels to structured
          three-dimensional property identities.
        </p>

        <div className="mt-16 grid grid-cols-2 gap-8 text-left md:grid-cols-4 md:text-center">
          {[
            { label: "URBAN PARCELS", val: "Prototype" },
            { label: "VERTICAL UNITS", val: "Demo Data" },
            { label: "UNDERGROUND ASSETS", val: "Demo Data" },
            { label: "3D ULPIN", val: "Proposed" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="text-sm font-semibold text-foreground">{stat.val}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TechSection() {
  return (
    <div className="mx-auto max-w-4xl py-24 text-center">
      <div className="mb-12 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        Core Technology Stack
      </div>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {[
          "3D GIS",
          "Three.js",
          "React Three Fiber",
          "Spatial Validation",
          "Digital Twin",
          "3D ULPIN",
        ].map((tech) => (
          <div
            key={tech}
            className="rounded-sm border border-border/50 bg-surface/30 px-6 py-3 text-xs tracking-wider text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-foreground"
          >
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}
