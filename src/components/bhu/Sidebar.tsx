import React, { useState } from "react";
import { BarChart3, Building2, LayoutGrid, Layers3, Map, ShieldCheck, Menu, X } from "lucide-react";
import type { NavItem } from "./TopBar";
import { NAV_ITEMS } from "./TopBar";
import { cn } from "@/lib/utils";

const ICONS: Record<NavItem, typeof Map> = {
  Overview: LayoutGrid,
  "3D Property Map": Map,
  Parcels: Layers3,
  Buildings: Building2,
  "Vertical Units": Layers3,
  Validation: ShieldCheck,
  Reports: BarChart3,
};

export function Sidebar({
  active,
  onNavigate,
}: {
  active: NavItem;
  onNavigate: (n: NavItem) => void;
}) {
  const [open, setOpen] = useState(false);

  const list = (
    <nav className="flex flex-col gap-1.5 p-2">
      {NAV_ITEMS.map((item, index) => {
        const Icon = ICONS[item];
        const isActive = active === item;
        return (
          <React.Fragment key={item}>
            {index === 2 && (
              <div className="mt-4 mb-1 px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                Property Engine
              </div>
            )}
            <button
              onClick={() => {
                onNavigate(item);
                setOpen(false);
              }}
              className={cn(
                "group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-medium transition-all duration-300",
                isActive
                  ? "bg-primary/10 text-primary shadow-[inset_0_0_15px_rgba(var(--color-primary),0.05)]"
                  : "text-muted-foreground hover:translate-x-1 hover:bg-sidebar-accent hover:text-foreground",
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 h-1/2 w-1 -translate-y-1/2 rounded-r-full bg-primary shadow-[0_0_10px_rgba(var(--color-primary),0.5)]" />
              )}
              <Icon className={cn("size-4 shrink-0 transition-transform", isActive ? "scale-110" : "group-hover:scale-110")} />
              <span className="truncate lg:inline">{item}</span>
            </button>
          </React.Fragment>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-[240px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar/90 backdrop-blur-xl shadow-xl lg:flex">
        <div className="flex h-14 items-center border-b border-sidebar-border/50 px-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            Workspace
          </span>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {list}
        </div>
        <div className="mt-auto space-y-3 border-t border-sidebar-border/50 bg-background/30 p-4 text-[11px] text-muted-foreground backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span>Survey Circle</span>
            <span className="tabular text-foreground">LKO-06</span>
          </div>
          <div className="flex items-center justify-between">
            <span>CRS</span>
            <span className="tabular text-foreground">EPSG:32644</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Engine</span>
            <span className="tabular text-primary">3D-ULPIN v0.9</span>
          </div>
        </div>
      </aside>

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-40 rounded-full border border-border bg-surface p-3 shadow-lg lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-background/70" onClick={() => setOpen(false)} />
          <div className="glass-panel relative w-[240px] bg-sidebar">
            <div className="flex items-center justify-between px-3 pt-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Workspace
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close navigation">
                <X className="size-4 text-muted-foreground" />
              </button>
            </div>
            {list}
          </div>
        </div>
      )}
    </>
  );
}
