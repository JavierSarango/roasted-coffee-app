# ☕ Roasted Coffee App (Coffee Roast Vision)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Una aplicación web moderna diseñada para identificar y visualizar grados de tostado de café. Este proyecto utiliza inteligencia artificial (o análisis visual) para ayudar a determinar el nivel de tostado de los granos de café, proporcionando una interfaz limpia y rápida.

🔗 **Demo en vivo:** [https://roast-vision-app.vercel.app](https://roast-vision-app.vercel.app)

---

## 🚀 Tecnologías Utilizadas

Este proyecto ha sido construido utilizando un stack moderno y eficiente:

*   **[React](https://reactjs.org/)**: Biblioteca principal para la interfaz de usuario.
*   **[Vite](https://vitejs.dev/)**: Entorno de desarrollo ultrarrápido.
*   **[TypeScript](https://www.typescriptlang.org/)**: Tipado estático para un código más robusto.
*   **[Tailwind CSS](https://tailwindcss.com/)**: Framework de utilidades para el diseño.
*   **[shadcn/ui](https://ui.shadcn.com/)**: Componentes de UI reutilizables y accesibles.

## 📋 Características Principales

*   ✨ **Interfaz Moderna**: Diseño limpio y minimalista enfocado en la experiencia de usuario.
*   ⚡ **Rendimiento Óptimo**: Carga rápida gracias a Vite y React.
*   📱 **Responsive Design**: Totalmente adaptable a dispositivos móviles y de escritorio.
*   ☕ **Análisis de Tostado**: Herramienta para visualizar y clasificar los niveles de tostado del café.

## 🛠️ Instalación y Configuración Local

Si deseas ejecutar este proyecto en tu máquina local, sigue estos pasos:

### Prerrequisitos
Asegúrate de tener instalado **Node.js** (versión 16 o superior) y **npm**.

### Pasos

1.  **Clonar el repositorio**
    ```bash
    git clone https://github.com/JavierSarango/roasted-coffee-app.git
    ```

2.  **Navegar al directorio del proyecto**
    ```bash
    cd roasted-coffee-app
    ```

3.  **Instalar las dependencias**
    ```bash
    npm install
    # o si usas bun/yarn/pnpm
    bun install
    ```

4.  **Iniciar el servidor de desarrollo**
    ```bash
    npm run dev
    ```

5.  **Abrir en el navegador**
    Visita `http://localhost:8080` (o el puerto que indique tu consola) para ver la aplicación.

## 📂 Estructura del Proyecto

```text
roasted-coffee-app/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes reutilizables (UI, layouts, etc.)
│   ├── pages/           # Vistas principales de la aplicación
│   ├── lib/             # Utilidades y funciones auxiliares
│   ├── App.tsx          # Componente principal
│   └── main.tsx         # Punto de entrada
├── index.html           # HTML base
├── package.json         # Dependencias y scripts
├── tailwind.config.ts   # Configuración de Tailwind
└── vite.config.ts       # Configuración de Vite
