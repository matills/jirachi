interface WheelDisplayProps {
  options: string[];
  colors: string[];
  winner?: string;
  spinning?: boolean;
  finalRotation?: number;
}

export const WheelDisplay = ({ options, colors, winner, spinning = false, finalRotation = 0 }: WheelDisplayProps) => {
  const segmentAngle = 360 / options.length;

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-card drop-shadow-lg" />
      </div>

      <div 
        className={spinning ? "" : ""}
        style={
          spinning 
            ? { 
                animation: `spin-to-winner 3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`,
                '--final-rotation': `${finalRotation}deg`
              } as React.CSSProperties
            : finalRotation 
              ? { transform: `rotate(${finalRotation}deg)` } 
              : {}
        }
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-xl"
        >
          {options.length === 1 ? (
            <circle
              cx="100"
              cy="100"
              r="100"
              fill={colors[0]}
              stroke="white"
              strokeWidth="2"
            />
          ) : (
            options.map((option, index) => {
              const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
              const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);
              
              const x1 = 100 + 100 * Math.cos(startAngle);
              const y1 = 100 + 100 * Math.sin(startAngle);
              const x2 = 100 + 100 * Math.cos(endAngle);
              const y2 = 100 + 100 * Math.sin(endAngle);

              const largeArcFlag = segmentAngle > 180 ? 1 : 0;

              const path = `M 100 100 L ${x1} ${y1} A 100 100 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

              return (
                <g key={index}>
                  <path
                    d={path}
                    fill={colors[index % colors.length]}
                    stroke="white"
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />
                </g>
              );
            })
          )}

          <circle
            cx="100"
            cy="100"
            r="15"
            fill="white"
            stroke={colors[0]}
            strokeWidth="3"
          />
        </svg>
      </div>
    </div>
  );
};
