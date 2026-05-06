"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { TonightView } from "@/components/views/tonight-view";
import { TrendView } from "@/components/views/trend-view";
import { ResultsView } from "@/components/views/results-view";
import { ModelResultsPanel } from "@/components/demo/model-results-panel";
import {
  PERSONAS,
  generateNights,
  getNarration,
} from "@/domain/demo-data";
import type { PersonaId } from "@/domain/demo-data";
import { ARC_LENGTH } from "@/domain/config";
import { Moon, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import styles from "./demo.module.css";

type Tab = "tonight" | "trend" | "results";

const TABS: { id: Tab; label: string; Icon: React.ElementType }[] = [
  { id: "tonight", label: "Tonight", Icon: Moon },
  { id: "trend", label: "Trend", Icon: TrendingUp },
  { id: "results", label: "Results", Icon: CheckCircle },
];

const SECTION_TITLE_CLASS = "text-[1.05rem] font-semibold tracking-tight text-[#1c1917]";
const SECTION_SUBTITLE_CLASS = "mt-1 text-[0.78rem] text-[#8a847c]";
const SECTION_FOOTNOTE_CLASS = "text-[0.72rem] tracking-[0.06em] text-[#8a847c]";

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

    setActiveTab(nightsCompleted > 4 ? "trend" : "tonight");

    const t = setTimeout(() => {
      setNightsCompleted((n) => Math.min(n + 1, ARC_LENGTH));
    }, 1500);
    return () => clearTimeout(t);
  }, [isCycling, nightsCompleted]);

  const nights = generateNights(persona, nightsCompleted);
  const narration = getNarration(nightsCompleted);

  return (
    <div className={styles.page}>
      <div className={styles.bgWord}>Sleep</div>

      <header className={styles.header}>
        <Link href="/" className={styles.logoMark}>
          <span className={styles.logoDot} />
          <span className={styles.logoText}>SleepSense</span>
        </Link>
      </header>

      <div className={`${styles.main} flex items-start justify-center gap-8 p-10 pt-10`}>
        {/* ── Sidebar ── */}
        <aside className="order-2 w-56 flex-shrink-0 sticky top-10 mt-16">
          <div className="bg-white rounded-2xl border border-[rgba(28,25,23,0.12)] shadow-sm overflow-hidden">
            {/* Persona */}
            <div className="p-4 space-y-2.5">
              <p className="text-xs text-[#8a847c] font-medium tracking-wide uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.1em' }}>User</p>
              <div className="space-y-1.5">
                {PERSONAS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPersona(p.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${
                      persona === p.id
                        ? "bg-[#1c1917] text-[#f2ede4]"
                        : "text-[#1c1917] hover:bg-[#f2ede4]"
                    }`}
                  >
                    <p className="font-medium leading-tight">{p.label}</p>
                    <p className="text-xs mt-0.5 leading-snug text-[#8a847c]">
                      {p.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[rgba(28,25,23,0.08)]" />

            {/* Nights slider */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[#8a847c] font-medium" style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Nights</p>
                <div className="flex items-center gap-2">
                  <span className={styles.nightsNum}>
                    {nightsCompleted}
                    <span className="text-[#8a847c]" style={{ fontFamily: 'var(--font-instrument)', fontSize: '0.8rem', fontWeight: 400 }}> / {ARC_LENGTH}</span>
                  </span>
                  <button
                    onClick={() => setIsCycling((c) => !c)}
                    title={isCycling ? "Pause auto-cycle" : "Start auto-cycle"}
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isCycling
                        ? "bg-[#3a6fd9] text-white"
                        : "bg-[#f2ede4] text-[#8a847c] hover:bg-[#e8e2d8]"
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
                className={`w-full accent-[#3a6fd9] ${isCycling ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
              />
              <div className="flex justify-between text-[#8a847c]" style={{ fontSize: '0.72rem' }}>
                <span>0</span>
                <span>{ARC_LENGTH}</span>
              </div>
            </div>

            <div className="border-t border-[rgba(28,25,23,0.08)]" />

            {/* Screen switcher */}
            <div className="p-4 space-y-2.5">
              <p className="text-[#8a847c] font-medium" style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Screen</p>
              <div className="flex gap-1.5">
                {TABS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeTab === id
                        ? "bg-[#1c1917] text-[#f2ede4]"
                        : "text-[#8a847c] hover:bg-[#f2ede4]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[rgba(28,25,23,0.08)]" />

            {/* Narration */}
            <div className="p-4 space-y-1.5">
              <p className="text-xs font-semibold text-[#1c1917]">
                {narration.title}
              </p>
              <p className="text-xs text-[#8a847c] leading-relaxed">
                {narration.body}
              </p>
            </div>
          </div>

          {/* <a
            href="/auth/login"
            className="block text-center mt-4 text-[#8a847c] hover:text-[#1c1917] transition-colors"
            style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}
          >
            Sign in to your account ›
          </a> */}
        </aside>

        <div className="order-1 flex items-start gap-8">
          {/* ── Desktop model results panel ── */}
          <section className="hidden lg:flex flex-col gap-3">
            <div>
              <h2 className={SECTION_TITLE_CLASS}>Model Outputs</h2>
              <p className={SECTION_SUBTITLE_CLASS}>Traditional ML + PyTorch predictions and tier-call narratives</p>
            </div>
            <ModelResultsPanel />
          </section>

          <div className="hidden lg:flex self-stretch items-center justify-center px-1">
            <div className="flex flex-col items-center gap-2 text-stone-400">
              <div className="h-12 w-px bg-stone-300/70" />
              <ArrowRight size={18} />
              <div className="h-12 w-px bg-stone-300/70" />
            </div>
          </div>

          {/* ── App preview ── */}
          <section className="flex-shrink-0 flex flex-col items-start gap-3">
            <div className="w-full">
              <h2 className={SECTION_TITLE_CLASS}>Application Demo</h2>
              <p className={SECTION_SUBTITLE_CLASS}>Interactive app preview and navigation flow</p>
            </div>
            <div
              className="relative self-center bg-[#F5F3EF] rounded-[32px] shadow-xl overflow-hidden flex flex-col"
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
                          ? "text-[#1c1917]"
                          : "text-stone-400 hover:text-stone-700"
                      }`}
                    >
                      <Icon size={18} />
                      {label}
                    </button>
                  ))}
                </div>
                <div className="flex justify-center pb-2">
                  <div className="w-28 h-1 bg-[#1c1917] rounded-full opacity-20" />
                </div>
              </div>
            </div>

            <p className={`${SECTION_FOOTNOTE_CLASS} self-center`}>
              Interactive demo · No account required
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
