import { describe, it, expect } from "vitest";
import { aggregateTrend } from "./trend-aggregator";
import { TIER_THRESHOLDS, TREND_DELTA } from "./config";
import type { NightScore } from "./types";

const makeNight = (
  date: string,
  ahiEquivalent: number,
  overrides: Partial<NightScore> = {}
): NightScore => ({
  date,
  ahiEquivalent,
  confidence: 0.9,
  dataQuality: "good",
  cpapUsed: false,
  ...overrides,
});

describe("TrendAggregator", () => {
  // --- tracer bullet ---
  it("returns a 14-night average for a complete arc", () => {
    const nights = Array.from({ length: 14 }, (_, i) =>
      makeNight(`2024-01-${String(i + 1).padStart(2, "0")}`, 10)
    );
    const result = aggregateTrend(nights);
    expect(result.fourteenNightAverage).toBeCloseTo(10);
  });

  // --- rolling average ---
  it("returns null for the first two rolling average positions", () => {
    const nights = [
      makeNight("2024-01-01", 10),
      makeNight("2024-01-02", 12),
      makeNight("2024-01-03", 14),
    ];
    const result = aggregateTrend(nights);
    expect(result.rollingAverage[0]).toBeNull();
    expect(result.rollingAverage[1]).toBeNull();
  });

  it("computes a 3-night rolling average from night 3 onward", () => {
    const nights = [
      makeNight("2024-01-01", 9),
      makeNight("2024-01-02", 12),
      makeNight("2024-01-03", 15),
      makeNight("2024-01-04", 6),
    ];
    const result = aggregateTrend(nights);
    expect(result.rollingAverage[2]).toBeCloseTo((9 + 12 + 15) / 3);
    expect(result.rollingAverage[3]).toBeCloseTo((12 + 15 + 6) / 3);
  });

  // --- trend direction ---
  it("returns stable when fewer than 6 nights", () => {
    const nights = Array.from({ length: 5 }, (_, i) =>
      makeNight(`2024-01-${String(i + 1).padStart(2, "0")}`, 20)
    );
    expect(aggregateTrend(nights).trendDirection).toBe("stable");
  });

  it("returns improving when last-3 avg is lower than first-3 by more than delta", () => {
    const nights = [
      makeNight("2024-01-01", 20),
      makeNight("2024-01-02", 20),
      makeNight("2024-01-03", 20),
      makeNight("2024-01-04", 12),
      makeNight("2024-01-05", 12),
      makeNight("2024-01-06", 12),
    ];
    // first-3 avg = 20, last-3 avg = 12, diff = -8 (< -5) → improving
    expect(aggregateTrend(nights).trendDirection).toBe("improving");
  });

  it("returns worsening when last-3 avg is higher than first-3 by more than delta", () => {
    const nights = [
      makeNight("2024-01-01", 10),
      makeNight("2024-01-02", 10),
      makeNight("2024-01-03", 10),
      makeNight("2024-01-04", 18),
      makeNight("2024-01-05", 18),
      makeNight("2024-01-06", 18),
    ];
    // first-3 avg = 10, last-3 avg = 18, diff = +8 (> +5) → worsening
    expect(aggregateTrend(nights).trendDirection).toBe("worsening");
  });

  it("returns stable when last-3 vs first-3 difference is within delta", () => {
    const nights = [
      makeNight("2024-01-01", 10),
      makeNight("2024-01-02", 10),
      makeNight("2024-01-03", 10),
      makeNight("2024-01-04", 13),
      makeNight("2024-01-05", 13),
      makeNight("2024-01-06", 13),
    ];
    // diff = +3 (within ±5) → stable
    expect(aggregateTrend(nights).trendDirection).toBe("stable");
  });

  // --- CPAP split ---
  it("computes cpapOnAverage and cpapOffAverage correctly", () => {
    const nights = [
      makeNight("2024-01-01", 20, { cpapUsed: false }),
      makeNight("2024-01-02", 8, { cpapUsed: true }),
      makeNight("2024-01-03", 18, { cpapUsed: false }),
      makeNight("2024-01-04", 6, { cpapUsed: true }),
    ];
    const result = aggregateTrend(nights);
    expect(result.cpapOnAverage).toBeCloseTo((8 + 6) / 2);
    expect(result.cpapOffAverage).toBeCloseTo((20 + 18) / 2);
  });

  it("returns null cpapOnAverage when no nights with CPAP", () => {
    const nights = [makeNight("2024-01-01", 10), makeNight("2024-01-02", 12)];
    expect(aggregateTrend(nights).cpapOnAverage).toBeNull();
  });

  // --- edge cases ---
  it("handles a single night without crashing", () => {
    const nights = [makeNight("2024-01-01", 14)];
    const result = aggregateTrend(nights);
    expect(result.fourteenNightAverage).toBeCloseTo(14);
    expect(result.rollingAverage).toHaveLength(1);
    expect(result.rollingAverage[0]).toBeNull();
    expect(result.trendDirection).toBe("stable");
  });

  it("rollingAverage array length matches nights array length", () => {
    const nights = Array.from({ length: 9 }, (_, i) =>
      makeNight(`2024-01-${String(i + 1).padStart(2, "0")}`, 10)
    );
    const result = aggregateTrend(nights);
    expect(result.rollingAverage).toHaveLength(9);
  });
});
