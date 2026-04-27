import type { NightScore } from "@/domain/types";

export type PersonaId = "healthy" | "mild" | "significant";

export interface Persona {
  id: PersonaId;
  label: string;
  description: string;
  ahiValues: number[];
}

export const PERSONAS: Persona[] = [
  {
    id: "healthy",
    label: "Healthy Sleeper",
    description: "Strong recovery, low disruption across all 14 nights",
    ahiValues: [1.5, 2.0, 1.8, 2.5, 1.2, 2.2, 1.9, 2.1, 1.7, 2.3, 1.6, 2.0, 1.8, 1.9],
  },
  {
    id: "mild",
    label: "Mild Risk",
    description: "Some disruption detected. Worth monitoring over time.",
    ahiValues: [6.2, 8.1, 9.0, 7.4, 10.2, 8.5, 9.1, 7.2, 8.4, 9.3, 8.0, 7.8, 8.6, 9.2],
  },
  {
    id: "significant",
    label: "Significant Risk",
    description: "Elevated breathing events. Results recommend clinical review.",
    ahiValues: [30.5, 32.1, 35.8, 31.2, 38.4, 33.7, 36.2, 30.8, 34.5, 37.1, 31.9, 35.3, 33.0, 38.5],
  },
];

const CONFIDENCE_VALUES = [
  0.91, 0.87, 0.93, 0.88, 0.95, 0.90, 0.86, 0.92, 0.89, 0.94, 0.88, 0.91,
  0.87, 0.93,
];

// Fixed anchor date keeps generated dates deterministic across renders.
// Night 0 = today; each subsequent night steps one day into the future.
const ANCHOR_DATE = "2026-04-26";

export function generateNights(persona: PersonaId, count: number): NightScore[] {
  const p = PERSONAS.find((p) => p.id === persona)!;
  const anchor = new Date(ANCHOR_DATE);

  return Array.from({ length: count }, (_, i) => {
    const date = new Date(anchor);
    date.setDate(date.getDate() + i);

    return {
      date: date.toISOString().split("T")[0],
      ahiEquivalent: p.ahiValues[i],
      confidence: CONFIDENCE_VALUES[i],
      dataQuality: "good" as const,
      cpapUsed: false,
    };
  });
}

export interface NarrationStep {
  min: number;
  max: number;
  title: string;
  body: string;
}

export const NARRATION_STEPS: NarrationStep[] = [
  {
    min: 0,
    max: 0,
    title: "Day one",
    body: "The watch is connected. The app is ready and waiting for the first night of sleep data to come in.",
  },
  {
    min: 1,
    max: 2,
    title: "First nights in",
    body: "Your first nights are being recorded. Keep wearing the watch so the app can start spotting patterns.",
  },
  {
    min: 3,
    max: 5,
    title: "Early picture forming",
    body: "The trend chart unlocks at night 3. Individual AHI scores start to plot and a rolling average begins to take shape.",
  },
  {
    min: 6,
    max: 13,
    title: "Building confidence",
    body: "You're halfway through. Night-to-night variation is smoothing out and a clear trend direction is starting to emerge.",
  },
  {
    min: 14,
    max: 14,
    title: "Arc complete",
    body: "14 nights of data unlock the full risk assessment. A sleep tier, impact statements, and personalised next steps are revealed.",
  },
];

export function getNarration(nightsCompleted: number): NarrationStep {
  return (
    NARRATION_STEPS.find(
      (n) => nightsCompleted >= n.min && nightsCompleted <= n.max
    ) ?? NARRATION_STEPS[NARRATION_STEPS.length - 1]
  );
}
