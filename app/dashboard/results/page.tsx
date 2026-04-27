import { getNightScores } from "@/lib/night-scores";
import { ARC_LENGTH } from "@/domain/config";
import { ResultsView } from "@/components/views/results-view";

export default async function ResultsPage() {
  const nights = await getNightScores(ARC_LENGTH);
  return <ResultsView nights={nights} />;
}
