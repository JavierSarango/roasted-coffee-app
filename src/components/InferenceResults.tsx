import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Sparkles, ShieldAlert, CheckCircle2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Asegúrate de tener esta utilidad (clsx + tailwind-merge)
import { AgtronScale } from "./AgtronScale";
import type { InferenceResult } from "@/utils/coffeeInference";

interface InferenceResultsProps {
  result: InferenceResult;
  originalImage?: string;
}

export const InferenceResults = ({
  result,
  originalImage,
}: InferenceResultsProps) => {
  const [showSegmented, setShowSegmented] = useState(false);

  // Detectamos si es un caso de rechazo
  const isRejection = result.roastLevel === "Desconocido" || result.roastLevel === "NoDetectado";

  // Variantes de animación para framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const imageVariants = {
    enter: { opacity: 0, scale: 0.98 },
    center: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ==========================================
          COLUMNA IZQUIERDA: VISUALIZACIÓN
      ========================================== */}
      <motion.div className="space-y-4" variants={itemVariants}>
        <Card className={cn(
          "p-4 space-y-4 overflow-hidden transition-colors duration-300",
          isRejection ? "border-red-200 bg-red-50/10" : "border-border"
        )}>
          
          {/* Cabecera de la Tarjeta de Imagen */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              {isRejection ? (
                <span className="flex items-center gap-2 text-red-600">
                  <ShieldAlert className="w-4 h-4" />
                  Inspección Visual
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Image className="w-4 h-4 text-muted-foreground" />
                  Inspección Visual
                </span>
              )}
            </h3>
            
            {/* Botones de Toggle (Solo si hay imagen segmentada) */}
            {result.segmentationImage && (
              <div className="flex bg-muted/50 p-1 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSegmented(false)}
                  className={cn(
                    "h-7 text-xs gap-1.5 rounded-md transition-all",
                    !showSegmented && "bg-background shadow-sm text-foreground"
                  )}
                >
                  Original
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSegmented(true)}
                  className={cn(
                    "h-7 text-xs gap-1.5 rounded-md transition-all",
                    showSegmented && "bg-background shadow-sm text-foreground",
                    showSegmented && isRejection && "text-red-600"
                  )}
                >
                  <Sparkles className="w-3 h-3" />
                  Análisis
                </Button>
              </div>
            )}
          </div>

          {/* Visor de Imagen */}
          <div className={cn(
            "relative aspect-square rounded-lg overflow-hidden bg-muted/30 shadow-inner border",
            isRejection && showSegmented ? "border-red-200" : "border-border/50"
          )}>
            <AnimatePresence mode="wait">
              {!showSegmented ? (
                <motion.img
                  key="original"
                  src={originalImage || "/placeholder.jpg"}
                  alt="Original"
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
                  alt="Análisis IA"
                  className={cn(
                    "w-full h-full object-cover",
                    // Si es rechazo, desaturamos un poco para enfatizar que es un estado de error
                    isRejection && "grayscale-[0.2] contrast-[0.9]"
                  )}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                />
              )}
            </AnimatePresence>

            {/* Barra de estado inferior (Overlay discreto) */}
            <div className={cn(
              "absolute bottom-0 left-0 right-0 p-2 text-xs font-medium text-center backdrop-blur-md border-t",
              isRejection 
                ? "bg-red-900/80 text-white border-red-500/50" 
                : "bg-background/80 text-foreground/80 border-border/50"
            )}>
              {showSegmented 
                ? (isRejection ? "⚠️ Detección anómala o insuficiente" : "✨ Detección de granos activa")
                : "Vista original sin procesar"
              }
            </div>
          </div>

          {/* Pie de foto explicativo */}
          {showSegmented && (
            <motion.p 
              className={cn(
                "text-xs px-1",
                isRejection ? "text-red-600 font-medium" : "text-muted-foreground"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {isRejection 
                ? "El modelo no pudo identificar una forma de grano válida en las áreas resaltadas."
                : "Las áreas verdes indican la superficie de los granos identificada por la IA."
              }
            </motion.p>
          )}
        </Card>
      </motion.div>

      {/* ==========================================
          COLUMNA DERECHA: DATOS E INFORME
      ========================================== */}
      <motion.div className="space-y-4" variants={itemVariants}>
        
        {/* A. Escala Agtron o Tarjeta de Error */}
        {!isRejection ? (
          <AgtronScale
            position={result.agtronPosition}
            roastLevel={result.roastLevel}
          />
        ) : (
          <Card className="p-6 bg-red-50/50 border-red-200 dark:bg-red-950/20 dark:border-red-900">
            <div className="flex gap-4">
              <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-full h-fit">
                <ShieldAlert className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-red-900 dark:text-red-200">
                  No se logró un análisis claro
                </h3>
                <p className="text-sm text-red-700/90 dark:text-red-300/90 leading-relaxed">
                  El sistema de seguridad ha rechazado esta imagen para evitar una clasificación errónea.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* B. Detalles de Clasificación */}
        <Card className="p-6 space-y-5">
          {/* Header Confianza */}
          <div className="flex items-center justify-between border-b pb-4">
            <div className="space-y-0.5">
              <h3 className="text-sm font-medium text-muted-foreground">
                Fiabilidad del modelo
              </h3>
              <p className="text-xs text-muted-foreground/60">
                Basado en coherencia de color y forma
              </p>
            </div>
            <div className="text-right">
              <Badge 
                variant={isRejection ? "destructive" : "outline"} 
                className={cn(
                  "text-lg px-3 py-1",
                  !isRejection && "border-green-200 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                )}
              >
                {result.confidence.toFixed(1)}%
              </Badge>
            </div>
          </div>

          {/* Diagnóstico / Descripción */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              {isRejection 
                ? <span className="text-red-600">Diagnóstico de Error</span>
                : <span className="text-foreground">Perfil de Tueste</span>
              }
            </h4>
            
            <div className={cn(
              "p-4 rounded-lg text-sm leading-relaxed border",
              isRejection 
                ? "bg-red-50/30 border-red-100 text-red-800 dark:bg-red-900/10 dark:text-red-200" 
                : "bg-muted/30 border-transparent text-foreground/90"
            )}>
              {/* Prioridad: Mensaje de Error API > Descripción Genérica */}
              {result.errorMessage || result.description}
            </div>
          </div>

          {/* C. Usos o Recomendaciones */}
          {result.uses && result.uses.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                {isRejection ? "💡 Acciones sugeridas:" : "☕ Usos recomendados:"}
              </h4>
              <ul className="grid gap-2">
                {result.uses.map((use, index) => (
                  <li 
                    key={index} 
                    className="text-sm text-muted-foreground flex items-start gap-2.5 bg-secondary/20 p-2 rounded-md"
                  >
                    {isRejection ? (
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    )}
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
};