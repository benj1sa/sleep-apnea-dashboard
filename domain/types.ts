export type DataQuality = "good" | "partial" | "poor";

export type TrendDirection = "improving" | "stable" | "worsening";

export type RiskTierEnum = "none" | "mild" | "moderate" | "significant";

export type CtaType = "none" | "telehealth" | "urgent";

export interface NightScore {
  date: string; // ISO date string "YYYY-MM-DD"
  ahiEquivalent: number;
  confidence: number;
  dataQuality: DataQuality;
  cpapUsed: boolean;
}

export interface TrendSummary {
  nights: NightScore[];
  rollingAverage: (number | null)[];
  fourteenNightAverage: number;
  trendDirection: TrendDirection;
  cpapOnAverage: number | null;
  cpapOffAverage: number | null;
}

export interface RiskTier {
  tier: RiskTierEnum;
  label: string;
  impactStatements: string[];
  ctaType: CtaType;
}
