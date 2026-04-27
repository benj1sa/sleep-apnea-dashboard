"use client";

import type { NightScore } from "@/domain/types";
import { aggregateTrend } from "@/domain/trend-aggregator";
import { TrendChart } from "@/components/trend-chart";
import { ARC_LENGTH } from "@/domain/config";

export function TrendView({ nights }: { nights: NightScore[] }) {
  const summary = aggregateTrend(nights);
  const { fourteenNightAverage, trendDirection, nights: scoredNights } = summary;
  const nightsLeft = Math.max(0, ARC_LENGTH - scoredNights.length);
  const isComplete = scoredNights.length >= ARC_LENGTH;

  return (
    <div className="px-5 pt-10 pb-6 space-y-6">
      <header className="space-y-1">
        <p className="text-sm text-stone-500">
          {isComplete
            ? "14 nights complete"
            : `Night ${scoredNights.length} of ${ARC_LENGTH} · ${nightsLeft} left`}
        </p>
        <h1 className="text-2xl font-semibold text-stone-900">Your sleep</h1>
      </header>

      {scoredNights.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="nights done" value={String(scoredNights.length)} />
          <StatCard label="avg so far" value={fourteenNightAverage.toFixed(1)} />
          <StatCard label="nights left" value={String(nightsLeft)} />
        </div>
      )}

      <div className="rounded-2xl bg-white border border-stone-100 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-stone-700">14-night trend</p>
          {scoredNights.length >= 6 && (
            <TrendBadge direction={trendDirection} />
          )}
        </div>
        <TrendChart summary={summary} />
        <p className="text-xs text-stone-400 text-center">
          Tap a bar to see night detail
        </p>
      </div>

      {isComplete && (
        <div className="rounded-2xl bg-stone-900 text-white p-6 space-y-3">
          <p className="font-semibold">14 nights complete</p>
          <p className="text-sm text-stone-300">
            Your full picture is ready. See what your sleep score means and what
            to do next.
          </p>
          <a
            href="/dashboard/results"
            className="block text-center bg-white text-stone-900 font-semibold text-sm py-3 rounded-xl mt-2"
          >
            See your results ›
          </a>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white border border-stone-100 p-3 text-center shadow-sm">
      <p className="text-2xl font-bold text-stone-900">{value}</p>
      <p className="text-xs text-stone-400">{label}</p>
    </div>
  );
}

function TrendBadge({ direction }: { direction: string }) {
  const styles = {
    improving: "bg-emerald-50 text-emerald-700",
    worsening: "bg-amber-50 text-amber-700",
    stable: "bg-stone-100 text-stone-500",
  } as Record<string, string>;

  const labels = {
    improving: "↓ Improving",
    worsening: "↑ Worsening",
    stable: "→ Stable",
  } as Record<string, string>;

  return (
    <span
      className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[direction] ?? styles.stable}`}
    >
      {labels[direction] ?? "Stable"}
    </span>
  );
}
