import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  TriangleAlert,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BASE_CHECKS } from "@/data/demo";
import { useBhu } from "@/state/bhu";
import { cn } from "@/lib/utils";

export function ValidationPanel() {
  const {
    checks,
    setChecks,
    validatedAt,
    setValidatedAt,
    conflict,
    simulateConflict,
    resolveConflict,
    select,
    setView,
  } = useBhu();

  const running = checks.some((c) => c.state === "running");
  const allPass = checks.every((c) => c.state === "pass");
  const anyFail = checks.some((c) => c.state === "fail");

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
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/50 bg-background/60 px-4 py-3 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
      <div className="flex items-center gap-2">
        <Button size="sm" className="h-9 px-4 text-[12px] font-bold tracking-wide shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40" onClick={runValidation} disabled={running}>
          {running ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ShieldCheck className="size-4" />
          )}
          RUN SPATIAL VALIDATION
        </Button>
        {conflict ? (
          <Button
            size="sm"
            variant="outline"
            className="h-9 border-success/50 bg-success/5 px-4 text-[12px] font-bold tracking-wide text-success transition-all hover:bg-success/10 hover:text-success"
            onClick={() => {
              resolveConflict();
              setChecks(BASE_CHECKS.map((c) => ({ ...c, state: "pass" })));
              toast.success("Conflict resolved", { description: "Valid geometry restored" });
            }}
          >
            <Wrench className="size-4" />
            RESOLVE CONFLICT
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="h-9 border-destructive/40 bg-destructive/5 px-4 text-[12px] font-bold tracking-wide text-destructive transition-all hover:bg-destructive/10 hover:text-destructive"
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
            <TriangleAlert className="size-4" />
            SIMULATE CONFLICT
          </Button>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-5 gap-y-2">
        {checks.map((c) => (
          <div key={c.id} className="flex items-center gap-2 text-[11.5px]" title={c.detail}>
            {c.state === "running" ? (
              <Loader2 className="size-4 animate-spin text-primary" />
            ) : c.state === "fail" ? (
              <AlertTriangle className="size-4 text-destructive" />
            ) : (
              <CheckCircle2
                className={cn(
                  "size-4",
                  c.state === "pass" ? "text-success" : "text-muted-foreground/30",
                )}
              />
            )}
            <span
              className={cn(
                "font-medium tracking-wide",
                c.state === "fail"
                  ? "text-destructive"
                  : c.state === "pass"
                    ? "text-foreground"
                    : "text-muted-foreground/70",
              )}
            >
              {c.label}
            </span>
          </div>
        ))}
      </div>

      <div className="tabular ml-auto flex items-center gap-5 text-[11px] uppercase tracking-widest text-muted-foreground/70">
        <div className="flex items-center gap-2">
          <span>Status:</span>
          <span
            className={cn(
              "font-bold",
              anyFail ? "text-destructive" : allPass ? "text-success" : "text-muted-foreground",
            )}
          >
            {anyFail ? "CONFLICT" : allPass ? "ALL SPATIAL CHECKS PASSED" : "NOT VALIDATED"}
          </span>
        </div>
        <div className="flex items-center gap-2 border-l border-border/50 pl-5">
          <span>Last run:</span>
          <span className="font-semibold text-foreground/80">{validatedAt ?? "—"}</span>
        </div>
      </div>
    </div>
  );
}
