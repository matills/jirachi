import { useState, useEffect } from "react";
import { OptionsInput } from "@/components/OptionsInput";
import { SpinWheel } from "@/components/SpinWheel";
import { Volume2, Info } from "lucide-react";

const Index = () => {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    // Load options from URL if present
    const params = new URLSearchParams(window.location.search);
    const urlOptions = params.get("options");
    
    if (urlOptions) {
      setOptions(urlOptions.split(",").filter(Boolean));
    }
  }, []);

  useEffect(() => {
    // Update URL when options change
    if (options.length > 0) {
      const params = new URLSearchParams();
      params.set("options", options.join(","));
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params.toString()}`
      );
    } else {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [options]);

  return (
    <div className="min-h-screen bg-background dark">
      {/* Header */}
      <header className="fixed top-0 right-0 p-4 flex gap-3 z-10">
        <button className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors">
          <Info className="h-5 w-5 text-primary" />
        </button>
        <button className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors">
          <Volume2 className="h-5 w-5 text-primary" />
        </button>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-12 min-h-screen">
        {/* Left Panel - Options Input */}
        <div className="flex flex-col">
          <OptionsInput options={options} onOptionsChange={setOptions} />
        </div>

        {/* Right Panel - Spin Wheel */}
        <div className="flex flex-col">
          {options.length > 0 ? (
            <SpinWheel options={options} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground text-lg text-center">
                Agrega al menos una opción para comenzar
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
