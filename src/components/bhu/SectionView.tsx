import { FileBarChart, Layers3, CheckCircle2, Activity, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ALL_PARCELS,
  ALL_UNITS,
  BUILDING,
  FLOORS,
  PRIMARY_PARCEL,
  UNDERGROUND_ASSETS,
} from "@/data/demo";
import { useBhu } from "@/state/bhu";
import type { NavItem } from "./TopBar";
import { cn } from "@/lib/utils";

function Shell({
  title,
  sub,
  children,
  action,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="relative h-full overflow-auto bg-background/50 p-6 md:p-8">
      {/* Background Pattern */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.02]" 
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} 
      />
      <div className="relative z-10 mb-8 flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground/90">{title}</h1>
          <p className="text-[12px] font-medium tracking-wide text-muted-foreground">{sub}</p>
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="relative z-10 rounded-xl border border-border/50 bg-card/30 backdrop-blur-xl shadow-xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function statusClass(s: string) {
  return s === "Verified"
    ? "border-success/50 text-success"
    : s === "Pending"
      ? "border-warning/50 text-warning"
      : "border-primary/50 text-primary";
}

export function SectionView({ section }: { section: NavItem }) {
  const { approvedUnits, approveUnit } = useBhu();

  if (section === "Parcels") {
    return (
      <Shell 
        title="Parcels" 
        sub="Cadastral registry · Pune Circle (synthetic demo records)"
        action={
          <Button variant="outline" size="sm" className="h-9 gap-2 border-primary/30 bg-primary/5 text-xs text-primary transition-colors hover:bg-primary/10 hover:text-primary">
            <Download className="size-3.5" />
            Export CSV
          </Button>
        }
      >
        <div className="w-full">
          <Table>
            <TableHeader className="border-b border-border/50 bg-background/30">
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-11 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Parcel ID</TableHead>
                <TableHead className="h-11 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">ULPIN</TableHead>
                <TableHead className="h-11 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">District</TableHead>
                <TableHead className="h-11 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Dimensions (W×D)</TableHead>
                <TableHead className="h-11 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Z Axis (Underground)</TableHead>
                <TableHead className="h-11 text-right text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Area (m²)</TableHead>
                <TableHead className="h-11 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">3D Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ALL_PARCELS.map((p) => {
                const xs = p.geometry.map((pt) => pt[0]);
                const zs = p.geometry.map((pt) => pt[1]);
                const w = Math.round(Math.max(...xs) - Math.min(...xs));
                const d = Math.round(Math.max(...zs) - Math.min(...zs));

                return (
                  <TableRow key={p.id} className="border-b-border/40 transition-colors hover:bg-surface/40">
                    <TableCell className="font-medium tracking-wide">{p.id}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground/80">{p.ulpin}</TableCell>
                    <TableCell className="text-[13px]">{p.district}</TableCell>
                    <TableCell className="tabular text-[13px] text-muted-foreground">{w}m × {d}m</TableCell>
                    <TableCell className="tabular text-[12px]">
                      {p.primary ? (
                        <span className="text-chart-4/80">Down to -12m</span>
                      ) : (
                        <span className="text-muted-foreground/50">Surface Only</span>
                      )}
                    </TableCell>
                    <TableCell className="tabular text-right font-medium">{p.area.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                          p.primary ? "border-success/30 bg-success/10 text-success" : "border-border/50 bg-background/50 text-muted-foreground/70",
                        )}
                      >
                        {p.primary ? "3D Modelled" : "2D Only"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Shell>
    );
  }

  if (section === "Buildings") {
    return (
      <Shell title="Buildings" sub="Extracted building footprints and vertical envelopes">
        <div className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-sm border border-primary/40 bg-primary/8 p-4">
            <div className="tabular text-sm font-semibold text-primary">{BUILDING.id}</div>
            <div className="text-[12px]">{BUILDING.name}</div>
            <dl className="tabular mt-3 space-y-1 text-[11.5px] text-muted-foreground">
              <div className="flex justify-between">
                <dt>Parent parcel</dt>
                <dd className="text-foreground">{BUILDING.parcelId}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Floors</dt>
                <dd className="text-foreground">{BUILDING.floors} + basement + rooftop</dd>
              </div>
              <div className="flex justify-between">
                <dt>Height</dt>
                <dd className="text-foreground">{BUILDING.height} m</dd>
              </div>
              <div className="flex justify-between">
                <dt>Footprint</dt>
                <dd className="text-foreground">
                  {BUILDING.footprint.width} × {BUILDING.footprint.depth} m
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Units</dt>
                <dd className="text-foreground">{ALL_UNITS.length}</dd>
              </div>
            </dl>
          </div>
          {["B-240", "B-241", "B-242"].map((id, i) => (
            <div
              key={id}
              className="rounded-sm border border-border bg-background/40 p-4 text-[12px]"
            >
              <div className="tabular text-sm font-semibold">{id}</div>
              <div className="text-muted-foreground">Queued for 3D extraction</div>
              <dl className="tabular mt-3 space-y-1 text-[11.5px] text-muted-foreground">
                <div className="flex justify-between">
                  <dt>Parcel</dt>
                  <dd className="text-foreground">MH-PUN-P12344{i + 1}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Est. floors</dt>
                  <dd className="text-foreground">{4 + i}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Status</dt>
                  <dd className="text-warning">Pending LiDAR pass</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </Shell>
    );
  }

  if (section === "Vertical Units") {
    return (
      <Shell
        title="Vertical Units"
        sub={`${ALL_UNITS.length} volumetric property units under ${PRIMARY_PARCEL.id}`}
        action={
          <Button variant="outline" size="sm" className="h-9 gap-2 border-primary/30 bg-primary/5 text-xs text-primary transition-colors hover:bg-primary/10 hover:text-primary">
            <Download className="size-3.5" />
            Export Excel
          </Button>
        }
      >
        <div className="w-full">
          <Table>
            <TableHeader className="border-b border-border/50 bg-background/30">
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-11 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Unit</TableHead>
                <TableHead className="h-11 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">3D ULPIN</TableHead>
                <TableHead className="h-11 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Type</TableHead>
                <TableHead className="h-11 text-right text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Area (sq.ft)</TableHead>
                <TableHead className="h-11 text-right text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Z Range</TableHead>
                <TableHead className="h-11 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Owner</TableHead>
                <TableHead className="h-11 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ALL_UNITS.map((u) => {
                const isApproved = approvedUnits.includes(u.id);
                const displayStatus = isApproved ? "Verified" : u.status;
                return (
                  <TableRow key={u.id} className="border-b-border/40 transition-colors hover:bg-surface/40">
                    <TableCell className="font-medium tracking-wide">{u.id}</TableCell>
                    <TableCell className="font-mono text-xs text-primary/80">{u.ulpin3d}</TableCell>
                    <TableCell className="text-[13px]">{u.type}</TableCell>
                    <TableCell className="tabular text-right text-[13px] font-medium text-muted-foreground">
                      {u.area.toLocaleString()}
                    </TableCell>
                    <TableCell className="tabular text-right text-[12px] text-muted-foreground">
                      {u.zMin}m – {u.zMax}m
                    </TableCell>
                    <TableCell className="text-[13px]">{u.owner}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={cn("rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", statusClass(displayStatus))}
                        >
                          {displayStatus}
                        </Badge>
                        {displayStatus === "Pending" && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-6 text-[10px] px-2 py-0 border-primary/50 text-primary hover:bg-primary/10" 
                            onClick={() => approveUnit(u.id)}
                          >
                            Approve
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Shell>
    );
  }

  if (section === "Validation") {
    return (
      <Shell title="Validation Engine" sub="Topology and volumetric identity checks across the demo dataset">
        <div className="grid gap-6 p-6 md:grid-cols-2">
          {FLOORS.map((f) => (
            <div
              key={f.id}
              className="group relative overflow-hidden rounded-xl border border-border/40 bg-background/30 p-5 transition-all hover:border-primary/40 hover:bg-surface/50 hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10 flex items-center justify-between border-b border-border/50 pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/30">
                    <Layers3 className="size-3.5" />
                  </div>
                  <span className="text-[13px] font-bold uppercase tracking-wider text-foreground/90">{f.label}</span>
                </div>
                <span className="tabular rounded bg-surface px-2 py-1 text-[10px] font-semibold tracking-widest text-muted-foreground ring-1 ring-border">
                  Z {f.zMin}m – {f.zMax}m
                </span>
              </div>
              <div className="relative z-10 tabular mt-4 space-y-2 text-[11.5px]">
                {f.units.map((u) => (
                  <div key={u.id} className="flex items-center justify-between rounded-md bg-background/40 px-3 py-2 transition-colors hover:bg-background/80">
                    <span className="font-medium text-muted-foreground">{u.id}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-success/90">OK · {u.confidence.toFixed(1)}%</span>
                      <CheckCircle2 className="size-3.5 text-success" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {UNDERGROUND_ASSETS.map((a) => (
            <div
              key={a.id}
              className="group relative overflow-hidden rounded-xl border border-chart-4/30 bg-chart-4/5 p-5 transition-all hover:border-chart-4/60 hover:bg-chart-4/10 hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-chart-4/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10 flex items-center justify-between border-b border-chart-4/20 pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-7 items-center justify-center rounded-full bg-chart-4/20 text-chart-4 ring-1 ring-chart-4/40">
                    <Activity className="size-3.5" />
                  </div>
                  <span className="text-[13px] font-bold uppercase tracking-wider text-foreground/90">{a.type}</span>
                </div>
                <span className="tabular rounded bg-chart-4/10 px-2 py-1 text-[10px] font-semibold tracking-widest text-chart-4 ring-1 ring-chart-4/30">
                  Z {a.zMin}m to {a.zMax}m
                </span>
              </div>
              <div className="relative z-10 tabular mt-4 flex items-center justify-between rounded-md bg-background/40 px-3 py-2 text-[11.5px] transition-colors hover:bg-background/80">
                <span className="font-medium text-muted-foreground">{a.ulpin3d}</span>
                <span className="font-semibold text-chart-4 uppercase tracking-widest flex items-center gap-2">
                   {a.status} <CheckCircle2 className="size-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </Shell>
    );
  }

  return (
    <Shell title="Reports" sub="Exportable statutory and analytical outputs (demo placeholders)">
      <div className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          "3D ULPIN Issuance Register",
          "Vertical Ownership Abstract",
          "Underground Asset Encumbrance",
          "Topology Conflict Log",
          "Floor-wise Area Statement",
          "Extraction Confidence Audit",
        ].map((r) => (
          <div
            key={r}
            className="flex items-start gap-3 rounded-sm border border-border bg-background/40 p-4"
          >
            <FileBarChart className="mt-0.5 size-4 text-primary" />
            <div>
              <div className="text-[12.5px] font-medium">{r}</div>
              <div className="text-[11px] text-muted-foreground">
                PDF / GeoJSON · generated on request
              </div>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
