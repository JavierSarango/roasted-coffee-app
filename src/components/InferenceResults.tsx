import { Card } from "@/components/ui/card";
import { AgtronScale } from "./AgtronScale";
import { Badge } from "@/components/ui/badge";
import type { InferenceResult } from "@/utils/coffeeInference";
import { motion } from "framer-motion";

interface InferenceResultsProps {
  result: InferenceResult;
  originalImage?: string;
}

export const InferenceResults = ({
  result,
  originalImage,
}: InferenceResultsProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Images Section */}
      <motion.div className="space-y-4" variants={itemVariants}>
        <Card className="p-4 space-y-3">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Imagen Original
            </h3>
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={originalImage}
                alt="Original coffee beans"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Results Section */}
      <motion.div className="space-y-4" variants={itemVariants}>
        <AgtronScale
          position={result.agtronPosition}
          roastLevel={result.roastLevel}
        />

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">
              Confianza
            </h3>
            <Badge variant="secondary" className="text-base font-semibold">
              {result.confidence.toFixed(1)}%
            </Badge>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">
              Descripción
            </h4>
            <p className="text-sm text-foreground leading-relaxed">
              {result.description}
            </p>
          </div>
        </Card>

        {/* Additional info card */}
        <Card className="p-6 bg-secondary/50 border-secondary">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">
              💡 Sobre la clasificación
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              La escala Agtron mide el color del café tostado, donde valores más altos
              indican tostados más claros y valores más bajos indican tostados más oscuros.
            </p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
