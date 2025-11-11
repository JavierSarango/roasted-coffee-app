import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { RoastLevel } from "@/utils/coffeeInference";

interface AgtronScaleProps {
  position: number; // 0-100
  roastLevel: RoastLevel;
}

const roastSegments: { level: RoastLevel; label: string; colorClass: string }[] = [
  { level: "Verde", label: "Verde", colorClass: "bg-[hsl(var(--coffee-green))]" },
  { level: "Claro", label: "Claro", colorClass: "bg-[hsl(var(--coffee-light))]" },
  { level: "Medio", label: "Medio", colorClass: "bg-[hsl(var(--coffee-medium))]" },
  { level: "Oscuro", label: "Oscuro", colorClass: "bg-[hsl(var(--coffee-dark))]" },
  { level: "Sobretostado", label: "Sobretostado", colorClass: "bg-[hsl(var(--coffee-burnt))]" },
];

export const AgtronScale = ({ position, roastLevel }: AgtronScaleProps) => {
  return (
    <Card className="p-6 space-y-4">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          Escala Agtron
        </h3>
        <div className="relative">
          {/* Discrete segments */}
          <div className="flex gap-1 h-12 rounded-lg overflow-hidden shadow-soft">
            {roastSegments.map((segment) => (
              <motion.div
                key={segment.level}
                className={`flex-1 ${segment.colorClass} transition-all duration-300 ${
                  roastLevel === segment.level ? "ring-2 ring-primary ring-offset-2" : ""
                }`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>
          
          {/* Marker with label */}
          <motion.div
            className="absolute -top-20"
            initial={{ left: "0%", opacity: 0 }}
            animate={{ left: `${position}%`, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transform: 'translateX(-50%)' }}
          >
            <div className="flex flex-col items-center gap-1">
              {/* Label rectangle */}
              <motion.div
                className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md shadow-lg text-sm font-semibold whitespace-nowrap"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {roastLevel}
              </motion.div>
              
              {/* Arrow */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-8 h-8 text-primary" />
              </motion.div>
              <div className="w-1 h-4 bg-primary rounded-full" />
            </div>
          </motion.div>

          {/* Scale labels */}
          <div className="flex justify-between mt-3 text-xs text-muted-foreground px-1">
            {roastSegments.map((segment) => (
              <span 
                key={segment.level}
                className={`flex-1 text-center transition-all duration-300 ${
                  roastLevel === segment.level ? "font-bold text-primary" : ""
                }`}
              >
                {segment.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Roast level display */}
      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground mb-1">Nivel de tostado</p>
        <p className="text-3xl font-bold text-primary">{roastLevel}</p>
      </div>
    </Card>
  );
};
