import { useState } from "react";
import { Header } from "@/components/Header";
import { ImageUploader } from "@/components/ImageUploader";
import { InferenceResults } from "@/components/InferenceResults";
import { Button } from "@/components/ui/button";
import { simulateInference, type InferenceResult } from "@/utils/coffeeInference";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import coffeeHeroImage from "@/assets/coffee-hero.jpg";
import coffeeBeansOriginal from "@/assets/coffee-beans-original.jpg";
import coffeeBeansSegmented from "@/assets/coffee-beans-segmented.jpg";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<InferenceResult | null>(null);
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setResult(null);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    toast({
      title: "Imagen cargada",
      description: "Haz clic en 'Ejecutar Inferencia' para analizar el tostado.",
    });
  };

  const handleInference = async () => {
    if (!selectedImage) {
      toast({
        title: "No hay imagen",
        description: "Por favor, selecciona una imagen primero.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const inferenceResult = await simulateInference(selectedImage);
      setResult(inferenceResult);
      
      toast({
        title: "Análisis completado",
        description: `Nivel de tostado: ${inferenceResult.roastLevel}`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Hubo un problema al procesar la imagen.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={coffeeHeroImage}
          alt="Coffee beans hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background" />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 -mt-20 relative z-10">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Upload Section */}
          {!selectedImage && (
            <div className="animate-fade-in">
              <ImageUploader
                onImageSelect={handleImageSelect}
                disabled={isProcessing}
              />
            </div>
          )}

          {/* Selected Image Preview & Inference Button */}
          {selectedImage && !result && (
            <div className="animate-fade-in space-y-4">
              <div className="flex flex-col items-center gap-4">
                <div className="w-full max-w-md">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full rounded-lg shadow-medium"
                  />
                </div>
                
                <Button
                  onClick={handleInference}
                  disabled={isProcessing}
                  size="lg"
                  className="min-w-[200px]"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analizando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Ejecutar Inferencia
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview("");
                  }}
                  disabled={isProcessing}
                >
                  Cambiar imagen
                </Button>
              </div>
            </div>
          )}

          {/* Results Section */}
          {result && (
            <>
              <InferenceResults
                result={result}
                originalImage={coffeeBeansOriginal}
                segmentedImage={coffeeBeansSegmented}
              />
              
              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview("");
                    setResult(null);
                  }}
                >
                  Analizar otra imagen
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
