import {
  Activity,
  AlertTriangle,
  Boxes,
  Building2,
  Layers3,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Cuboid,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { OVERVIEW_STATS, RECENT_ACTIVITY, UNIT_GROWTH } from "@/data/demo";
import { cn } from "@/lib/utils";

const ICONS = [Layers3, Building2, Layers3, Cuboid, AlertTriangle, ShieldCheck];

export function StatsCard({
  label,
  value,
  trend,
  up,
  Icon,
  index,
}: {
  label: string;
  value: string;
  trend: string;
  up: boolean;
  Icon: any;
  index: number;
}) {
  const colors = [
    "from-primary/10",
    "from-chart-2/10",
    "from-chart-3/10",
    "from-chart-4/10",
    "from-destructive/10",
    "from-success/10",
  ];
  const colorStr = colors[index % colors.length];

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/20 p-5 backdrop-blur-xl transition-all hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5">
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", colorStr, "to-transparent")} />
      
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80">{label}</span>
        <div className="flex size-8 items-center justify-center rounded-full bg-surface/80 shadow-inner ring-1 ring-border/50 transition-colors group-hover:bg-primary/20 group-hover:ring-primary/40">
          <Icon className="size-4 text-primary/70 transition-colors group-hover:text-primary" />
        </div>
      </div>
      
      <div className="relative z-10 tabular mt-4 text-3xl font-light tracking-tight text-foreground">{value}</div>
      
      <div className="relative z-10 mt-4 flex items-center gap-2">
        <div
          className={cn(
            "flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold",
            up ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive",
          )}
        >
          {up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
          {trend}
        </div>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">vs last quarter</span>
      </div>
    </div>
  );
}

const KIND_ICONS: Record<string, any> = {
  model: Cuboid,
  floor: Layers3,
  ulpin: Boxes,
  conflict: AlertTriangle,
  ug: Activity,
};

const KIND_STYLES: Record<string, string> = {
  model: "text-primary bg-primary/10 border-primary/20",
  floor: "text-foreground bg-surface border-border",
  ulpin: "text-accent bg-accent/10 border-accent/20",
  conflict: "text-destructive bg-destructive/10 border-destructive/20",
  ug: "text-chart-4 bg-chart-4/10 border-chart-4/20",
};

export function Overview() {
  return (
    <div className="relative h-full overflow-auto bg-background/50 p-6 md:p-8">
      {/* Subtle Dot Grid Background */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.02]" 
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} 
      />

      <div className="relative z-10 mb-8 flex flex-col gap-1">
        <h1 className="text-2xl font-light tracking-tight">Land Administration <span className="font-semibold text-primary">Overview</span></h1>
        <p className="text-[12px] font-medium tracking-wide text-muted-foreground">
          Pune Circle · Synthetic demonstration dataset · 3D-ULPIN engine v0.9
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {OVERVIEW_STATS.map((s, i) => (
          <StatsCard key={s.label} {...s} Icon={ICONS[i]!} index={i} />
        ))}
      </div>

      <div className="relative z-10 mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-xl shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Vertical Unit Registration
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
               <div className="flex items-center gap-1.5"><div className="size-2 rounded-full bg-chart-1" /> Total Units</div>
               <div className="flex items-center gap-1.5"><div className="size-2 rounded-full bg-chart-3" /> Verified</div>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={UNIT_GROWTH} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gUnits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="gVer" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-3)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--color-chart-3)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="4 4" vertical={false} opacity={0.4} />
                <XAxis
                  dataKey="month"
                  stroke="var(--color-muted-foreground)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${val / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)"
                  }}
                  itemStyle={{ color: "var(--color-foreground)", fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="units"
                  stroke="var(--color-chart-1)"
                  fill="url(#gUnits)"
                  strokeWidth={3}
                  activeDot={{ r: 6, strokeWidth: 0, fill: "var(--color-chart-1)" }}
                />
                <Area
                  type="monotone"
                  dataKey="verified"
                  stroke="var(--color-chart-3)"
                  fill="url(#gVer)"
                  strokeWidth={3}
                  activeDot={{ r: 6, strokeWidth: 0, fill: "var(--color-chart-3)" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-xl shadow-xl">
          <div className="mb-6 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            <Activity className="size-4 text-primary" />
            Recent Spatial Activity
          </div>
          <ul className="space-y-1">
            {RECENT_ACTIVITY.map((a) => {
              const AIcon = KIND_ICONS[a.kind] || Activity;
              return (
                <li
                  key={a.id}
                  className="group flex items-start gap-4 rounded-lg border border-transparent p-3 transition-colors hover:border-border/40 hover:bg-surface/50"
                >
                  <div
                    className={cn(
                      "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border",
                      KIND_STYLES[a.kind],
                    )}
                  >
                    <AIcon className="size-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-medium leading-snug text-foreground/90 transition-colors group-hover:text-primary">{a.text}</div>
                    <div className="tabular mt-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground/60">{a.time}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
