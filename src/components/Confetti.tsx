import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  size: number;
}

export const Confetti = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const colors = [
    "hsl(var(--wheel-1))",
    "hsl(var(--wheel-2))",
    "hsl(var(--wheel-3))",
    "hsl(var(--wheel-4))",
    "hsl(var(--wheel-5))",
    "hsl(var(--wheel-6))",
    "hsl(50, 90%, 60%)",
    "hsl(340, 80%, 65%)",
  ];

  useEffect(() => {
    const generatePieces = () => {
      const newPieces: ConfettiPiece[] = [];
      for (let i = 0; i < 50; i++) {
        newPieces.push({
          id: Date.now() + i + Math.random() * 1000,
          left: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 1.5,
          size: Math.random() * 12 + 6,
        });
      }
      setPieces(prevPieces => [...prevPieces, ...newPieces]);
    };

    generatePieces();
    
    const interval = setInterval(generatePieces, 1500);

    const cleanupInterval = setInterval(() => {
      setPieces(prevPieces => {
        const cutoff = Date.now() - 6000;
        return prevPieces.filter(piece => piece.id > cutoff);
      });
    }, 6000);

    return () => {
      clearInterval(interval);
      clearInterval(cleanupInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti absolute"
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size * 1.5}px`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            top: "-10%",
          }}
        />
      ))}
    </div>
  );
};
