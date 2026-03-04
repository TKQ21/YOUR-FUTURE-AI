import { useRef } from "react";
import { motion } from "framer-motion";
import { Download, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TimelineResult } from "@/lib/simulator";
import html2canvas from "html2canvas";

interface FutureCardProps {
  data: TimelineResult;
  type: "optimistic" | "realistic" | "lazy";
  userName?: string;
}

const typeConfig = {
  optimistic: {
    emoji: "🚀",
    label: "Optimistic Future",
    borderClass: "neon-border-green",
    glowClass: "neon-glow-cyan",
    gradient: "var(--gradient-card-optimistic)",
    color: "text-neon-green",
  },
  realistic: {
    emoji: "⚖️",
    label: "Realistic Future",
    borderClass: "neon-border-blue",
    glowClass: "neon-glow-blue",
    gradient: "var(--gradient-card-realistic)",
    color: "text-neon-blue",
  },
  lazy: {
    emoji: "😴",
    label: "Lazy Future",
    borderClass: "neon-border-orange",
    glowClass: "neon-glow-violet",
    gradient: "var(--gradient-card-lazy)",
    color: "text-neon-orange",
  },
};

export default function FutureCard({ data, type }: FutureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const config = typeConfig[type];

  const speakMessage = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(data.message);
      utterance.rate = 0.9;
      utterance.pitch = 0.95;
      speechSynthesis.speak(utterance);
    }
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#0a0d1a",
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = `future-you-${type}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        ref={cardRef}
        className={`p-6 md:p-8 rounded-2xl border ${config.borderClass} ${config.glowClass}`}
        style={{ background: config.gradient }}
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">{config.emoji}</span>
          <h3 className={`font-display text-xl tracking-wider ${config.color}`}>
            {config.label}
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">💰</span>
            <div>
              <p className="text-xs font-display tracking-wider uppercase text-muted-foreground">Projected Income</p>
              <p className="text-2xl font-bold text-foreground">{data.income}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl">📚</span>
            <div>
              <p className="text-xs font-display tracking-wider uppercase text-muted-foreground">Skill Evolution</p>
              <p className="text-foreground">{data.skills}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl">🏙️</span>
            <div>
              <p className="text-xs font-display tracking-wider uppercase text-muted-foreground">Lifestyle</p>
              <p className="text-foreground">{data.lifestyle}</p>
            </div>
          </div>
        </div>

        <blockquote className={`mt-6 pt-6 border-t border-border italic ${config.color} opacity-90 text-sm leading-relaxed`}>
          "{data.message}"
        </blockquote>

        <p className="mt-4 text-[10px] text-muted-foreground font-display tracking-widest text-right opacity-50">
          FUTURE YOU AI
        </p>
      </div>

      <div className="flex gap-2 mt-3">
        <Button variant="outline" size="sm" onClick={speakMessage} className="text-xs gap-1.5">
          <Volume2 className="h-3.5 w-3.5" /> Hear from Future You
        </Button>
        <Button variant="outline" size="sm" onClick={downloadCard} className="text-xs gap-1.5">
          <Download className="h-3.5 w-3.5" /> Share Card
        </Button>
      </div>
    </motion.div>
  );
}
