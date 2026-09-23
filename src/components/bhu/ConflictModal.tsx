import { TriangleAlert, Wrench } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BASE_CHECKS } from "@/data/demo";
import { useBhu } from "@/state/bhu";

export function ConflictModal() {
  const { conflict, resolveConflict, setChecks } = useBhu();
  if (!conflict) return null;

  return (
    <div className="pointer-events-auto absolute bottom-4 left-1/2 z-30 w-[min(700px,calc(100%-2rem))] -translate-x-1/2">
      <div className="glass-panel animate-conflict overflow-hidden rounded-xl border border-destructive/50 shadow-2xl">
        <div className="flex items-center justify-between border-b border-destructive/20 bg-destructive/10 px-5 py-3 text-destructive">
          <div className="flex items-center gap-2">
            <TriangleAlert className="size-5" />
            <span className="text-[13px] font-bold tracking-widest uppercase">Surveyor Split-Screen Review Mode</span>
          </div>
          <Badge variant="destructive" className="bg-destructive/20 text-destructive border-destructive/50 text-[10px] tracking-wider uppercase">
            {conflict.type}
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/50 bg-background/90">
          <div className="p-5">
            <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
              <span className="size-2 rounded-full bg-warning animate-pulse" />
              Target Unit: {conflict.units[0]}
            </div>
            <div className="space-y-3 text-[12px]">
               <div className="flex justify-between border-b border-border/30 pb-1.5">
                 <span className="text-muted-foreground">Declared Z-Range</span>
                 <span className="font-mono text-foreground">12.5m - 15.8m</span>
               </div>
               <div className="flex justify-between border-b border-border/30 pb-1.5">
                 <span className="text-muted-foreground">Calculated Volume</span>
                 <span className="font-mono text-foreground">245.2 m³</span>
               </div>
               <div className="flex justify-between border-b border-border/30 pb-1.5">
                 <span className="text-muted-foreground">Geometry Status</span>
                 <span className="font-mono text-warning">Overlap</span>
               </div>
            </div>
          </div>
          
          <div className="p-5">
            <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
              <span className="size-2 rounded-full bg-destructive animate-pulse" />
              Conflicting Unit: {conflict.units[1]}
            </div>
            <div className="space-y-3 text-[12px]">
               <div className="flex justify-between border-b border-border/30 pb-1.5">
                 <span className="text-muted-foreground">Existing Z-Range</span>
                 <span className="font-mono text-destructive font-bold">15.0m - 18.2m</span>
               </div>
               <div className="flex justify-between border-b border-border/30 pb-1.5">
                 <span className="text-muted-foreground">Overlap Detected</span>
                 <span className="font-mono text-destructive font-bold">{conflict.overlap} m² (0.8m Z-overlap)</span>
               </div>
               <div className="flex justify-between border-b border-border/30 pb-1.5">
                 <span className="text-muted-foreground">Severity</span>
                 <span className="font-mono text-destructive">{conflict.severity}</span>
               </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-border/50 bg-surface/80 px-5 py-4">
          <div className="text-[11.5px] text-muted-foreground">
            <span className="font-bold text-foreground">Action required:</span> {conflict.action}
          </div>
          <Button
            size="sm"
            className="h-9 px-6 text-[12px] shadow-lg shadow-primary/20 hover:shadow-primary/40 font-bold tracking-wide"
            onClick={() => {
              resolveConflict();
              setChecks(BASE_CHECKS.map((c) => ({ ...c, state: "pass" })));
              toast.success("Conflict resolved", { description: "Geometry snapped to valid bounds" });
            }}
          >
            <Wrench className="size-4 mr-2" />
            CORRECT & RESOLVE
          </Button>
        </div>
      </div>
    </div>
  );
}
