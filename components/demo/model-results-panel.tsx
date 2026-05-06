"use client";

import { useMemo, useState } from "react";
import rawCombinedResults from "@/domain/model_results_combined.json";
import {
  buildModelResultsDataset,
  downsampleSegments,
  type ModelParticipantResult,
} from "@/domain/model-results";

const CARD_TONE: Record<
  ModelParticipantResult["callDirection"],
  { label: string; className: string; icon: string }
> = {
  over: {
    label: "Over-call",
    className: "bg-amber-50 text-amber-900 border-amber-100",
    icon: "↑",
  },
  under: {
    label: "Under-call",
    className: "bg-amber-50 text-amber-900 border-amber-100",
    icon: "↓",
  },
  match: {
    label: "Tier match",
    className: "bg-emerald-50 text-emerald-900 border-emerald-100",
    icon: "✓",
  },
};

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function formatAhi(value: number): string {
  return value.toFixed(1);
}

function SegmentRow({ label, sequence }: { label: "True" | "Pred"; sequence: string }) {
  const downsampled = useMemo(() => downsampleSegments(sequence), [sequence]);

  return (
    <div className="flex items-center gap-2">
      <span className="w-8 text-[11px] font-medium text-stone-600">{label}</span>
      <div className="grid h-4 flex-1 overflow-hidden rounded-md border border-stone-200 bg-stone-100">
        <div
          className="h-full w-full"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${downsampled.length}, minmax(0, 1fr))`,
          }}
        >
          {Array.from(downsampled).map((segment, idx) => (
            <span
              key={`${label}-${idx}`}
              className={segment === "A" ? "bg-[#d84b4b]" : "bg-[#53b36a]"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ModelResultsPanel() {
  const dataset = useMemo(() => buildModelResultsDataset(rawCombinedResults), []);
  const [activeModelId, setActiveModelId] = useState<string>(dataset.models[0]?.modelId ?? "");

  const activeModel =
    dataset.models.find((model) => model.modelId === activeModelId) ?? dataset.models[0];

  if (!activeModel) {
    return null;
  }

  return (
    <section className="w-[540px] h-[760px] rounded-2xl border border-stone-300 bg-[#f7f4ee] shadow-sm flex flex-col">
      <header className="border-b border-stone-200 p-4">
        {dataset.skippedRecords > 0 && (
          <p className="mb-3 text-[11px] text-stone-500">
            {dataset.skippedRecords} records skipped due to missing fields
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {dataset.models.map((model) => (
            <button
              key={model.modelId}
              onClick={() => setActiveModelId(model.modelId)}
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeModel.modelId === model.modelId
                  ? "border-stone-900 bg-stone-900 text-stone-100"
                  : "border-stone-300 bg-white text-stone-700 hover:bg-stone-100"
              }`}
            >
              {model.label}
            </button>
          ))}
        </div>

      </header>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {activeModel.participants.map((participant) => {
          const tone = CARD_TONE[participant.callDirection];
          return (
            <article
              key={`${activeModel.modelId}-${participant.participantId}`}
              className="overflow-hidden rounded-xl border border-stone-200 bg-white"
            >
              <div className={`border-b px-3 py-2 text-sm font-medium ${tone.className}`}>
                {tone.icon} {tone.label} — true {participant.trueTier}, predicted {participant.predTier}
              </div>

              <div className="space-y-3 p-3">
                <div className="flex items-start justify-between">
                  <p className="text-lg font-semibold text-stone-900">{participant.displayId}</p>
                  <div className="grid grid-cols-2 gap-4 text-right">
                    <div>
                      <p className="text-xl font-semibold text-stone-900">
                        {formatAhi(participant.trueAhi)}
                      </p>
                      <p className="text-[10px] uppercase tracking-wide text-stone-500">true AHI</p>
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-stone-900">
                        {formatAhi(participant.predAhi)}
                      </p>
                      <p className="text-[10px] uppercase tracking-wide text-stone-500">
                        predicted AHI
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-stone-600">
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#53b36a]" />
                    No apnea
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#d84b4b]" />
                    Apnea
                  </span>
                </div>

                <div className="space-y-2">
                  <SegmentRow label="True" sequence={participant.trueStr} />
                  <SegmentRow label="Pred" sequence={participant.predStr} />
                </div>

              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
