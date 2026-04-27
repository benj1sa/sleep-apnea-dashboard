"use client";

import { useState, useEffect } from "react";
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
import { Moon, TrendingUp, CheckCircle } from "lucide-react";

type Tab = "tonight" | "trend" | "results";

const TABS: { id: Tab; label: string; Icon: React.ElementType }[] = [
  { id: "tonight", label: "Tonight", Icon: Moon },
  { id: "trend", label: "Trend", Icon: TrendingUp },
  { id: "results", label: "Results", Icon: CheckCircle },
];

export default function DemoPage() {
  const [persona, setPersona] = useState<PersonaId>("mild");
  const [nightsCompleted, setNightsCompleted] = useState(7);
  const [activeTab, setActiveTab] = useState<Tab>("tonight");
  const [isCycling, setIsCycling] = useState(false);

  useEffect(() => {
    if (!isCycling) return;
    if (nightsCompleted >= ARC_LENGTH) {
      setActiveTab("results");
      const t = setTimeout(() => {
        setNightsCompleted(0);
        setActiveTab("tonight");
      }, 3000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setNightsCompleted((n) => n + 1);
    }, 1500);
    return () => clearTimeout(t);
  }, [isCycling, nightsCompleted]);

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
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-stone-900 tabular-nums">
                  {nightsCompleted}
                  <span className="font-normal text-stone-400"> / {ARC_LENGTH}</span>
                </span>
                <button
                  onClick={() => setIsCycling((c) => !c)}
                  title={isCycling ? "Pause auto-cycle" : "Start auto-cycle"}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isCycling
                      ? "bg-stone-900 text-white"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                  }`}
                >
                  {isCycling ? (
                    <svg width="8" height="9" viewBox="0 0 8 9" fill="currentColor">
                      <rect x="0" y="0" width="2.5" height="9" rx="1" />
                      <rect x="5.5" y="0" width="2.5" height="9" rx="1" />
                    </svg>
                  ) : (
                    <svg width="8" height="9" viewBox="0 0 8 9" fill="currentColor">
                      <path d="M1 0.5L8 4.5L1 8.5V0.5Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={ARC_LENGTH}
              value={nightsCompleted}
              onChange={(e) => setNightsCompleted(Number(e.target.value))}
              disabled={isCycling}
              className={`w-full accent-stone-900 ${isCycling ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
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
              {TABS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === id
                      ? "bg-stone-900 text-white"
                      : "text-stone-500 hover:bg-stone-50"
                  }`}
                >
                  {label}
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
              {TABS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex flex-col items-center gap-0.5 text-xs font-medium transition-colors px-4 py-1 ${
                    activeTab === id
                      ? "text-stone-900"
                      : "text-stone-400 hover:text-stone-700"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>
            <div className="flex justify-center pb-2">
              <div className="w-28 h-1 bg-stone-900 rounded-full opacity-20" />
            </div>
          </div>
        </div>

        <p className="text-xs text-stone-400">
          Interactive demo. No account required.
        </p>
      </div>
    </div>
  );
}
