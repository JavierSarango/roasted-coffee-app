import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Brain, Target, Zap, Users } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "Inteligencia Artificial",
      description: "Utilizamos modelos de aprendizaje automático entrenados con imágenes de granos de café, para clasificar con precisión el nivel de tostado."
    },
    {
      icon: Target,
      title: "Escala Agtron",
      description: "Nuestro sistema se basa en la escala Agtron, el estándar de la industria cafetera para medir el color y nivel de tostado."
    },
    {
      icon: Zap,
      title: "Resultados Instantáneos",
      description: "Obtén análisis detallados en segundos, incluyendo nivel de tostado, confianza del modelo y recomendaciones de uso."
    },
    {
      icon: Users,
      title: "Para Todos",
      description: "Diseñado tanto para profesionales de la industria como para entusiastas del café que buscan mejorar su experiencia."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Acerca del Proyecto
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Una herramienta de clasificación inteligente que combina tecnología con la pasión por el café.
            </p>
          </div>

          {/* Mission */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Nuestra Misión
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Democratizar el acceso a tecnología de análisis de café de calidad profesional. Creemos que tanto tostadores expertos como entusiastas del café merecen herramientas precisas y fáciles de usar para entender y mejorar la calidad de su café. Nuestro clasificador elimina la subjetividad del análisis visual y proporciona resultados consistentes basados en estándares de la industria.
            </p>
          </Card>

          {/* Features Grid */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              ¿Qué nos hace diferentes?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-primary/10 w-fit">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Technology */}
          <Card className="p-8 bg-secondary/30">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Tecnología
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                El clasificador utiliza redes neuronales convolucionales (CNN) entrenadas específicamente para reconocer patrones visuales en granos de café tostados. El modelo ha sido entrenado con un dataset diverso que incluye diferentes variedades, orígenes y niveles de tostado.
              </p>
              {/* <p className="leading-relaxed">
                La arquitectura del sistema está diseñada para ser rápida y precisa, proporcionando resultados en tiempo real mientras mantiene altos niveles de exactitud. Utilizamos técnicas modernas de visión por computadora y aprendizaje profundo para garantizar la mejor experiencia posible.
              </p> */}
            </div>
          </Card>

          {/* Levels Info */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Niveles de Tostado
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Verde</p>
                  <p className="text-sm text-muted-foreground">Grano sin tostar, solo para almacenamiento y control de calidad</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-amber-300 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Claro</p>
                  <p className="text-sm text-muted-foreground">Perfecto para métodos de filtrado, resalta acidez y notas florales</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Medio</p>
                  <p className="text-sm text-muted-foreground">Balance ideal, versátil para la mayoría de preparaciones</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-amber-900 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Oscuro</p>
                  <p className="text-sm text-muted-foreground">Ideal para espresso y bebidas con leche, cuerpo robusto</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-stone-900 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Sobretostado</p>
                  <p className="text-sm text-muted-foreground">Excesivo, con sabores ahumados</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;