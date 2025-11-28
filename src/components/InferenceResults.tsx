import { Card } from "@/components/ui/card";
import { AgtronScale } from "./AgtronScale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { InferenceResult } from "@/utils/coffeeInference";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Image, Sparkles } from "lucide-react";

interface InferenceResultsProps {
  result: InferenceResult;
  originalImage?: string;
}

export const InferenceResults = ({
  result,
  originalImage,
}: InferenceResultsProps) => {
  const [showSegmented, setShowSegmented] = useState(false);

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

  const imageVariants = {
    enter: {
      opacity: 0,
      scale: 0.95
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
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
        <Card className="p-4 space-y-4">
          
          {/* Header con botones de toggle */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              {showSegmented ? 'Análisis de Segmentación' : 'Imagen Original'}
            </h3>
            {result.segmentationImage && (
              <div className="flex gap-2">
                <Button
                  variant={!showSegmented ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowSegmented(false)}
                  className="gap-2"
                >
                  <Image className="w-4 h-4" />
                  Original
                </Button>
                <Button
                  variant={showSegmented ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowSegmented(true)}
                  className="gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Segmentada
                </Button>
              </div>
            )}
          </div>

          {/* Contenedor de imagen con animación */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted shadow-sm">
            <AnimatePresence mode="wait">
              {!showSegmented ? (
                <motion.img
                  key="original"
                  src={originalImage}
                  alt="Original coffee beans"
                  className="w-full h-full object-cover"
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                />
              ) : (
                <motion.img
                  key="segmented"
                  src={result.segmentationImage}
                  alt="Segmented coffee analysis"
                  className="w-full h-full object-cover"
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Descripción según la vista */}
          {showSegmented && result.segmentationImage && (
            <motion.p 
              className="text-xs text-foreground/70"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              *Las áreas verdes indican la detección automática del grano.
            </motion.p>
          )}

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
            <h3 className="text-sm font-semibold text-foreground">
              Confianza
            </h3>
            <Badge variant="secondary" className="text-base font-semibold">
              {result.confidence.toFixed(1)}%
            </Badge>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">
              Descripción
            </h4>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {result.description}
            </p>
          </div>
        </Card>

        {/* Uses card */}
        <Card className="p-6 bg-secondary/50 border-secondary">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              💡 Ideal para:
            </h4>
            <ul className="space-y-2">
              {result.uses.map((use, index) => (
                <li 
                  key={index} 
                  className="text-sm text-foreground/80 leading-relaxed flex items-start"
                >
                  <span className="mr-2 text-primary">•</span>
                  <span>{use}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};