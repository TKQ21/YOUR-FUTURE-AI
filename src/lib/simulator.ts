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
  effort: number,
  goal: string
): TimelineResult {
  // Realistic income bands for Indian + global remote market
  // Base: effort maps to ₹15k–₹80k range, skills add ₹5k–₹30k
  const skillCount = skills.split(",").map(s => s.trim()).filter(Boolean).length;
  const effortBase = effort <= 3 ? 15000 : effort <= 6 ? 35000 : effort <= 8 ? 55000 : 80000;
  const skillBonus = Math.min(skillCount * 8000, 40000);
  const base = effortBase + skillBonus;

  const multiplier = type === "optimistic" ? 1.6 : type === "lazy" ? 0.5 : 1;
  const incomeVal = Math.floor(base * multiplier);
  const income = `₹${incomeVal.toLocaleString("en-IN")}/mo`;

  const skillList = skills || "your current skills";

  const skillDescriptions: Record<typeof type, string> = {
    optimistic: `Deep expertise in ${skillList} — shipping production code, leading small teams, and mentoring juniors.`,
    realistic: `Solid working knowledge of ${skillList} — delivering consistently, learning on the job, growing steadily.`,
    lazy: `Surface-level familiarity with ${skillList} — enough to talk about, not enough to build with confidence.`,
  };

  const lifestyleDescriptions: Record<typeof type, string> = {
    optimistic: "Disciplined routine, financial breathing room, respected in your circle. You chose hard over easy — and it shows.",
    realistic: "Stable job, manageable stress, weekends that feel earned. Not glamorous, but genuinely good.",
    lazy: "Comfort zone is intact. Bills get paid, but ambition stays on the shelf. You scroll past people doing what you planned to do.",
  };

  const messages: Record<typeof type, string> = {
    optimistic:
      "Every 5 AM alarm you didn't snooze, every weekend you chose practice over distraction — it built this life. I'm not lucky. I'm you, but disciplined.",
    realistic:
      "You didn't go viral. You didn't burn out. You just kept showing up. That quiet consistency is rarer than talent — and it got you here.",
    lazy:
      "You're not broken. You just kept choosing comfort over growth. The potential is still in there — but time doesn't wait. Start today. Even now, it's not too late.",
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
    optimistic: generateTimeline("optimistic", skills, effort, goal),
    realistic: generateTimeline("realistic", skills, effort, goal),
    lazy: generateTimeline("lazy", skills, effort, goal),
  };
}
