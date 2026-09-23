import React, { useState } from "react";
import { clsx } from "clsx";
import { Layers3, Hash, ArrowUpDown } from "lucide-react";

const FLOORS = [
  {
    id: "roof",
    label: "Roof Level",
    elevation: "Z: +36.2m",
    color: "bg-muted",
    hover: "hover:bg-muted/80",
  },
  {
    id: "f4",
    label: "Floor 04 (Unit D)",
    elevation: "Z: +24.6m",
    color: "bg-primary/20",
    hover: "hover:bg-primary/40 border-primary/50",
  },
  {
    id: "f3",
    label: "Floor 03 (Unit C)",
    elevation: "Z: +18.4m",
    color: "bg-primary/20",
    hover: "hover:bg-primary/40 border-primary/50",
  },
  {
    id: "f2",
    label: "Floor 02 (Unit B)",
    elevation: "Z: +12.2m",
    color: "bg-primary/20",
    hover: "hover:bg-primary/40 border-primary/50",
  },
  {
    id: "f1",
    label: "Floor 01 (Unit A)",
    elevation: "Z: +06.0m",
    color: "bg-primary/20",
    hover: "hover:bg-primary/40 border-primary/50",
  },
  {
    id: "g",
    label: "Ground Level",
    elevation: "Z: +00.0m",
    color: "bg-card",
    hover: "hover:bg-card/80 border-border",
  },
  {
    id: "u1",
    label: "Underground P1",
    elevation: "Z: -04.5m",
    color: "bg-warning/20",
    hover: "hover:bg-warning/40 border-warning/50",
  },
];

export function InteractiveProperty() {
  const [activeFloor, setActiveFloor] = useState<string | null>(null);

  return (
    <div className="relative flex min-h-[600px] w-full items-center justify-center py-20">
      {/* 3D Isometric Container */}
      <div
        className="group relative flex flex-col items-center justify-center transition-transform duration-700 ease-out"
        style={{ transform: "rotateX(60deg) rotateZ(-45deg)", transformStyle: "preserve-3d" }}
      >
        {/* Floors */}
        <div className="flex flex-col gap-8 transition-all duration-500 group-hover:gap-12">
          {FLOORS.map((floor) => {
            const isActive = activeFloor === floor.id;
            return (
              <div
                key={floor.id}
                onMouseEnter={() => setActiveFloor(floor.id)}
                onMouseLeave={() => setActiveFloor(null)}
                className={clsx(
                  "relative h-32 w-32 cursor-pointer border border-transparent backdrop-blur-md transition-all duration-300 md:h-48 md:w-48",
                  floor.color,
                  floor.hover,
                  isActive
                    ? "shadow-[0_0_30px_rgba(var(--color-primary),0.3)] scale-105"
                    : "shadow-xl",
                )}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* 3D Depth Sides */}
                <div className="absolute top-full left-0 h-4 w-full origin-top -skew-x-45 bg-black/40 brightness-75 transition-all" />
                <div className="absolute top-0 left-full h-full w-4 origin-left -skew-y-45 bg-black/60 brightness-50 transition-all" />

                {/* Floating Info Panel (Counter-rotated to face user) */}
                <div
                  className={clsx(
                    "pointer-events-none absolute left-full top-1/2 ml-8 -translate-y-1/2 whitespace-nowrap rounded-sm border bg-background/90 p-3 shadow-2xl backdrop-blur-xl transition-all duration-300",
                    isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
                  )}
                  style={{ transform: "rotateZ(45deg) rotateX(-60deg) translateY(-50%)" }}
                >
                  <div className="mb-2 border-b border-border pb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <span className="text-primary">Demo Data</span>
                  </div>
                  <div className="text-sm font-semibold">{floor.label}</div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <ArrowUpDown className="size-3" />
                    <span className="font-mono">{floor.elevation}</span>
                  </div>
                  {floor.id.startsWith("f") && (
                    <div className="mt-2 flex items-center gap-2 text-[10px] text-accent">
                      <Hash className="size-3" />
                      3D ULPIN: MH-DEMO-{floor.id.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Central axis line */}
        <div className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      </div>
    </div>
  );
}
