import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { SimulationInput } from "@/lib/simulator";

interface InputFormProps {
  onSimulate: (input: SimulationInput) => void;
  isLoading: boolean;
}

const InputForm = React.forwardRef<HTMLFormElement, InputFormProps>(
  ({ onSimulate, isLoading }, _ref) => {
    const [skills, setSkills] = useState("");
    const [effort, setEffort] = useState(5);
    const [goal, setGoal] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!skills.trim() || !goal.trim()) return;
      onSimulate({ skills: skills.trim(), effort, goal: goal.trim() });
    };

    return (
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-5 sm:p-6 md:p-8 rounded-2xl bg-card border border-border neon-glow-blue space-y-6"
      >
        <div className="space-y-2">
          <Label htmlFor="skills" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
            Your Current Skills
          </Label>
          <Input
            id="skills"
            placeholder="e.g. React, Python, Design..."
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="bg-muted border-border focus:neon-border-blue"
            required
          />
        </div>

        <div className="space-y-3">
          <Label className="text-xs font-display tracking-wider uppercase text-muted-foreground">
            Daily Effort Level: <span className="text-primary font-bold">{effort}/10</span>
          </Label>
          <Slider
            value={[effort]}
            onValueChange={(v) => setEffort(v[0])}
            min={1}
            max={10}
            step={1}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>😴 Minimal</span>
            <span>⚖️ Balanced</span>
            <span>🔥 Beast Mode</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="goal" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
            Career Goal
          </Label>
          <Input
            id="goal"
            placeholder="e.g. Senior Developer at a top company"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="bg-muted border-border focus:neon-border-blue"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading || !skills.trim() || !goal.trim()}
          className="w-full gradient-main text-primary-foreground font-display tracking-wider text-base sm:text-lg py-6 hover:opacity-90 transition-opacity"
          size="lg"
        >
          {isLoading ? (
            <span className="animate-pulse">Simulating your future…</span>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Simulate My Future
            </>
          )}
        </Button>
      </motion.form>
    );
  }
);

InputForm.displayName = "InputForm";

export default InputForm;
