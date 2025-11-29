import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Shield, Lock, Check, Loader2 } from "lucide-react";

interface ProofAnimationProps {
  isGenerating: boolean;
  isComplete: boolean;
  className?: string;
}

const steps = [
  { label: "Encrypting vote", icon: Lock },
  { label: "Generating ZK proof", icon: Shield },
  { label: "Verifying eligibility", icon: Check },
];

export function ProofAnimation({ isGenerating, isComplete, className }: ProofAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isGenerating && !isComplete) {
      const stepInterval = setInterval(() => {
        setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 2000);

      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 100));
      }, 60);

      return () => {
        clearInterval(stepInterval);
        clearInterval(progressInterval);
      };
    }
  }, [isGenerating, isComplete]);

  if (!isGenerating && !isComplete) return null;

  return (
    <div className={cn("relative", className)}>
      {/* Central animation container */}
      <div className="relative flex flex-col items-center">
        {/* Rotating ring */}
        <div className="relative w-32 h-32">
          {/* Outer ring */}
          <div 
            className={cn(
              "absolute inset-0 rounded-full border-2 border-primary/30",
              isGenerating && !isComplete && "animate-spin-slow"
            )}
          />
          
          {/* Progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="60"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${progress * 3.77} 377`}
              className="transition-all duration-100"
            />
          </svg>
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            {isComplete ? (
              <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center animate-scale-in">
                <Check className="w-8 h-8 text-success" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Steps */}
        <div className="mt-8 space-y-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isDone = index < currentStep || isComplete;
            
            return (
              <div
                key={step.label}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300",
                  isActive && "bg-primary/10 border border-primary/30",
                  isDone && "opacity-100",
                  !isActive && !isDone && "opacity-40"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center",
                  isDone ? "bg-success" : isActive ? "bg-primary" : "bg-muted"
                )}>
                  {isDone ? (
                    <Check className="w-4 h-4 text-success-foreground" />
                  ) : (
                    <Icon className={cn(
                      "w-4 h-4",
                      isActive ? "text-primary-foreground" : "text-muted-foreground"
                    )} />
                  )}
                </div>
                <span className={cn(
                  "text-sm font-medium",
                  isActive && "text-primary",
                  isDone && "text-success"
                )}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Hash display */}
        {isGenerating && (
          <div className="mt-6 px-4 py-2 rounded-lg bg-card border border-border">
            <p className="text-xs text-muted-foreground mb-1">Proof Hash</p>
            <p className="font-mono text-xs text-primary truncate max-w-[280px]">
              0x{Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
