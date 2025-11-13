export type RoastLevel = "Verde" | "Claro" | "Medio" | "Oscuro" | "Sobretostado";

export interface InferenceResult {
  roastLevel: RoastLevel;
  confidence: number;
  agtronPosition: number; // 0-100 position on the scale
  description: string;
  uses: string[]; 
}

const roastLevelData: Record<RoastLevel, { 
  position: number; 
  description: string;
  uses: string[]; 
}> = {
  Verde: {
    position: 5,
    description: "Grano sin tostar, color verde natural.",
    uses: [
      "No recomendado para consumo",
      "Usado para tostado posterior"
    ]
  },
  Claro: {
    position: 25,
    description: "Tostado suave con notas más ácidas. Presenta ciertas notas florales y preserva los sabores originales del grano.",
    uses: [
      "Métodos de filtrado (V60, Chemex)"
    ]
  },
  Medio: {
    position: 50,
    description: "Balance entre acidez y cuerpo. Presenta carácteristicas más dulces a frutos secos o caramelo.",
    uses: [
      "Cafetera americana",
      "Prensa francesa",
      "Métodos de filtrado (Aeropress, V60)"
    ]
  },
  Oscuro: {
    position: 75,
    description: "Tostado intenso con notas amargas y cuerpo robusto. Sabores caramelizados.",
    uses: [
      "Espresso",
      "Moka italiana",
      "Café con leche",
      "Café americano fuerte",
      "Café turco"
    ]
  },
  Sobretostado: {
    position: 95,
    description: "Tostado excesivo con sabor ahumado y carbonizado. Pérdida de matices.",
    uses: [
      "No se considera como café de especialidad",
      "Posible uso en mezclas muy específicas",
    ]
  },
};

const apiToFrontendMap: Record<string, RoastLevel> = {
  "Dark": "Oscuro",
  "Green": "Verde",
  "Light": "Claro",
  "Medium": "Medio",
  "Overbaking": "Sobretostado"
};

export const simulateInference = async (imageFile: File): Promise<InferenceResult> => {
  // 1. Apunta a tu API local de FastAPI (asegúrate que el puerto sea correcto)
  const API_ENDPOINT = "http://127.0.0.1:8000/predict";
  
  try {
    // 2. Crear FormData con la clave "file"
    const formData = new FormData();
    formData.append("file", imageFile); 
    
    // 3. Realizar la llamada API real
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en la respuesta del API:", errorData);
      throw new Error(`Error del servidor: ${response.statusText}`);
    }
    
    // 4. Obtener la respuesta JSON del API (en Inglés)
    // (Ej: { "clase_predicha": "Dark", "confianza": 0.99 })
    const result = await response.json(); 
    
    // 5. --- ¡TRADUCCIÓN! ---
    // Traduce la respuesta del API (ej: "Dark") al tipo del Frontend (ej: "Oscuro")
    const apiLevel = result.clase_predicha; // "Dark"
    const frontendLevel = apiToFrontendMap[apiLevel]; // "Oscuro"

    if (!frontendLevel) {
      // Manejo de error si la API devuelve una clase inesperada
      console.error("Clase no reconocida recibida del API:", apiLevel);
      throw new Error("Respuesta del API no válida.");
    }

    // 6. Usa el nivel en ESPAÑOL ('frontendLevel') para buscar los datos
    const data = roastLevelData[frontendLevel]; 

    return {
      roastLevel: frontendLevel, // Devuelve el nivel en Español
      confidence: result.confianza * 100, // Convierte 0.99 a 99%
      agtronPosition: data.position,
      description: data.description,
      uses: data.uses, 
    };

  } catch (error) {
    console.error("Error en la inferencia:", error);
    throw new Error("No se pudo obtener la inferencia. ¿Está el API de FastAPI funcionando?");
  }
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