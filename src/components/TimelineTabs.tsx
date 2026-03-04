import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FutureCard from "./FutureCard";
import type { SimulationResult } from "@/lib/simulator";

interface TimelineTabsProps {
  result: SimulationResult;
}

const tabs = [
  { key: "optimistic" as const, label: "🔥 Optimistic", color: "text-neon-green" },
  { key: "realistic" as const, label: "⚖️ Realistic", color: "text-neon-blue" },
  { key: "lazy" as const, label: "😴 Lazy", color: "text-neon-orange" },
];

export default function TimelineTabs({ result }: TimelineTabsProps) {
  const [active, setActive] = useState<"optimistic" | "realistic" | "lazy">("optimistic");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      <h2 className="font-display text-xl sm:text-2xl tracking-wider text-gradient">
        🧬 Your Future in 2 Years
      </h2>

      <div className="flex gap-1 p-1 bg-muted rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`flex-1 py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-display tracking-wider transition-all ${
              active === tab.key
                ? "bg-card neon-glow-blue text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <FutureCard key={active} data={result[active]} type={active} />
      </AnimatePresence>
    </motion.div>
  );
}
