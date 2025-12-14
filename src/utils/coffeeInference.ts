export type RoastLevel = "Verde" | "Claro" | "Medio" | "Oscuro" | "Sobretostado" | "Desconocido" | "NoDetectado";

export interface InferenceResult {
  roastLevel: RoastLevel;
  confidence: number;
  agtronPosition: number; // 0-100 position on the scale
  description: string;
  uses: string[]; 
  segmentationImage: string;
  errorMessage: string;
}

const roastLevelData: Record<RoastLevel, { 
  position: number; 
  description: string;
  uses: string[]; 
}> = {
  Verde: {
    position: 5,
    description: "Grano en su estado crudo, antes del proceso de tostado. Posee altos niveles de humedad y notas vegetales.",
    uses: ["No apto para consumo", "Materia prima"]
  },
  Claro: {
    position: 25,
    description: "Tueste ligero que preserva las características originales del origen. Destaca la acidez y las notas florales o frutales.",
    uses: ["Métodos de filtrado (V60, Chemex)"]
  },
  Medio: {
    position: 50,
    description: "El balance ideal. Se reducen las notas vegetales y se caramelizan los azúcares, logrando dulzor y cuerpo.",
    uses: ["Cafetera americana", "Prensa francesa", "Métodos de filtrado (Aeropress, V60)"]
  },
  Oscuro: {
    position: 75,
    description: "Tueste prolongado donde los aceites salen a la superficie. Predomina el cuerpo y las notas amargas sobre la acidez.",
    uses: ["Espresso", "Moka italiana", "Café con leche", "Café americano fuerte", "Café turco"]
  },
  Sobretostado: {
    position: 95,
    description: "Grano carbonizado. Se han perdido los aceites y azúcares, resultando en sabores a ceniza y humo.",
    uses: ["Mezclas comerciales de baja calidad"]
  },
  // --- Casos de Error ---
  Desconocido: {
    position: 0, 
    description: "El sistema no está seguro de la clasificación (Confianza baja).",
    uses: ["Verifica la iluminación", "Intenta con una foto más clara"]
  },
  NoDetectado: {
    position: 0,
    description: "No se detectaron granos de café válidos en la imagen.",
    uses: ["Asegúrate de enfocar los granos", "Evita objetos extraños"]
  }
};

const apiToFrontendMap: Record<string, RoastLevel> = {
  "Dark": "Oscuro",
  "Green": "Verde",
  "Light": "Claro",
  "Medium": "Medio",
  "Overbaking": "Sobretostado",
  "Unknown": "Desconocido",
  "No Coffee": "NoDetectado"
};

export const simulateInference = async (imageFile: File): Promise<InferenceResult> => {
  
 
  const API_ENDPOINT = "https://nonorthodox-colicky-awilda.ngrok-free.dev/predict";
  
  try {
    const formData = new FormData();
    formData.append("file", imageFile); 
    
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})); 
      console.error("Error en la respuesta del API:", errorData);
      throw new Error(`Error del servidor: ${response.statusText}`);
    }
    
    const result = await response.json(); 
    
    // --- TRADUCCIÓN ---
    const apiLevel = result.clase_predicha; 
    
    // Mapeo seguro con fallback a "Desconocido"
    const frontendLevel = apiToFrontendMap[apiLevel] || "Desconocido";

    const data = roastLevelData[frontendLevel]; 
    
    // Construcción del mensaje final para el usuario
    const descriptionToShow = result.mensaje_error 
        ? `${data.description} (${result.mensaje_error})` 
        : data.description;

    return {
      roastLevel: frontendLevel, 
      confidence: result.confianza * 100, 
      agtronPosition: data.position,
      description: descriptionToShow,
      uses: data.uses, 
      segmentationImage: result.segmentacion_base64,
      errorMessage: result.mensaje_error || "", // Aseguramos string vacío si no hay error
    };

  } catch (error) {
    console.error("Error en la inferencia:", error);
    // Es buena práctica propagar el mensaje original si es posible
    const msg = error instanceof Error ? error.message : "Error desconocido";
    throw new Error(`No se pudo obtener la inferencia: ${msg}`);
  }
};

export const getRoastLevelColor = (level: RoastLevel): string => {
  const colors: Record<RoastLevel, string> = {
    Verde: "hsl(var(--coffee-green))",
    Claro: "hsl(var(--coffee-light))",
    Medio: "hsl(var(--coffee-medium))",
    Oscuro: "hsl(var(--coffee-dark))",
    Sobretostado: "hsl(var(--coffee-burnt))",
    Desconocido: "hsl(0, 0%, 60%)",  // Gris
    NoDetectado: "hsl(0, 80%, 60%)", // Rojo suave
  };
  return colors[level] || "hsl(0, 0%, 50%)";
};