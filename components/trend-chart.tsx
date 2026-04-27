"use client";

import { useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { TrendSummary, NightScore } from "@/domain/types";
import { MIN_NIGHTS_FOR_CHART } from "@/domain/config";

interface ChartRow {
  label: string;
  score: number;
  avg: number | null;
  night: NightScore;
}

interface NightDetailSheetProps {
  night: NightScore;
  onDismiss: () => void;
}

function NightDetailSheet({ night, onDismiss }: NightDetailSheetProps) {
  const wearHours = Math.round((night.confidence * 8 * 10) / 10);
  const spo2 = Math.round(97 - night.ahiEquivalent * 0.08);

  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onDismiss}>
      <div
        className="w-full max-w-md mx-auto bg-white rounded-t-3xl shadow-2xl p-6 space-y-5 pb-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-stone-900">
              Night {new Date(night.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} detail
            </p>
            <p className="text-xs text-stone-400">Tap bar to see</p>
          </div>
          <button
            onClick={onDismiss}
            className="text-stone-400 hover:text-stone-700 text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <Stat label="score" value={night.ahiEquivalent.toFixed(1)} />
          <Stat label="hrs worn" value={`${wearHours}h`} />
          <Stat label="avg SpO₂" value={`${spo2}%`} />
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-stone-900 text-sm">What happened</p>
          <p className="text-sm text-stone-600 leading-relaxed">
            {night.ahiEquivalent > 15
              ? "More breathing events than average. This is within normal night-to-night variation."
              : night.ahiEquivalent > 5
              ? "A typical night with some variation in breathing rhythm. Nothing unusual."
              : "A low-disruption night — breathing patterns were steady throughout."}
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-stone-900 text-sm">
            Compared to your average
          </p>
          <p className="text-xs text-stone-400">
            {night.dataQuality === "partial"
              ? "Partial data — device was worn for part of the night."
              : "Full night of data recorded."}
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-stone-50 rounded-xl p-3">
      <p className="text-lg font-bold text-stone-900">{value}</p>
      <p className="text-xs text-stone-400">{label}</p>
    </div>
  );
}

interface TrendChartProps {
  summary: TrendSummary;
}

export function TrendChart({ summary }: TrendChartProps) {
  const [selectedNight, setSelectedNight] = useState<NightScore | null>(null);
  const { nights, rollingAverage, fourteenNightAverage } = summary;

  const chartUnlocked = nights.length >= MIN_NIGHTS_FOR_CHART;

  const rows: ChartRow[] = nights.map((night, i) => ({
    label: `N${i + 1}`,
    score: night.ahiEquivalent,
    avg: rollingAverage[i],
    night,
  }));

  if (!chartUnlocked) {
    return (
      <div className="rounded-2xl bg-stone-50 border border-stone-100 p-6 text-center space-y-2">
        <p className="text-sm font-medium text-stone-600">
          Chart unlocks after 3 nights of data
        </p>
        <p className="text-xs text-stone-400">
          {nights.length} of {MIN_NIGHTS_FOR_CHART} nights recorded
        </p>
      </div>
    );
  }

  return (
    <>
      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart
          data={rows}
          margin={{ top: 8, right: 4, left: -24, bottom: 0 }}
        >
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "#A8A29E" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#A8A29E" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={() => null}
            cursor={{ fill: "transparent" }}
          />
          <ReferenceLine
            y={fourteenNightAverage}
            stroke="#A8A29E"
            strokeDasharray="4 4"
            strokeWidth={1.5}
          />
          <Bar
            dataKey="score"
            radius={[4, 4, 0, 0]}
            cursor="pointer"
            onClick={(data: unknown) => setSelectedNight((data as ChartRow).night)}
          >
            {rows.map((row, i) => (
              <Cell
                key={i}
                fill={
                  selectedNight?.date === row.night.date
                    ? "#1C1917"
                    : "#D6D3D1"
                }
              />
            ))}
          </Bar>
          <Line
            dataKey="avg"
            type="monotone"
            stroke="#1C1917"
            strokeWidth={2}
            dot={false}
            connectNulls={false}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {selectedNight && (
        <NightDetailSheet
          night={selectedNight}
          onDismiss={() => setSelectedNight(null)}
        />
      )}
    </>
  );
}
