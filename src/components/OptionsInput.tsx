import { useState } from "react";
import { Plus, X, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface OptionsInputProps {
  options: string[];
  onOptionsChange: (options: string[]) => void;
}

const wheelColors = [
  "hsl(var(--wheel-1))",
  "hsl(var(--wheel-2))",
  "hsl(var(--wheel-3))",
  "hsl(var(--wheel-4))",
  "hsl(var(--wheel-5))",
  "hsl(var(--wheel-6))",
  "hsl(var(--wheel-7))",
];

export const OptionsInput = ({ options, onOptionsChange }: OptionsInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const addOption = () => {
    if (inputValue.trim()) {
      onOptionsChange([...options, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeOption = (index: number) => {
    onOptionsChange(options.filter((_, i) => i !== index));
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set("options", options.join(","));
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    
    navigator.clipboard.writeText(url).then(() => {
      toast.success("¡URL copiada al portapapeles!");
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addOption();
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add something"
          className="flex-1 bg-white border-border text-foreground placeholder:text-muted-foreground"
        />
        <Button
          onClick={addOption}
          className="bg-[hsl(var(--add-button))] hover:bg-[hsl(var(--add-button))]/90 text-white w-12 h-12 p-0"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-3 rounded-lg transition-colors"
            style={{ backgroundColor: wheelColors[index % wheelColors.length] }}
          >
            <span className="text-white font-medium">{option}</span>
            <button
              onClick={() => removeOption(index)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      {options.length > 0 && (
        <Button
          onClick={handleShare}
          className="w-full bg-[hsl(var(--share-button))] hover:bg-[hsl(var(--share-button))]/90 text-white uppercase font-semibold tracking-wider"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      )}
    </div>
  );
};
