import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Leaf, Flower2, Scale, Bean, Cigarette, Info } from 'lucide-react';


import imgGreen from '@/assets/grano-verde.jpg'; 
import imgLight from '@/assets/grano-claro.jpg'; 
import imgMedium from '@/assets/grano-medio.jpg'; 
import imgDark from '@/assets/grano-oscuro.jpg'; 
import imgBurnt from '@/assets/grano-overbaking.jpg'; 

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
};

const describeArc = (x: number, y: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(x, y, outerRadius, endAngle);
  const end = polarToCartesian(x, y, outerRadius, startAngle);
  const startInner = polarToCartesian(x, y, innerRadius, endAngle);
  const endInner = polarToCartesian(x, y, innerRadius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M", start.x, start.y,
    "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
    "L", endInner.x, endInner.y,
    "A", innerRadius, innerRadius, 0, largeArcFlag, 1, startInner.x, startInner.y,
    "Z"
  ].join(" ");
};

const segments = [
  {
    id: 'verde',
    label: 'VERDE',
    image: imgGreen,
    fallbackColor: '#4ade80',
    // agtron: '> 95',
    icon: Leaf,
    description: "Grano en su estado crudo, antes del proceso de tostado. Posee altos niveles de humedad y notas vegetales.",
    characteristics: ["Sabor herbáceo", "Alta acidez potencial", "Duro y denso"],
    uses: ["Materia prima", "No apto para consumo directo"],
    start: 0,
    end: 72,
  },
  {
    id: 'claro',
    label: 'CLARO',
    image: imgLight,
    fallbackColor: '#facc15',
    // agtron: '95 - 75',
    icon: Flower2,
    description: "Tueste ligero que preserva las características originales del origen. Destaca la acidez y las notas florales o frutales.",
    characteristics: ["Acidez brillante", "Cuerpo ligero", "Notas florales/cítricas"],
    uses: ["Métodos de filtrado (V60, Chemex)"],
    start: 72,
    end: 144,
  },
  {
    id: 'medio',
    label: 'MEDIO',
    image: imgMedium,
    fallbackColor: '#a16207',
    agtron: '75 - 55',
    icon: Scale,
    description: "El balance ideal. Se reducen las notas vegetales y se caramelizan los azúcares, logrando dulzor y cuerpo.",
    characteristics: ["Balance acidez/cuerpo", "Notas a nuez/caramelo", "Final dulce"],
    uses: ["Cafetera de filtro", "Prensa francesa", "Aeropress"],
    start: 144,
    end: 216,
  },
  {
    id: 'oscuro',
    label: 'OSCURO',
    image: imgDark,
    fallbackColor: '#451a03',
    // agtron: '55 - 35',
    icon: Bean,
    description: "Tueste prolongado donde los aceites salen a la superficie. Predomina el cuerpo y las notas amargas sobre la acidez.",
    characteristics: ["Cuerpo denso", "Baja acidez", "Notas a chocolate amargo/especias"],
    uses: ["Espresso", "Moka Italiana", "Bebidas con leche"],
    start: 216,
    end: 288,
  },
  {
    id: 'sobre',
    label: 'SOBRETOSTADO',
    image: imgBurnt,
    fallbackColor: '#1a1a1a',
    // agtron: '< 35',
    icon: Cigarette,
    description: "Grano carbonizado. Se han perdido los aceites y azúcares, resultando en sabores a ceniza y humo.",
    characteristics: ["Sabor a carbón/ceniza", "Sin acidez", "Cuerpo muy ligero o aguado"],
    uses: ["Mezclas comerciales de baja calidad"],
    start: 288,
    end: 360,
  }
];

export const AgtronWheel = () => {
  const [selectedSegment, setSelectedSegment] = useState<typeof segments[0] | null>(null);

  const size = 500;
  const center = size / 2;
  const outerRadius = 240;
  const innerRadius = 80; 
  const labelRadius = 160; 

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full w-full select-none">
        <div className="relative w-full max-w-[500px] aspect-square group">
          
          {/* SVG Principal */}
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full drop-shadow-2xl filter">
            <defs>
              {/* Definimos los patrones de imagen o gradientes */}
              {segments.map((seg) => (
                <pattern 
                  key={`pat-${seg.id}`} 
                  id={`img-${seg.id}`} 
                  patternUnits="userSpaceOnUse" 
                  width={size} 
                  height={size}
                >
                  {/* La imagen cubre todo el SVG, pero la máscara la recorta */}
                  <image href={seg.image} x="0" y="0" width={size} height={size} preserveAspectRatio="xMidYMid slice" />
                </pattern>
              ))}
              
              {/* Filtro para sombra de texto */}
              <filter id="textShadow">
                <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="black" floodOpacity="0.8"/>
              </filter>
            </defs>

            {/* Sombra del círculo base */}
            <circle cx={center} cy={center} r={outerRadius} fill="rgba(0,0,0,0.2)" />

            {segments.map((seg, i) => {
              const pathData = describeArc(center, center, innerRadius, outerRadius, seg.start, seg.end);
              
              // Calculamos posición del texto
              const midAngle = seg.start + (seg.end - seg.start) / 2;
              const pos = polarToCartesian(center, center, labelRadius, midAngle);
              
              return (
                <motion.g 
                  key={seg.id}
                  onClick={() => setSelectedSegment(seg)}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ 
                    scale: 1.05, 
                    filter: "brightness(1.1)",
                    zIndex: 10
                  }}
                  className="cursor-pointer"
                  style={{ transformOrigin: 'center' }}
                >
                  {/* Fondo del segmento: Imagen recortada por el Path */}
                  {/* Fallback color por si la imagen falla o para mezclar */}
                  <path d={pathData} fill={seg.fallbackColor} /> 
                  
                  {/* Capa de Imagen */}
                  <path d={pathData} fill={`url(#img-${seg.id})`} opacity="0.85" />
                  
                  {/* Borde Blanco entre segmentos */}
                  <path d={pathData} fill="none" stroke="white" strokeWidth="3" />

                  {/* Texto Centrado */}
                  <text
                    x={pos.x}
                    y={pos.y}
                    dy="0.35em"
                    textAnchor="middle"
                    fill="white"
                    fontSize="22"
                    fontWeight="900"
                    filter="url(#textShadow)"
                    style={{ textTransform: 'uppercase', letterSpacing: '1px' }}
                  >
                    {seg.label}
                  </text>
                </motion.g>
              );
            })}

            {/* Centro Decorativo */}
            <circle cx={center} cy={center} r={innerRadius - 5} fill="white" stroke="#e5e7eb" strokeWidth="4" />
            
            {/* Texto Central */}
            <foreignObject x={center - 50} y={center - 25} width="100" height="50">
              <div className="flex items-center justify-center h-full text-center">
                 <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                   Click para<br/>detalles
                 </span>
              </div>
            </foreignObject>

          </svg>
        </div>
        
        <p className="text-sm text-muted-foreground mt-6 text-center max-w-xs">
          Selecciona una sección de la rueda para conocer las características de las cinco clases de tueste evaluadas por el modelo.
        </p>
      </div>

      {/* --- MODAL DE INFORMACIÓN --- */}
      <Dialog open={!!selectedSegment} onOpenChange={(open) => !open && setSelectedSegment(null)}>
        <DialogContent className="sm:max-w-[425px]">
          {selectedSegment && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-full bg-secondary text-primary`}>
                    <selectedSegment.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold tracking-tight">
                      {selectedSegment.label}
                    </DialogTitle>
                  </div>
                </div>
              </DialogHeader>

              <div className="relative w-full h-32 rounded-lg overflow-hidden my-2 shadow-inner">
                <img 
                  src={selectedSegment.image} 
                  alt={selectedSegment.label} 
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                  <span className="text-white font-medium text-sm">Visualización del grano</span>
                </div>
              </div>

              <div className="space-y-4 mt-2">
                <div>
                  <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                    <Info className="w-4 h-4" /> Descripción
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedSegment.description}
                  </p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2">Características</h4>
                    <ul className="space-y-1">
                      {selectedSegment.characteristics.map((c, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-current" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2">Usos Comunes</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSegment.uses.map((u, idx) => (
                        <Badge key={idx} variant="secondary" className="text-[10px]">
                          {u}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};