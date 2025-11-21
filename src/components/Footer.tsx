import { Coffee, Github, Mail, Linkedin } from "lucide-react";
import { Link } from 'react-router-dom';
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Coffee className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-foreground">
                Clasificador de Café
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Análisis inteligente de tostado de café mediante visión por computadora y aprendizaje automático.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/"> Inicio</Link>
              </li>
              <li>
                <Link to="/como-usar">Cómo usar</Link>
              </li>
              <li>
                <Link to="/acerca-de">Acerca de</Link>
              </li>
                <li>
                  <Link to="/contacto">Contacto</Link>
                </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Redes Sociales</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/JavierSarango/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-foreground" />
              </a>
             
              <a
                href="https://linkedin.com/in/javier-andrés-sarango-sarango-90a6982bb/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-foreground" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Clasificador de Tostado de Café. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};