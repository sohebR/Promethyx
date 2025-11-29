import { cn } from "@/lib/utils";

interface ZKShieldProps {
  className?: string;
  animated?: boolean;
}

export function ZKShield({ className, animated = true }: ZKShieldProps) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-16 h-20", className)}
    >
      {/* Shield outline */}
      <path
        d="M50 5L10 25V55C10 80 30 100 50 115C70 100 90 80 90 55V25L50 5Z"
        className="stroke-primary fill-primary/10"
        strokeWidth="2"
      />
      
      {/* Inner shield glow */}
      <path
        d="M50 15L20 32V55C20 75 35 92 50 105C65 92 80 75 80 55V32L50 15Z"
        className={cn(
          "fill-primary/5 stroke-primary/50",
          animated && "animate-pulse"
        )}
        strokeWidth="1"
      />
      
      {/* ZK symbol - stylized */}
      <text
        x="50"
        y="65"
        textAnchor="middle"
        className="fill-primary font-bold text-2xl"
        style={{ fontSize: '28px', fontFamily: 'Outfit, sans-serif' }}
      >
        ZK
      </text>
      
      {/* Decorative circuit lines */}
      <g className="stroke-primary/40" strokeWidth="1">
        <line x1="25" y1="45" x2="35" y2="45" />
        <line x1="65" y1="45" x2="75" y2="45" />
        <line x1="25" y1="75" x2="35" y2="75" />
        <line x1="65" y1="75" x2="75" y2="75" />
        <circle cx="35" cy="45" r="2" className="fill-primary/40" />
        <circle cx="65" cy="45" r="2" className="fill-primary/40" />
        <circle cx="35" cy="75" r="2" className="fill-primary/40" />
        <circle cx="65" cy="75" r="2" className="fill-primary/40" />
      </g>
    </svg>
  );
}
