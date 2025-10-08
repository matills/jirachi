import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SpinWheelProps {
  options: string[];
}

const wheelColors = [
  "hsl(270, 45%, 70%)",
  "hsl(142, 50%, 75%)",
  "hsl(160, 40%, 80%)",
  "hsl(210, 45%, 75%)",
  "hsl(330, 60%, 70%)",
  "hsl(142, 60%, 65%)",
  "hsl(180, 35%, 75%)",
];

export const SpinWheel = ({ options }: SpinWheelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    drawWheel();
  }, [options, rotation]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas || options.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw wheel segments
    const anglePerSegment = (2 * Math.PI) / options.length;

    options.forEach((option, index) => {
      const startAngle = index * anglePerSegment + rotation;
      const endAngle = startAngle + anglePerSegment;

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = wheelColors[index % wheelColors.length];
      ctx.fill();
      
      // Only draw borders if there's more than one option
      if (options.length > 1) {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw pointer triangle at top
    ctx.save();
    ctx.translate(centerX, 20);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-15, -20);
    ctx.lineTo(15, -20);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  };

  const spinWheel = () => {
    if (isSpinning || options.length === 0) return;

    setIsSpinning(true);
    const spinDuration = 4000;
    const startTime = Date.now();
    const startRotation = rotation;
    const totalRotation = Math.PI * 2 * 5 + Math.random() * Math.PI * 2;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);

      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentRotation = startRotation + totalRotation * easeOut;

      setRotation(currentRotation);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        determineWinner(currentRotation);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const determineWinner = (finalRotation: number) => {
    const normalizedRotation = (2 * Math.PI - (finalRotation % (2 * Math.PI))) % (2 * Math.PI);
    const anglePerSegment = (2 * Math.PI) / options.length;
    const winnerIndex = Math.floor(normalizedRotation / anglePerSegment);
    
    toast.success(`¡Ganador: ${options[winnerIndex]}!`, {
      duration: 5000,
    });
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 h-full justify-center">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="max-w-full"
        />
      </div>

      <button
        onClick={spinWheel}
        disabled={isSpinning || options.length === 0}
        className="bg-[hsl(var(--go-button))] hover:bg-[hsl(var(--go-button-hover))] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-4xl uppercase tracking-widest transition-all hover:scale-105 active:scale-95 rounded-lg border-4 border-white shadow-lg px-12 py-4"
      >
        GO!
      </button>
    </div>
  );
};
