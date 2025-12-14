import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Upload, Sparkles, BarChart3, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const HowToUse = () => {
  const steps = [
    {
      icon: Upload,
      title: "1. Sube tu imagen",
      description: "Selecciona una imagen de granos de café tostados desde tu dispositivo o toma una foto directamente con tu cámara.",
      tips: ["Asegúrate de tener buena iluminación", "Enfoca los granos claramente", "Evita sombras excesivas"]
    },
    {
      icon: Sparkles,
      title: "2. Ejecuta el análisis",
      description: "Haz clic en el botón 'Ejecutar Inferencia' para que nuestro modelo de inteligencia artificial analice el nivel de tostado.",
      tips: ["El proceso toma solo unos segundos"]
    },
    {
      icon: BarChart3,
      title: "3. Revisa los resultados",
      description: "Obtén información detallada sobre el nivel de tostado, escala Agtron, y recomendaciones de uso para tu café.",
      tips: ["Visualiza la posición en la escala Agtron", "Lee las características del tostado", "Descubre los mejores métodos de preparación"]
    },
    // {
    //   icon: CheckCircle,
    //   title: "4. Analiza más imágenes",
    //   description: "Puedes analizar tantas muestras como necesites para comparar diferentes lotes o tostados.",
    //   tips: ["Guarda tus resultados para comparaciones futuras", "Experimenta con diferentes ángulos de captura"]
    // }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              ¿Cómo usar el Clasificador?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sigue estos sencillos pasos para analizar el nivel de tostado de tus granos de café.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="p-4 rounded-lg bg-primary/10">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-3">
                      <h2 className="text-2xl font-semibold text-foreground">
                        {step.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">
                          💡 Consejos:
                        </p>
                        <ul className="space-y-1">
                          {step.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="text-sm text-muted-foreground flex items-start">
                              <span className="mr-2 text-primary">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Tips Card */}
          <Card className="p-6 bg-secondary/50 border-secondary">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Recomendaciones Generales
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start text-sm text-muted-foreground">
                <span className="mr-2 text-primary">✓</span>
                <span>Utiliza imágenes con buena resolución para mejores resultados</span>
              </li>
              <li className="flex items-start text-sm text-muted-foreground">
                <span className="mr-2 text-primary">✓</span>
                <span>Los granos deben estar visibles y no apilados en exceso</span>
              </li>
              <li className="flex items-start text-sm text-muted-foreground">
                <span className="mr-2 text-primary">✓</span>
                <span>La iluminación natural proporciona los mejores resultados</span>
              </li>
              <li className="flex items-start text-sm text-muted-foreground">
                <span className="mr-2 text-primary">✓</span>
                <span>Evita fondos con colores que interfieran con el café</span>
              </li>
            </ul>
          </Card>
           <Card className="p-8 bg-primary/5 border-primary/20 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              ¿Listo para comenzar?
            </h2>
            <p className="text-muted-foreground mb-6">
              Prueba el clasificador de café ahora y descubre el nivel de tostado de tus granos.
            </p>
            <a href="/">
              <Button size="lg">
                Ir al Clasificador
              </Button>
            </a>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowToUse;