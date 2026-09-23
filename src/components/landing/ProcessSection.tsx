import React from "react";
import { Map, Cuboid, Layers3, Fingerprint, ShieldCheck } from "lucide-react";

const STAGES = [
  { num: "01", title: "PARCEL", desc: "2D cadastral boundary", Icon: Map },
  { num: "02", title: "ELEVATE", desc: "Generate 3D building volume", Icon: Cuboid },
  { num: "03", title: "SEGMENT", desc: "Divide vertical property units", Icon: Layers3 },
  { num: "04", title: "IDENTIFY", desc: "Generate structured 3D ULPIN", Icon: Fingerprint },
  {
    num: "05",
    title: "VALIDATE",
    desc: "Check spatial conflicts and boundaries",
    Icon: ShieldCheck,
  },
];

export function ProcessSection() {
  return (
    <div className="relative mx-auto max-w-4xl py-24 px-6">
      <h2 className="mb-20 text-center text-3xl font-semibold tracking-tight md:text-5xl">
        From Parcel to <span className="text-primary">3D ULPIN</span>
      </h2>

      <div className="relative flex flex-col gap-12 md:gap-24">
        <div className="absolute left-8 top-0 h-full w-[1px] bg-border md:left-1/2 md:-translate-x-1/2">
          <div className="absolute left-0 top-0 h-1/2 w-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />
        </div>

        {STAGES.map((stage, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={stage.num}
              className={`relative flex items-center md:w-1/2 ${isEven ? "md:justify-end md:pr-12 md:self-start" : "md:justify-start md:pl-12 md:self-end"}`}
            >
              {/* Node Point */}
              <div
                className={`absolute left-8 flex size-12 -translate-x-1/2 items-center justify-center rounded-full border border-primary/30 bg-background md:left-auto md:translate-x-0 ${isEven ? "md:-right-6" : "md:-left-6"}`}
              >
                <stage.Icon className="size-5 text-primary" />
              </div>

              {/* Content Card */}
              <div className="ml-20 flex flex-col items-start md:ml-0 md:w-full">
                <span className="mb-2 font-mono text-4xl font-light text-muted-foreground/30">
                  {stage.num}
                </span>
                <h3 className="mb-2 text-xl font-bold tracking-widest">{stage.title}</h3>
                <p className="text-sm text-muted-foreground">{stage.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
