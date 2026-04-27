import type { RiskTier, RiskTierEnum, CtaType } from "./types";
import { TIER_THRESHOLDS } from "./config";

interface TierDefinition {
  label: string;
  impactStatements: string[];
  ctaType: CtaType;
}

const TIER_DEFINITIONS: Record<RiskTierEnum, TierDefinition> = {
  none: {
    label: "None detected",
    impactStatements: [
      "Your breathing patterns during sleep look normal.",
      "Good sleep architecture is likely supporting your energy and focus.",
      "No signs of disrupted breathing detected.",
    ],
    ctaType: "none",
  },
  mild: {
    label: "Mild patterns",
    impactStatements: [
      "Some irregular breathing events detected during sleep.",
      "Daytime energy may be affected.",
      "Worth discussing with a doctor.",
    ],
    ctaType: "telehealth",
  },
  moderate: {
    label: "Moderate patterns",
    impactStatements: [
      "Consistent breathing disruptions detected. Worth looking into.",
      "Energy and concentration",
      "Cardiovascular health over time",
      "Driving alertness",
    ],
    ctaType: "telehealth",
  },
  significant: {
    label: "Significant patterns",
    impactStatements: [
      "Frequent breathing disruptions detected. A doctor should review this.",
      "This level of breathing disruption is associated with fatigue, heart strain, and reduced oxygen.",
      "Effective treatments exist — this is manageable.",
    ],
    ctaType: "urgent",
  },
};

function scoreTotier(score: number): RiskTierEnum {
  if (score >= TIER_THRESHOLDS.significant) return "significant";
  if (score >= TIER_THRESHOLDS.moderate) return "moderate";
  if (score >= TIER_THRESHOLDS.mild) return "mild";
  return "none";
}

export function classifyRiskTier(averageScore: number): RiskTier {
  const tier = scoreTotier(averageScore);
  const { label, impactStatements, ctaType } = TIER_DEFINITIONS[tier];
  return { tier, label, impactStatements, ctaType };
}
