import type { NightScore, RiskTierEnum } from "@/domain/types";
import { aggregateTrend } from "@/domain/trend-aggregator";
import { classifyRiskTier } from "@/domain/risk-tier-classifier";
import { ARC_LENGTH } from "@/domain/config";

const DISCLAIMER =
  "Sleep quality screening result only. Not a medical diagnosis. Consult a doctor if symptoms persist.";

export function ResultsView({ nights }: { nights: NightScore[] }) {
  if (nights.length < ARC_LENGTH) {
    return <IncompleteState nightsDone={nights.length} />;
  }

  const summary = aggregateTrend(nights);
  const tier = classifyRiskTier(summary.fourteenNightAverage);
  const avgSpO2 = Math.round(97 - summary.fourteenNightAverage * 0.08);

  return (
    <div className="px-5 pt-10 pb-6 space-y-6">
      <header className="space-y-1">
        <p className="text-sm text-stone-500">Based on {ARC_LENGTH} nights</p>
        <h1 className="text-2xl font-semibold text-stone-900">Your results</h1>
      </header>

      <TierDisplay
        tier={tier.tier}
        label={tier.label}
        avgScore={summary.fourteenNightAverage}
        avgSpO2={avgSpO2}
      />

      <ImpactList statements={tier.impactStatements} />

      <CTASection ctaType={tier.ctaType} />

      <p className="text-xs text-stone-400 leading-relaxed text-center px-2">
        {DISCLAIMER}
      </p>
    </div>
  );
}

function IncompleteState({ nightsDone }: { nightsDone: number }) {
  const left = ARC_LENGTH - nightsDone;
  return (
    <div className="px-5 pt-10 pb-6 space-y-4">
      <h1 className="text-2xl font-semibold text-stone-900">Your results</h1>
      <div className="rounded-2xl bg-white border border-stone-100 p-6 space-y-2 shadow-sm text-center">
        <p className="font-medium text-stone-700">
          Your full results unlock after night {ARC_LENGTH}
        </p>
        <p className="text-sm text-stone-400">
          {left} more night{left !== 1 ? "s" : ""} to go
        </p>
      </div>
    </div>
  );
}

const TIER_ORDER: RiskTierEnum[] = ["none", "mild", "moderate", "significant"];

const TIER_COLORS: Record<RiskTierEnum, string> = {
  none: "bg-emerald-500",
  mild: "bg-yellow-400",
  moderate: "bg-orange-400",
  significant: "bg-red-500",
};

const TIER_LABELS_SHORT: Record<RiskTierEnum, string> = {
  none: "None",
  mild: "Mild",
  moderate: "Moderate",
  significant: "Significant",
};

function TierDisplay({
  tier,
  label,
  avgScore,
  avgSpO2,
}: {
  tier: RiskTierEnum;
  label: string;
  avgScore: number;
  avgSpO2: number;
}) {
  return (
    <div className="rounded-2xl bg-white border border-stone-100 p-6 space-y-5 shadow-sm">
      <h2 className="text-4xl font-bold text-stone-900 leading-tight">
        {label}
      </h2>

      <div className="flex gap-1.5">
        {TIER_ORDER.map((t) => (
          <div key={t} className="flex-1 space-y-1">
            <div
              className={`h-2 rounded-full ${
                t === tier ? TIER_COLORS[t] : "bg-stone-200"
              }`}
            />
            <p
              className={`text-[10px] text-center ${
                t === tier ? "font-semibold text-stone-900" : "text-stone-400"
              }`}
            >
              {TIER_LABELS_SHORT[t]}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-6">
        <div>
          <p className="text-2xl font-bold text-stone-900">
            {avgScore.toFixed(1)}
          </p>
          <p className="text-xs text-stone-400">avg score</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-stone-900">{avgSpO2}%</p>
          <p className="text-xs text-stone-400">avg SpO₂</p>
        </div>
      </div>
    </div>
  );
}

function ImpactList({ statements }: { statements: string[] }) {
  return (
    <div className="rounded-2xl bg-white border border-stone-100 p-6 space-y-3 shadow-sm">
      <p className="font-semibold text-stone-900 text-sm">
        What this means for you
      </p>
      <ul className="space-y-2">
        {statements.map((s, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-stone-400 flex-shrink-0" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CTASection({ ctaType }: { ctaType: string }) {
  if (ctaType === "none") {
    return (
      <button className="w-full border border-stone-200 text-stone-700 font-semibold text-sm py-3.5 rounded-2xl hover:bg-stone-50 transition-colors">
        Download report
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <button className="w-full bg-stone-900 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-stone-800 transition-colors">
        {ctaType === "urgent"
          ? "Book a telehealth consult now ›"
          : "Talk to a doctor ›"}
      </button>
      <button className="w-full border border-stone-200 text-stone-700 font-semibold text-sm py-3.5 rounded-2xl hover:bg-stone-50 transition-colors">
        Download report for your doctor
      </button>
    </div>
  );
}
