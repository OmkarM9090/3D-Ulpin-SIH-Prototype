import React from "react";

export function LandingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Deep gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      {/* Topographic abstract lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="topo-pattern" width="400" height="400" patternUnits="userSpaceOnUse">
            <path
              d="M 0 200 Q 100 150 200 200 T 400 200 M 0 250 Q 100 200 200 250 T 400 250 M 0 300 Q 100 250 200 300 T 400 300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo-pattern)" />
      </svg>

      {/* Abstract dot grid for technical feel */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(var(--color-border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
