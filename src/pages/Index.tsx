import React, { useState } from "react";
import { motion } from "framer-motion";
import InputForm from "@/components/InputForm";
import TimelineTabs from "@/components/TimelineTabs";
import { simulateFuture, type SimulationInput, type SimulationResult } from "@/lib/simulator";

const Index = React.forwardRef<HTMLDivElement>((_, ref) => {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulate = (input: SimulationInput) => {
    setIsLoading(true);
    setTimeout(() => {
      const data = simulateFuture(input);
      setResult(data);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div ref={ref} className="min-h-screen bg-background overflow-x-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[120px] animate-pulse-glow" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12 md:py-20 space-y-12">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-gradient">
            🔮 Future You AI
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto">
            See who you become in 2 years based on your skills, effort &amp; goals
          </p>
        </motion.header>

        <InputForm onSimulate={handleSimulate} isLoading={isLoading} />

        {result && <TimelineTabs result={result} />}

        <p className="text-[10px] text-muted-foreground/50 text-center font-display tracking-wider">
          Income projections may include remote work, freelancing, or global opportunities. Results are illustrative, not guaranteed.
        </p>
      </div>
    </div>
  );
});

Index.displayName = "Index";

export default Index;
