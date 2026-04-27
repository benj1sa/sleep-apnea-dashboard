import { getNightScores } from "@/lib/night-scores";
import { ARC_LENGTH } from "@/domain/config";
import { TonightView } from "@/components/views/tonight-view";

export default async function TonightPage() {
  const nights = await getNightScores(ARC_LENGTH);
  return <TonightView nights={nights} />;
}
