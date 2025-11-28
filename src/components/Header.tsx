import { Coffee } from "lucide-react";
import logoUNL from "../assets/logoUNL.png";
import logoCarrera from "../assets/LogoCarreraNombre.png";
export const Header = () => {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          {/* Sección izquierda - Título */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Coffee className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Clasificador de Tostado de Café
              </h1>
              <p className="text-sm text-muted-foreground">
                Clasificación inteligente de granos tostados
              </p>
            </div>
          </div>

          {/* Sección derecha - Logos */}
          <div className="hidden md:flex items-center gap-4">
            <img 
              src={logoUNL} 
              alt="Logo 1" 
              className="h-10 w-auto object-contain"
            />
            <img 
              src={logoCarrera} 
              alt="Logo 2" 
              className="h-10 w-auto object-contain"
            />
            {/* <img 
              src="/logos/logo3.png" 
              alt="Logo 3" 
              className="h-10 w-auto object-contain"
            /> */}
          </div>
        </div>
      </div>
    </header>
  );
};