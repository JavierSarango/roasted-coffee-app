export type RoastLevel = "Verde" | "Claro" | "Medio" | "Oscuro" | "Sobretostado";

export interface InferenceResult {
  roastLevel: RoastLevel;
  confidence: number;
  agtronPosition: number; // 0-100 position on the scale
  description: string;
}

const roastLevelData: Record<RoastLevel, { position: number; description: string }> = {
  Verde: {
    position: 5,
    description: "Grano sin tostar, color verde natural. No apto para consumo directo.",
  },
  Claro: {
    position: 25,
    description: "Tostado suave con notas más ácidas. Preserva los sabores originales del grano.",
  },
  Medio: {
    position: 50,
    description: "Balance ideal entre acidez y cuerpo. Perfil de sabor equilibrado y versátil.",
  },
  Oscuro: {
    position: 75,
    description: "Tostado intenso con notas amargas y cuerpo robusto. Sabores caramelizados.",
  },
  Sobretostado: {
    position: 95,
    description: "Tostado excesivo con sabor ahumado y carbonizado. Pérdida de matices.",
  },
};

export const simulateInference = (): Promise<InferenceResult> => {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      const levels: RoastLevel[] = ["Verde", "Claro", "Medio", "Oscuro", "Sobretostado"];
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];
      const data = roastLevelData[randomLevel];
      
      resolve({
        roastLevel: randomLevel,
        confidence: Math.random() * 15 + 85, // 85-100% confidence
        agtronPosition: data.position,
        description: data.description,
      });
    }, 1500);
  });
};

export const getRoastLevelColor = (level: RoastLevel): string => {
  const colors: Record<RoastLevel, string> = {
    Verde: "hsl(var(--coffee-green))",
    Claro: "hsl(var(--coffee-light))",
    Medio: "hsl(var(--coffee-medium))",
    Oscuro: "hsl(var(--coffee-dark))",
    Sobretostado: "hsl(var(--coffee-burnt))",
  };
  return colors[level];
};
