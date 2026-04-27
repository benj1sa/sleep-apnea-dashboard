import { createClient } from "@/lib/supabase/server";
import type { NightScore } from "@/domain/types";

interface NightScoreRow {
  date: string;
  ahi_equivalent: number;
  confidence: number;
  data_quality: string;
  cpap_used: boolean;
}

export async function getNightScores(limitDays = 14): Promise<NightScore[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("night_scores")
    .select("date, ahi_equivalent, confidence, data_quality, cpap_used")
    .eq("user_id", user.id)
    .order("date", { ascending: true })
    .limit(limitDays);

  if (error || !data) return [];

  return (data as NightScoreRow[]).map((row) => ({
    date: row.date,
    ahiEquivalent: Number(row.ahi_equivalent),
    confidence: Number(row.confidence),
    dataQuality: row.data_quality as NightScore["dataQuality"],
    cpapUsed: row.cpap_used,
  }));
}
