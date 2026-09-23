import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Radio,
  ShieldCheck,
  TriangleAlert,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
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

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/50 bg-background/60 px-4 py-3 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
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
        <Badge
          variant="outline"
          className="ml-2 gap-1.5 border-accent/40 bg-accent/5 text-accent md:inline-flex hidden"
        >
          <Radio className="size-3 animate-pulse" />
          DEMO MODE
        </Badge>
      </div>
    </div>
  );
}
