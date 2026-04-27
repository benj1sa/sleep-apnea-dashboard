import type { NightScore } from "@/domain/types";
import { ARC_LENGTH } from "@/domain/config";

export function TonightView({ nights }: { nights: NightScore[] }) {
  const nightsCompleted = nights.length;
  const nightsLeft = Math.max(0, ARC_LENGTH - nightsCompleted);

  return (
    <div className="px-5 pt-10 pb-6 space-y-6">
      <header className="space-y-1">
        <p className="text-sm text-stone-500">
          Night {nightsCompleted} of {ARC_LENGTH}
        </p>
        <h1 className="text-2xl font-semibold text-stone-900">Your sleep</h1>
      </header>

      {nightsCompleted === 0 ? (
        <EmptyState />
      ) : (
        <ProgressState completed={nightsCompleted} left={nightsLeft} />
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl bg-white border border-stone-100 p-6 space-y-4 shadow-sm">
      <ProgressRing completed={0} total={ARC_LENGTH} />
      <div className="space-y-1">
        <p className="font-semibold text-stone-900">First night complete</p>
        <p className="text-sm text-stone-500">
          Wear your watch to bed tonight. We&apos;ll have your first data point
          by morning.
        </p>
      </div>
    </div>
  );
}

function ProgressState({
  completed,
  left,
}: {
  completed: number;
  left: number;
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white border border-stone-100 p-6 space-y-4 shadow-sm">
        <ProgressRing completed={completed} total={ARC_LENGTH} />
        {left > 0 ? (
          <p className="text-sm text-stone-500">
            {left} more night{left !== 1 ? "s" : ""} builds a reliable picture.
            Come back tomorrow.
          </p>
        ) : (
          <p className="text-sm text-stone-600 font-medium">
            14 nights complete — your results are ready.
          </p>
        )}
      </div>
    </div>
  );
}

function ProgressRing({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progress = (completed / total) * circumference;

  return (
    <div className="flex items-center gap-4">
      <svg width="88" height="88" className="-rotate-90">
        <circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke="#E7E5E4"
          strokeWidth="8"
        />
        <circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke="#1C1917"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
        />
      </svg>
      <div>
        <p className="text-3xl font-bold text-stone-900">{completed}</p>
        <p className="text-sm text-stone-400">of {total} nights</p>
      </div>
    </div>
  );
}
