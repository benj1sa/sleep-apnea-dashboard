"use client";

import { useState } from "react";
import { TonightView } from "@/components/views/tonight-view";
import { TrendView } from "@/components/views/trend-view";
import { ResultsView } from "@/components/views/results-view";
import {
  PERSONAS,
  generateNights,
  getNarration,
} from "@/domain/demo-data";
import type { PersonaId } from "@/domain/demo-data";
import { ARC_LENGTH } from "@/domain/config";

type Tab = "tonight" | "trend" | "results";

const TABS: { id: Tab; label: string }[] = [
  { id: "tonight", label: "Tonight" },
  { id: "trend", label: "Trend" },
  { id: "results", label: "Results" },
];

export default function DemoPage() {
  const [persona, setPersona] = useState<PersonaId>("mild");
  const [nightsCompleted, setNightsCompleted] = useState(7);
  const [activeTab, setActiveTab] = useState<Tab>("tonight");

  const nights = generateNights(persona, nightsCompleted);
  const narration = getNarration(nightsCompleted);

  return (
    <div className="min-h-screen flex items-start justify-center gap-8 p-10 pt-12">
      {/* ── Sidebar ── */}
      <aside className="w-56 flex-shrink-0 sticky top-12">
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          {/* Persona */}
          <div className="p-4 space-y-2.5">
            <p className="text-xs text-stone-400 font-medium">User</p>
            <div className="space-y-1.5">
              {PERSONAS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPersona(p.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${
                    persona === p.id
                      ? "bg-stone-900 text-white"
                      : "text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  <p className="font-medium leading-tight">{p.label}</p>
                  <p
                    className={`text-xs mt-0.5 leading-snug ${
                      persona === p.id ? "text-stone-400" : "text-stone-400"
                    }`}
                  >
                    {p.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-stone-100" />

          {/* Nights slider */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-stone-400 font-medium">Nights</p>
              <span className="text-sm font-bold text-stone-900 tabular-nums">
                {nightsCompleted}
                <span className="font-normal text-stone-400"> / {ARC_LENGTH}</span>
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={ARC_LENGTH}
              value={nightsCompleted}
              onChange={(e) => setNightsCompleted(Number(e.target.value))}
              className="w-full accent-stone-900 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-stone-300">
              <span>0</span>
              <span>{ARC_LENGTH}</span>
            </div>
          </div>

          <div className="border-t border-stone-100" />

          {/* Screen switcher */}
          <div className="p-4 space-y-2.5">
            <p className="text-xs text-stone-400 font-medium">Screen</p>
            <div className="flex gap-1.5">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-stone-900 text-white"
                      : "text-stone-500 hover:bg-stone-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-stone-100" />

          {/* Narration */}
          <div className="p-4 space-y-1.5">
            <p className="text-xs font-semibold text-stone-900">
              {narration.title}
            </p>
            <p className="text-xs text-stone-500 leading-relaxed">
              {narration.body}
            </p>
          </div>
        </div>

        <a
          href="/auth/login"
          className="block text-center text-xs text-stone-400 hover:text-stone-600 transition-colors mt-4"
        >
          Sign in to your account ›
        </a>
      </aside>

      {/* ── App preview ── */}
      <div className="flex-shrink-0 flex flex-col items-center gap-3">
        <div
          className="relative bg-[#F5F3EF] rounded-[32px] shadow-xl overflow-hidden flex flex-col"
          style={{ width: 375, height: 760 }}
        >
          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20">
            {activeTab === "tonight" && <TonightView nights={nights} />}
            {activeTab === "trend" && <TrendView nights={nights} />}
            {activeTab === "results" && <ResultsView nights={nights} />}
          </div>

          {/* Bottom nav */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-stone-200 bg-white/95 backdrop-blur-sm">
            <div className="flex items-center justify-around py-3">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-0.5 text-xs font-medium transition-colors px-4 py-1 ${
                    activeTab === tab.id
                      ? "text-stone-900"
                      : "text-stone-400 hover:text-stone-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex justify-center pb-2">
              <div className="w-28 h-1 bg-stone-900 rounded-full opacity-20" />
            </div>
          </div>
        </div>

        <p className="text-xs text-stone-400">
          Interactive demo — no account required
        </p>
      </div>
    </div>
  );
}
