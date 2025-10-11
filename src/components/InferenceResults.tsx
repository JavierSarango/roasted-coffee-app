import { Card } from "@/components/ui/card";
import { AgtronScale } from "./AgtronScale";
import { Badge } from "@/components/ui/badge";
import type { InferenceResult } from "@/utils/coffeeInference";

interface InferenceResultsProps {
  result: InferenceResult;
  originalImage?: string;
  segmentedImage?: string;
}

export const InferenceResults = ({
  result,
  originalImage,
  segmentedImage,
}: InferenceResultsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
      {/* Images Section */}
      <div className="space-y-4">
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

        <Card className="p-4 space-y-3">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Imagen Segmentada
            </h3>
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={segmentedImage}
                alt="Segmented coffee beans"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
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
      </div>
    </div>
  );
};
