import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Github, Linkedin, Copy, Check, PhoneCall} from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const email = "comunicacion@unl.edu.ec";
  const [copiedPhone, setCopiedPhone] = useState(false);
  const phone = "07 2593550";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };
    const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "La forma más directa de contactarnos",
      action: (
        <div className="flex gap-2 items-center">
          <a 
            href={`mailto:${email}`}
            className="text-primary hover:underline font-medium"
          >
            {email}
          </a>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyEmail}
            className="h-8 w-8 p-0"
          >
            {copiedEmail ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      )
    },
    // {
    //   icon: Github,
    //   title: "GitHub",
    //   description: "Revisa el código fuente del proyecto",
    //   action: (
    //     <a 
    //       href="https://github.com/JavierSarango/roasted-coffee-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Button variant="outline" className="w-full">
    //         Ver Repositorio
    //       </Button>
    //     </a>
    //   )
    // },
    {
      icon: PhoneCall,
      title: "Teléfono de Contacto",
      description: "Conéctate con nosotros profesionalmente",
      action: (
       <div className="flex gap-2 items-center">
          <a 
            href={`tel:${phone}`}
            className="text-primary hover:underline font-medium"
          >
            {phone}
          </a>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyPhone}
            className="h-8 w-8 p-0"
          >
            {copiedPhone ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      )
    },
    // {
    //   icon: MessageSquare,
    //   title: "Feedback",
    //   description: "Comparte tus sugerencias o reporta problemas",
    //   action: (
    //     <a href={`mailto:${email}?subject=Feedback - Clasificador de Café`}>
    //       <Button variant="outline" className="w-full">
    //         Enviar Feedback
    //       </Button>
    //     </a>
    //   )
    // }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Contáctanos
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ¿Tienes preguntas o sugerencias? Nos encantaría escucharte.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {method.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {method.description}
                    </p>
                    <div className="pt-2">
                      {method.action}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* FAQ Section */}
          {/* <Card className="p-8 bg-secondary/30">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  ¿Cuánto tiempo tarda en responder al correo?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Generalmente respondemos en un plazo de 24-48 horas hábiles.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  ¿Puedo contribuir al proyecto?
                </h3>
                <p className="text-sm text-muted-foreground">
                  ¡Absolutamente! El proyecto es de código abierto. Visita nuestro repositorio en GitHub para más información.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  ¿Ofrecen soporte técnico?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Sí, puedes reportar problemas técnicos por email o crear un issue en GitHub.
                </p>
              </div>
            </div>
          </Card> */}

          {/* CTA Card */}
         
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;