// app/actions/predict.ts
"use server";
import { createClient } from "@/lib/supabase/server";

export async function runPrediction(features: number[], userId: string) {
  const res = await fetch(process.env.ML_SERVICE_URL + "/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ features }),
  });

  const { prediction, probability } = await res.json();

//   // Optionally log to Supabase
//   const supabase = createClient();
//   await supabase.from("predictions").insert({
//     user_id: userId,
//     features,
//     prediction,
//     probability,
//     created_at: new Date().toISOString(),
//   });

  return { prediction, probability };
}