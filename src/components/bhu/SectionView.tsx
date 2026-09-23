import { FileBarChart, Layers3, CheckCircle2, Activity } from "lucide-react";
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
import type { NavItem } from "./TopBar";
import { cn } from "@/lib/utils";

function Shell({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full overflow-auto bg-background/50 p-6 md:p-8">
      {/* Background Pattern */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.02]" 
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} 
      />
      <div className="relative z-10 mb-8 flex flex-col gap-1">
        <h1 className="text-2xl font-light tracking-tight">{title}</h1>
        <p className="text-[12px] font-medium tracking-wide text-muted-foreground">{sub}</p>
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
  if (section === "Parcels") {
    return (
      <Shell title="Parcels" sub="Cadastral registry · Pune Circle (synthetic demo records)">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parcel ID</TableHead>
              <TableHead>ULPIN</TableHead>
              <TableHead>District</TableHead>
              <TableHead className="text-right">Area (m²)</TableHead>
              <TableHead>3D Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ALL_PARCELS.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="tabular">{p.id}</TableCell>
                <TableCell className="tabular text-muted-foreground">{p.ulpin}</TableCell>
                <TableCell>{p.district}</TableCell>
                <TableCell className="tabular text-right">{p.area.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px]",
                      p.primary ? statusClass("Verified") : "text-muted-foreground",
                    )}
                  >
                    {p.primary ? "3D Modelled" : "2D Only"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Unit</TableHead>
              <TableHead>3D ULPIN</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Area</TableHead>
              <TableHead className="text-right">Z Range</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ALL_UNITS.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="tabular">{u.id}</TableCell>
                <TableCell className="tabular text-primary">{u.ulpin3d}</TableCell>
                <TableCell>{u.type}</TableCell>
                <TableCell className="tabular text-right">
                  {u.area.toLocaleString()} sq.ft
                </TableCell>
                <TableCell className="tabular text-right">
                  {u.zMin}m – {u.zMax}m
                </TableCell>
                <TableCell>{u.owner}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("text-[10px]", statusClass(u.status))}>
                    {u.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
