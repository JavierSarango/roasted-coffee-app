import { Card } from "@/components/ui/card";
import { AgtronScale } from "./AgtronScale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { InferenceResult } from "@/utils/coffeeInference";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Image, Sparkles, AlertTriangle, ShieldAlert } from "lucide-react";
import {cn } from "@/lib/utils";

interface InferenceResultsProps {
  result: InferenceResult;
  originalImage?: string;
}

export const InferenceResults = ({
  result,
  originalImage,
}: InferenceResultsProps) => {
  const [showSegmented, setShowSegmented] = useState(false);
  const isRejection = result.roastLevel === "Desconocido" || result.roastLevel === "NoDetectado";
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
                  alt="Imagen Original"
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
                  alt="Imagen Segmentada"
                  className={cn(
                    "w-full h-full object-cover", 
                    isRejection && "opacity-80 grayscale-[0.5]",
                  )}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                />
              )}
            </AnimatePresence>
            {isRejection && showSegmented && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                <div className="bg-background/90 p-4 rounded-lg shadow-lg border border-red-200 text-center">
                  <ShieldAlert className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-red-600">
                    {result.roastLevel === "NoDetectado" ? "Objeto Inválido" : "Incierto"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Descripción según la vista */}
          {showSegmented && result.segmentationImage && (
            <motion.p 
              className={cn(
                "text-xs",
                isRejection ? "text-red-500" : "text-foreground/70"
              )}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isRejection 
                ? "*El modelo no pudo validar la geometría o el color del objeto."
                : "*Las áreas verdes indican la detección automática del grano."
              }
            </motion.p>
          )}

        </Card>
      </motion.div>

      {/* Results Section */}
      <motion.div className="space-y-4" variants={itemVariants}>

        {!isRejection ? (
          <AgtronScale
            position={result.agtronPosition}
            roastLevel={result.roastLevel}
          />
        ) : (
          <Card className="p-6 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900">
            <div className="flex items-start gap-4">
              <ShieldAlert className="w-8 h-8 text-red-600 dark:text-red-400 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-red-700 dark:text-red-300 mb-1">
                  Informe de Análisis
                </h3>
                <p className="text-sm text-red-600/90 dark:text-red-300/90">
                  El sistema no reconoció como válido la imagen proporcionada.
                </p>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Nivel de Confianza
            </h3>
            <Badge 
              variant={isRejection ? "destructive" : "secondary"} 
              className="text-base font-semibold"
            >
              {result.confidence.toFixed(1)}%
            </Badge>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">
              Diagnóstico
            </h4>
            <p className={cn(
              "text-sm leading-relaxed p-3 rounded-md",
              isRejection ? "bg-muted font-medium text-red-600 dark:text-red-400" : "text-foreground/90"
            )}>
              {/* Mostrar mensaje de error técnico si existe, o la descripción normal */}
              {result.errorMessage || result.description}
            </p>
          </div>
        </Card>

        {/* Uses card (Solo mostrar si hay usos válidos y no es rechazo) */}
        {result.uses && result.uses.length > 0 && (
          <Card className="p-6 bg-secondary/50 border-secondary">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">
                {isRejection ? "💡 Recomendaciones:" : "💡 Ideal para:"}
              </h4>
              <ul className="space-y-2">
                {result.uses.map((use, index) => (
                  <li 
                    key={index} 
                    className="text-sm text-foreground/80 leading-relaxed flex items-start"
                  >
                    <span className={cn(
                      "mr-2",
                      isRejection ? "text-yellow-500" : "text-primary"
                    )}>•</span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
};