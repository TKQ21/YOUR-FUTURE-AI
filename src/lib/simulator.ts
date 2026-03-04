export interface SimulationInput {
  skills: string;
  effort: number;
  goal: string;
}

export interface TimelineResult {
  income: string;
  skills: string;
  lifestyle: string;
  message: string;
}

export interface SimulationResult {
  optimistic: TimelineResult;
  realistic: TimelineResult;
  lazy: TimelineResult;
}

function generateTimeline(
  type: "optimistic" | "realistic" | "lazy",
  skills: string,
  effort: number
): TimelineResult {
  const multiplier = type === "optimistic" ? 1.5 : type === "lazy" ? 0.6 : 1;
  const base = effort * 30000 + skills.length * 5000;

  const incomeVal = Math.floor(base * multiplier);
  const income = `₹${incomeVal.toLocaleString("en-IN")}/month`;

  const skillDescriptions = {
    optimistic: `Mastered ${skills}, building innovative projects & mentoring others`,
    realistic: `Strong proficiency in ${skills}, consistently delivering quality work`,
    lazy: `Basic familiarity with ${skills}, still watching tutorials`,
  };

  const lifestyleDescriptions = {
    optimistic: "High-status, disciplined life — respected by peers, traveling, investing",
    realistic: "Stable, balanced life — good job, steady growth, comfortable",
    lazy: "Comfort zone lifestyle — scrolling reels, dreaming but not doing",
  };

  const messages = {
    optimistic:
      "You pushed harder than fear. Every 5 AM alarm, every 'no' to distraction — it built this. I'm proud of you.",
    realistic:
      "Consistency quietly changed everything. You didn't go viral, you just didn't quit. That's rarer than talent.",
    lazy:
      "You stayed comfortable. You know deep down you could do more. The potential is still there — but time isn't infinite.",
  };

  return {
    income,
    skills: skillDescriptions[type],
    lifestyle: lifestyleDescriptions[type],
    message: messages[type],
  };
}

export function simulateFuture(input: SimulationInput): SimulationResult {
  const { skills, effort, goal } = input;
  return {
    optimistic: generateTimeline("optimistic", skills, effort),
    realistic: generateTimeline("realistic", skills, effort),
    lazy: generateTimeline("lazy", skills, effort),
  };
}
