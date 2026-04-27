export const TIER_THRESHOLDS = {
  mild: 5,
  moderate: 15,
  significant: 30,
} as const;

export const TREND_DELTA = 5.0;

export const ROLLING_WINDOW = 3;
export const MIN_NIGHTS_FOR_TREND = 6;
export const ARC_LENGTH = 14;
export const MIN_NIGHTS_FOR_CHART = 3;
