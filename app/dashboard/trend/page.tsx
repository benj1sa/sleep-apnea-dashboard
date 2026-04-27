import { getNightScores } from "@/lib/night-scores";
import { ARC_LENGTH } from "@/domain/config";
import { TrendView } from "@/components/views/trend-view";

export default async function TrendPage() {
  const nights = await getNightScores(ARC_LENGTH);
  return <TrendView nights={nights} />;
}
