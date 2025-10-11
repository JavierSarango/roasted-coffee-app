import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface AgtronScaleProps {
  position: number; // 0-100
  roastLevel: string;
}

export const AgtronScale = ({ position, roastLevel }: AgtronScaleProps) => {
  return (
    <Card className="p-6 space-y-4">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          Escala Agtron
        </h3>
        <div className="relative">
          {/* Gradient bar */}
          <div className="h-12 rounded-lg bg-gradient-agtron shadow-soft" />
          
          {/* Marker */}
          <motion.div
            className="absolute -top-8"
            initial={{ left: "0%", opacity: 0 }}
            animate={{ left: `${position}%`, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transform: 'translateX(-50%)' }}
          >
            <div className="flex flex-col items-center">
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
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Claro</span>
            <span>Medio</span>
            <span>Oscuro</span>
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
