import type { NightScore, TrendDirection, TrendSummary } from "./types";
import { ROLLING_WINDOW, MIN_NIGHTS_FOR_TREND, TREND_DELTA } from "./config";

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function computeRollingAverage(
  nights: NightScore[]
): (number | null)[] {
  return nights.map((_, i) => {
    if (i < ROLLING_WINDOW - 1) return null;
    const window = nights.slice(i - ROLLING_WINDOW + 1, i + 1);
    return average(window.map((n) => n.ahiEquivalent));
  });
}

function computeTrendDirection(nights: NightScore[]): TrendDirection {
  if (nights.length < MIN_NIGHTS_FOR_TREND) return "stable";
  const first3 = average(nights.slice(0, 3).map((n) => n.ahiEquivalent));
  const last3 = average(
    nights.slice(nights.length - 3).map((n) => n.ahiEquivalent)
  );
  const diff = last3 - first3;
  if (diff < -TREND_DELTA) return "improving";
  if (diff > TREND_DELTA) return "worsening";
  return "stable";
}

export function aggregateTrend(nights: NightScore[]): TrendSummary {
  const rollingAverage = computeRollingAverage(nights);
  const fourteenNightAverage = average(nights.map((n) => n.ahiEquivalent));
  const trendDirection = computeTrendDirection(nights);

  const cpapOn = nights.filter((n) => n.cpapUsed).map((n) => n.ahiEquivalent);
  const cpapOff = nights
    .filter((n) => !n.cpapUsed)
    .map((n) => n.ahiEquivalent);

  return {
    nights,
    rollingAverage,
    fourteenNightAverage,
    trendDirection,
    cpapOnAverage: cpapOn.length > 0 ? average(cpapOn) : null,
    cpapOffAverage: cpapOff.length > 0 ? average(cpapOff) : null,
  };
}
