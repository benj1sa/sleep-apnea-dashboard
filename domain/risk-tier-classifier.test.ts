import { describe, it, expect } from "vitest";
import { classifyRiskTier } from "./risk-tier-classifier";
import { TIER_THRESHOLDS } from "./config";

describe("RiskTierClassifier", () => {
  // --- tier boundaries ---
  it("classifies score below mild threshold as none", () => {
    const result = classifyRiskTier(TIER_THRESHOLDS.mild - 0.1);
    expect(result.tier).toBe("none");
  });

  it("classifies score at the mild threshold as mild", () => {
    const result = classifyRiskTier(TIER_THRESHOLDS.mild);
    expect(result.tier).toBe("mild");
  });

  it("classifies score between mild and moderate as mild", () => {
    const result = classifyRiskTier(10);
    expect(result.tier).toBe("mild");
  });

  it("classifies score at the moderate threshold as moderate", () => {
    const result = classifyRiskTier(TIER_THRESHOLDS.moderate);
    expect(result.tier).toBe("moderate");
  });

  it("classifies score between moderate and significant as moderate", () => {
    const result = classifyRiskTier(20);
    expect(result.tier).toBe("moderate");
  });

  it("classifies score at the significant threshold as significant", () => {
    const result = classifyRiskTier(TIER_THRESHOLDS.significant);
    expect(result.tier).toBe("significant");
  });

  it("classifies score above significant threshold as significant", () => {
    const result = classifyRiskTier(40);
    expect(result.tier).toBe("significant");
  });

  // --- ctaType by tier ---
  it("returns ctaType none for tier none", () => {
    expect(classifyRiskTier(1).ctaType).toBe("none");
  });

  it("returns ctaType telehealth for tier mild", () => {
    expect(classifyRiskTier(10).ctaType).toBe("telehealth");
  });

  it("returns ctaType telehealth for tier moderate", () => {
    expect(classifyRiskTier(20).ctaType).toBe("telehealth");
  });

  it("returns ctaType urgent for tier significant", () => {
    expect(classifyRiskTier(35).ctaType).toBe("urgent");
  });

  // --- required fields ---
  it("always returns a non-empty label", () => {
    const tiers = [1, 10, 20, 35];
    for (const score of tiers) {
      expect(classifyRiskTier(score).label.length).toBeGreaterThan(0);
    }
  });

  it("always returns at least one impact statement", () => {
    const tiers = [1, 10, 20, 35];
    for (const score of tiers) {
      expect(classifyRiskTier(score).impactStatements.length).toBeGreaterThan(0);
    }
  });

  // --- wellness framing: no medical diagnosis language ---
  it("does not contain the phrase 'sleep apnea' in any label or impact statement", () => {
    const scores = [1, 10, 20, 35];
    for (const score of scores) {
      const result = classifyRiskTier(score);
      const allCopy = [result.label, ...result.impactStatements].join(" ").toLowerCase();
      expect(allCopy).not.toContain("sleep apnea");
    }
  });

  it("does not contain the word 'diagnosis' in any copy", () => {
    const scores = [1, 10, 20, 35];
    for (const score of scores) {
      const result = classifyRiskTier(score);
      const allCopy = [result.label, ...result.impactStatements].join(" ").toLowerCase();
      expect(allCopy).not.toContain("diagnosis");
    }
  });
});
