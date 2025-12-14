import { Upload, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useRef } from "react";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  disabled?: boolean;
}

export const ImageUploader = ({ onImageSelect, disabled }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-8 border-2 border-dashed border-border hover:border-primary transition-colors">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex gap-4">
            <motion.div 
              className="p-4 rounded-full bg-secondary cursor-pointer"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={handleUploadClick}
            >
              <Upload className="w-8 h-8 text-primary" />
            </motion.div>
            <motion.div 
              className="p-4 rounded-full bg-secondary cursor-pointer"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={handleCameraClick}
            >
              <Camera className="w-8 h-8 text-primary" />
            </motion.div>
          </div>
        
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Sube una imagen de café tostado
            </h3>
            <p className="text-sm text-muted-foreground">
              Arrastra una imagen o haz clic para seleccionar
            </p>
          </div>

          <Button
            variant="default"
            disabled={disabled}
            onClick={handleUploadClick}
          >
            Seleccionar imagen
          </Button>

          {/* Input oculto para cargar desde archivos */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={disabled}
          />

          {/* Input oculto para capturar con cámara */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
            disabled={disabled}
          />
        </div>
      </Card>
    </motion.div>
  );
};