import { useState } from "react";
import { Header } from "@/components/Header";
import { ImageUploader } from "@/components/ImageUploader";
import { InferenceResults } from "@/components/InferenceResults";
import { Button } from "@/components/ui/button";
import { simulateInference, type InferenceResult } from "@/utils/coffeeInference";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import coffeeHeroImage from "@/assets/coffee-hero.jpg";
import { Footer } from "@/components/Footer";
// 1. Importa el nuevo componente
import { AgtronWheel } from "@/components/AgtronWheel";

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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-16 overflow-hidden">
        <img
          src={coffeeHeroImage}
          alt="Coffee beans hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background" />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow">          
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* 2. Sección de Carga dividida en 2 columnas 
             Solo se muestra el Grid si NO hay un resultado todavía 
          */}
          {!result && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-fade-in">
              
              {/* Columna Izquierda: Rueda Agtron */}
              <div className="w-full h-full">
                <Card className="p-6 h-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 border-secondary/50">
                  <h2 className="text-xl font-semibold mb-6 text-foreground/80">Rueda de Categorías de Tueste Agtron</h2>
                  <div className="w-full max-w-[400px]">
                    <AgtronWheel />
                  </div>
                </Card>
              </div>

              {/* Columna Derecha: Uploader y Preview */}
              <div className="space-y-6">
                
                {/* Upload Area */}
                {!selectedImage && (
                  <div className="h-full">
                    <ImageUploader
                      onImageSelect={handleImageSelect}
                      disabled={isProcessing}
                    />
                  </div>
                )}

                {/* Selected Image Preview & Inference Button */}
                {selectedImage && (
                  <div className="animate-fade-in space-y-6">
                     <Card className="p-6 border-primary/20">
                        <h3 className="text-sm font-medium mb-3 text-muted-foreground">Imagen seleccionada:</h3>
                        <div className="w-full aspect-video rounded-lg overflow-hidden bg-black/5 relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-contain"
                          />
                        </div>
                     </Card>
                    
                    <div className="flex flex-col gap-3">
                      <Button
                        onClick={handleInference}
                        disabled={isProcessing}
                        size="lg"
                        className="w-full text-lg h-14 shadow-lg hover:shadow-xl transition-all"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                            Analizando granos...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-6 w-6" />
                            Ejecutar Análisis Colorimétrico
                          </>
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreview("");
                        }}
                        disabled={isProcessing}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Cancelar y cambiar imagen
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3. Results Section (Se muestra a ancho completo cuando hay resultado) */}
          {result && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Resultados del Análisis</h2>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview("");
                    setResult(null);
                  }}
                >
                  Analizar otra muestra
                </Button>
              </div>
              
              <InferenceResults
                result={result}
                originalImage={imagePreview}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;