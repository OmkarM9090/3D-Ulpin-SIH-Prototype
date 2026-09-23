import { Layers } from "lucide-react";
import type { LayerKey } from "@/state/bhu";
import { useBhu } from "@/state/bhu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const LAYERS: { key: LayerKey; label: string }[] = [
  { key: "parcels", label: "Parcels" },
  { key: "buildings", label: "Buildings" },
  { key: "floors", label: "Floors" },
  { key: "units", label: "Property Units" },
  { key: "roads", label: "Roads" },
  { key: "utilities", label: "Underground Utilities" },
  { key: "tunnels", label: "Tunnels" },
  { key: "labels", label: "Labels" },
  { key: "dem", label: "DEM / Terrain" },
];

export function LayerControl() {
  const { layers, toggleLayer } = useBhu();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="glass-panel h-9 gap-2 text-[12px]">
          <Layers className="size-3.5" />
          Layers
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[196px] bg-surface/95 backdrop-blur-md border-border/50">
        {LAYERS.map((l) => (
          <DropdownMenuCheckboxItem
            key={l.key}
            checked={layers[l.key]}
            onCheckedChange={() => toggleLayer(l.key)}
            className="text-[12px] text-foreground/90 cursor-pointer focus:bg-primary/20"
          >
            {l.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
