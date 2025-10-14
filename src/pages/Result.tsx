import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { WheelDisplay } from "@/components/WheelDisplay";
import { Confetti } from "@/components/Confetti";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { winner, options } = location.state || {};
  const [showConfetti, setShowConfetti] = useState(false);
  const [spinning, setSpinning] = useState(true);
  const [showWinner, setShowWinner] = useState(false);
  const [finalRotation, setFinalRotation] = useState(0);

  const colors = [
    "hsl(var(--wheel-1))",
    "hsl(var(--wheel-2))",
    "hsl(var(--wheel-3))",
    "hsl(var(--wheel-4))",
    "hsl(var(--wheel-5))",
    "hsl(var(--wheel-6))",
  ];

  useEffect(() => {
    if (!winner || !options) {
      navigate("/options");
      return;
    }

    const winnerIndex = options.indexOf(winner);
    const segmentAngle = 360 / options.length;
    const winnerAngle = winnerIndex * segmentAngle;
    
    const randomOffset = (Math.random() - 0.5) * segmentAngle * 0.6;
    
    const baseRotation = 1800;
    const targetRotation = -(winnerAngle + segmentAngle / 2 + randomOffset);
    const calculatedRotation = baseRotation + targetRotation;
    
    setFinalRotation(calculatedRotation);

    const spinTimer = setTimeout(() => {
      setSpinning(false);
      setTimeout(() => {
        setShowWinner(true);
        setShowConfetti(true);
      }, 300);
    }, 3000);

    return () => clearTimeout(spinTimer);
  }, [winner, options, navigate]);

  const handleRestart = () => {
    navigate("/options");
  };

  if (!winner || !options) return null;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-700 ${showWinner ? 'bg-primary' : 'bg-background'}`}>
      {showConfetti && <Confetti />}

      <div className="relative z-10 flex flex-col items-center space-y-8 px-4">
        {!showWinner && (
          <WheelDisplay 
            options={options} 
            colors={colors} 
            winner={winner} 
            spinning={spinning}
            finalRotation={finalRotation}
          />
        )}

        {showWinner && (
          <div className="animate-scale-in text-center space-y-6">
            <div className="relative inline-block">
              <h1 className="text-6xl md:text-8xl font-black text-white relative z-10 pb-4">
                {winner.toUpperCase()}
              </h1>
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-white transform -rotate-1" />
            </div>
          </div>
        )}
      </div>

      {showWinner && (
        <div className="fixed bottom-0 left-0 right-0 z-20">
          <button
            onClick={handleRestart}
            className="relative w-full h-28 group cursor-pointer block"
            style={{ display: 'block', margin: 0, padding: 0 }}
          >
            <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full block">
              <polygon
                points="0,30 100,30 50,0"
                fill="white"
                className="transition-all duration-300 group-hover:fill-white/90"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl font-bold text-primary">
              RESTART
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Result;
