import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Share2 } from "lucide-react";
import { WheelDisplay } from "@/components/WheelDisplay";
import { toast } from "sonner";

const Options = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlOptions = params.getAll('option');
    if (urlOptions.length > 0) {
      setOptions(urlOptions);
    }
  }, []);

  const colors = [
    "hsl(var(--wheel-1))",
    "hsl(var(--wheel-2))",
    "hsl(var(--wheel-3))",
    "hsl(var(--wheel-4))",
    "hsl(var(--wheel-5))",
    "hsl(var(--wheel-6))",
  ];

  const handleAddOption = () => {
    if (inputValue.trim()) {
      setOptions([...options, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddOption();
    }
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSpin = () => {
    if (options.length < 2) {
      toast.error("Add at least 2 options to spin!");
      return;
    }
    const winner = options[Math.floor(Math.random() * options.length)];
    navigate("/result", { state: { winner, options } });
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    options.forEach(option => params.append('option', option));
    const shareUrl = `${window.location.origin}/options?${params.toString()}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="w-full md:w-1/2 flex flex-col border-r border-border h-screen">
        <div className="flex-shrink-0 p-4 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add something"
              className="flex-1 text-lg border-2 rounded-lg px-4 py-3 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all"
            />
            <Button
              onClick={handleAddOption}
              size="icon"
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-12 rounded-lg"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-24 md:pb-0">
          {options.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground p-8 text-center">
              <p>Start adding options to create your wheel!</p>
            </div>
          ) : (
            <div className="space-y-2 p-4">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg transition-all hover:scale-[1.02] group"
                  style={{ backgroundColor: colors[index % colors.length] }}
                >
                  <span className="flex-1 text-white font-medium">
                    {option}
                  </span>
                  <Button
                    onClick={() => handleRemoveOption(index)}
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20 opacity-70 group-hover:opacity-100 transition-opacity h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {options.length > 0 && (
          <div className="flex-shrink-0 border-t border-border p-4 bg-card hidden md:block">
            <Button
              onClick={handleShare}
              variant="outline"
              className="w-full"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        )}

      </div>

      <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center p-8 relative">
        {options.length > 0 ? (
          <WheelDisplay options={options} colors={colors} />
        ) : (
          <div className="text-center text-muted-foreground">
            <div className="w-64 h-64 rounded-full border-4 border-dashed border-muted flex items-center justify-center mb-4">
              <p className="text-sm">Your wheel will appear here</p>
            </div>
          </div>
        )}
      </div>

      {options.length > 0 && (
        <div className="hidden md:block fixed bottom-0 right-0 md:w-1/2 z-50">
          <button
            onClick={handleSpin}
            className="relative w-full h-24 group cursor-pointer block"
            style={{ display: 'block', margin: 0, padding: 0 }}
          >
            <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="w-full h-full block">
              <polygon
                points="0,100 200,100 100,0"
                fill="hsl(var(--primary))"
                className="transition-all duration-300 group-hover:fill-[hsl(var(--primary)/0.9)]"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl font-bold text-primary-foreground">
              GO!
            </span>
          </button>
        </div>
      )}

      {options.length > 0 && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
          <button
            onClick={handleSpin}
            className="relative w-full h-24 group cursor-pointer block"
            style={{ display: 'block', margin: 0, padding: 0 }}
          >
            <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="w-full h-full block">
              <polygon
                points="0,100 200,100 100,0"
                fill="hsl(var(--primary))"
                className="transition-all duration-300 group-hover:fill-[hsl(var(--primary)/0.9)]"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl font-bold text-primary-foreground pb-4">
              GO!
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Options;
