import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/Confetti";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      <Confetti />

      <div className="text-center space-y-8 px-4 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-7xl md:text-8xl font-black text-primary tracking-tight">
            JIRACHI
          </h1>
          <div className="relative">
            <div className="h-1 w-64 mx-auto bg-primary/80 transform -rotate-1" />
            <h2 className="text-2xl md:text-3xl font-bold text-primary/90 italic mt-2 tracking-wide">
              ANYTHING COULD HAPPEN
            </h2>
            <div className="h-1 w-72 mx-auto bg-primary/60 transform rotate-1 mt-1" />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20">
        <button
          onClick={() => navigate("/options")}
          className="relative w-full h-28 group cursor-pointer block"
          style={{ display: 'block', margin: 0, padding: 0 }}
        >
          <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full block">
            <polygon
              points="0,30 100,30 50,0"
              fill="hsl(var(--primary))"
              className="transition-all duration-300 group-hover:fill-[hsl(var(--primary)/0.9)]"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl font-bold text-primary-foreground pb-4">
            START
          </span>
        </button>
      </div>
    </div>
  );
};

export default Home;
