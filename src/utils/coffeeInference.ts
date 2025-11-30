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
  // API ENDPOINT
  //const API_ENDPOINT = "http://127.0.0.1:8000/predict";
  const API_ENDPOINT = "https://nonorthodox-colicky-awilda.ngrok-free.dev/predict";
  try {
    // FormData
    const formData = new FormData();
    formData.append("file", imageFile); 
    
    // Realizar la llamada API real
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en la respuesta del API:", errorData);
      throw new Error(`Error del servidor: ${response.statusText}`);
    }
    
    // Obtener la respuesta JSON del API (en Inglés)
    // (Ej: { "clase_predicha": "Dark", "confianza": 0.99 })
    const result = await response.json(); 
    
    // --- ¡TRADUCCIÓN! ---
    // Traduce la respuesta del API (ej: "Dark") al tipo del Frontend (ej: "Oscuro")
    const apiLevel = result.clase_predicha; // "Dark"
    const frontendLevel = apiToFrontendMap[apiLevel]  || "Desconocido"; // "Oscuro"

    if (!frontendLevel) {
      // Manejo de error si la API devuelve una clase inesperada
      console.error("Clase no reconocida recibida del API:", apiLevel);
      throw new Error("Respuesta del API no válida.");
    }

    // Usa el nivel en ESPAÑOL ('frontendLevel') para buscar los datos
    const data = roastLevelData[frontendLevel]; 
    const descriptionToShow = result.mensaje_error ? 
        `${data.description} (${result.mensaje_error})` : 
        data.description;

    return {
      roastLevel: frontendLevel, 
      confidence: result.confianza * 100, 
      agtronPosition: data.position,
      description: descriptionToShow,
      uses: data.uses, 
      segmentationImage: result.segmentacion_base64,
      errorMessage: result.mensaje_error,
    };

  } catch (error) {
    console.error("Error en la inferencia:", error);
    throw new Error("No se pudo obtener la inferencia. API fuera de servicio");
  }
};

export const getRoastLevelColor = (level: RoastLevel): string => {
  const colors: Record<RoastLevel, string> = {
    Verde: "hsl(var(--coffee-green))",
    Claro: "hsl(var(--coffee-light))",
    Medio: "hsl(var(--coffee-medium))",
    Oscuro: "hsl(var(--coffee-dark))",
    Sobretostado: "hsl(var(--coffee-burnt))",
    Desconocido: "hsl(0, 0%, 60%)",
    NoDetectado: "hsl(0, 80%, 60%)",
  };
  return colors[level] || "hsl(0, 0%, 50%)";
};