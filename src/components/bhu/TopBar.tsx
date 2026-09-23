import { Bell, Boxes, Search, Loader2, ShieldCheck, TriangleAlert, Wrench } from "lucide-react";
import { toast } from "sonner";
import { SearchPanel } from "./SearchPanel";
import { Button } from "@/components/ui/button";
import { BASE_CHECKS } from "@/data/demo";
import { useBhu } from "@/state/bhu";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  "Overview",
  "3D Property Map",
  "Validation",
  "Parcels",
  "Buildings",
  "Vertical Units",
  "Reports",
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];

export function TopBar({
  active,
  onNavigate,
}: {
  active: NavItem;
  onNavigate: (n: NavItem) => void;
}) {
  const {
    checks,
    setChecks,
    setValidatedAt,
    conflict,
    simulateConflict,
    resolveConflict,
    select,
    setView,
  } = useBhu();

  const running = checks.some((c) => c.state === "running");

  function runValidation() {
    const failing = !!conflict;
    setChecks(BASE_CHECKS.map((c) => ({ ...c, state: "running" })));
    BASE_CHECKS.forEach((c, i) => {
      window.setTimeout(
        () => {
          setChecksAt(i, failing && c.id === "overlap" ? "fail" : "pass");
        },
        320 * (i + 1),
      );
    });
    window.setTimeout(
      () => {
        setValidatedAt(new Date().toLocaleTimeString("en-IN", { hour12: false }));
        if (failing)
          toast.error("Spatial validation failed", { description: "1 topology conflict detected" });
        else toast.success("All spatial checks passed", { description: "14 volumes validated" });
      },
      320 * BASE_CHECKS.length + 150,
    );
  }

  function setChecksAt(index: number, state: "pass" | "fail") {
    setChecks(
      BASE_CHECKS.map((c, i) => ({
        ...c,
        state:
          i < index
            ? conflict && c.id === "overlap"
              ? "fail"
              : "pass"
            : i === index
              ? state
              : "running",
      })),
    );
  }

  return (
    <header className="z-40 flex h-14 shrink-0 items-center gap-4 border-b border-border bg-surface/80 px-4 backdrop-blur">
      <div className="flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-sm bg-primary/15 ring-1 ring-primary/40">
          <Boxes className="size-4 text-primary" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-bold tracking-[0.14em] text-foreground">BHUMI 3D</div>
          <div className="hidden text-[10px] uppercase tracking-wider text-muted-foreground sm:block">
            3D ULPIN &amp; Vertical Property Mapping
          </div>
        </div>
      </div>

      <nav className="ml-4 hidden items-center gap-0.5 overflow-x-auto scrollbar-hide md:flex flex-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            onClick={() => onNavigate(item)}
            className={cn(
              "relative whitespace-nowrap px-3 py-2 text-[12.5px] font-medium transition-colors",
              active === item ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item}
            {active === item && <span className="absolute inset-x-2 -bottom-px h-px bg-primary" />}
          </button>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2 shrink-0">
        <div className="hidden md:flex items-center gap-2 mr-2">
          <Button size="sm" className="h-8 px-3 text-[11px] font-bold tracking-wide shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40" onClick={runValidation} disabled={running}>
            {running ? (
              <Loader2 className="size-3.5 animate-spin mr-1.5" />
            ) : (
              <ShieldCheck className="size-3.5 mr-1.5" />
            )}
            RUN VALIDATION
          </Button>
          {conflict ? (
            <Button
              size="sm"
              variant="outline"
              className="h-8 border-success/50 bg-success/5 px-3 text-[11px] font-bold tracking-wide text-success transition-all hover:bg-success/10 hover:text-success"
              onClick={() => {
                resolveConflict();
                setChecks(BASE_CHECKS.map((c) => ({ ...c, state: "pass" })));
                toast.success("Conflict resolved", { description: "Valid geometry restored" });
              }}
            >
              <Wrench className="size-3.5 mr-1.5" />
              RESOLVE
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="h-8 border-destructive/40 bg-destructive/5 px-3 text-[11px] font-bold tracking-wide text-destructive transition-all hover:bg-destructive/10 hover:text-destructive"
              onClick={() => {
                setView("3d");
                simulateConflict();
                select({ kind: "unit", id: "F04-U05" });
                setChecks(
                  BASE_CHECKS.map((c) => ({ ...c, state: c.id === "overlap" ? "fail" : "pass" })),
                );
                toast.error("SPATIAL CONFLICT DETECTED", {
                  description: "Vertical volume overlap · F04-U05 / F04-U06",
                });
              }}
            >
              <TriangleAlert className="size-3.5 mr-1.5" />
              SIMULATE CONFLICT
            </Button>
          )}
        </div>
        <SearchPanel />
        <button className="relative rounded-sm p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Bell className="size-4" />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive" />
        </button>
        <button className="rounded-sm p-2 text-muted-foreground xl:hidden" aria-label="Search">
          <Search className="size-4" />
        </button>
      </div>
    </header>
  );
}
