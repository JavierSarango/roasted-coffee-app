import { Coffee } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Coffee className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Analizador de Tostado de Café
            </h1>
            <p className="text-sm text-muted-foreground">
              Clasificación inteligente de granos tostados
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
