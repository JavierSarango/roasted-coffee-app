import { Upload, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  disabled?: boolean;
}

export const ImageUploader = ({ onImageSelect, disabled }: ImageUploaderProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <Card className="p-8 border-2 border-dashed border-border hover:border-primary transition-colors">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex gap-4">
          <div className="p-4 rounded-full bg-secondary">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <div className="p-4 rounded-full bg-secondary">
            <Camera className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            Sube una imagen de café tostado
          </h3>
          <p className="text-sm text-muted-foreground">
            Arrastra una imagen o haz clic para seleccionar
          </p>
        </div>

        <label htmlFor="image-upload">
          <Button
            variant="default"
            disabled={disabled}
            className="cursor-pointer"
            asChild
          >
            <span>
              Seleccionar imagen
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
                disabled={disabled}
              />
            </span>
          </Button>
        </label>
      </div>
    </Card>
  );
};
