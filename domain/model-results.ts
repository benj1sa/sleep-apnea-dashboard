const AHI_TIER_THRESHOLDS = {
  mild: 5,
  moderate: 15,
  severe: 30,
} as const;

const MODEL_LABEL_OVERRIDES: Record<string, string> = {
  rf_100w_pca_3: "Traditional ML - Random Forest",
  knn_3_pca_3: "Traditional ML - KNN",
  svm_rbf_univariate_5: "Traditional ML - SVM",
  best_apnea_cnn: "PyTorch - CNN",
  best_apnea_rnn: "PyTorch - RNN",
  best_apnea_lstm: "PyTorch - LSTM",
};

type TierLabel = "Normal" | "Mild" | "Moderate" | "Severe";
type CallDirection = "over" | "under" | "match";

export interface ModelParticipantResult {
  participantId: string;
  displayId: string;
  trueAhi: number;
  predAhi: number;
  ahiError: number;
  mcc: number;
  sensitivity: number;
  trueStr: string;
  predStr: string;
  trueTier: TierLabel;
  predTier: TierLabel;
  callDirection: CallDirection;
}

export interface ModelSummaryMetrics {
  avgMcc: number;
  avgSensitivity: number;
  tierMatchCount: number;
  totalCount: number;
  meanAhiError: number;
}

export interface ModelTabData {
  modelId: string;
  label: string;
  summary: ModelSummaryMetrics;
  participants: ModelParticipantResult[];
}

export interface ModelResultsDataset {
  models: ModelTabData[];
  skippedRecords: number;
}

interface ParsedModelRecord {
  participantId: string;
  modelId: string;
  trueAhi: number;
  predAhi: number;
  trueStr: string;
  predStr: string;
  sensitivity: number;
  mcc: number;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toNumber(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return value;
}

function parseConfusionMatrix(matrix: unknown): [number, number, number, number] | null {
  if (!Array.isArray(matrix) || matrix.length !== 2) return null;
  const row0 = matrix[0];
  const row1 = matrix[1];
  if (!Array.isArray(row0) || !Array.isArray(row1) || row0.length !== 2 || row1.length !== 2) {
    return null;
  }

  const tn = toNumber(row0[0]);
  const fp = toNumber(row0[1]);
  const fn = toNumber(row1[0]);
  const tp = toNumber(row1[1]);

  if (tn === null || fp === null || fn === null || tp === null) return null;
  return [tn, fp, fn, tp];
}

function computeMcc(tn: number, fp: number, fn: number, tp: number): number | null {
  const numerator = tp * tn - fp * fn;
  const denominator = Math.sqrt((tp + fp) * (tp + fn) * (tn + fp) * (tn + fn));
  if (denominator === 0) return null;
  return numerator / denominator;
}

function computeSensitivity(tn: number, fp: number, fn: number, tp: number): number | null {
  void tn;
  void fp;
  const denominator = tp + fn;
  if (denominator === 0) return null;
  return tp / denominator;
}

function deriveTier(ahi: number): TierLabel {
  if (ahi < AHI_TIER_THRESHOLDS.mild) return "Normal";
  if (ahi < AHI_TIER_THRESHOLDS.moderate) return "Mild";
  if (ahi < AHI_TIER_THRESHOLDS.severe) return "Moderate";
  return "Severe";
}

function deriveCallDirection(trueTier: TierLabel, predTier: TierLabel): CallDirection {
  const tierRank: Record<TierLabel, number> = {
    Normal: 0,
    Mild: 1,
    Moderate: 2,
    Severe: 3,
  };
  if (tierRank[predTier] > tierRank[trueTier]) return "over";
  if (tierRank[predTier] < tierRank[trueTier]) return "under";
  return "match";
}

function humanizeModelId(modelId: string): string {
  return modelId
    .split("_")
    .filter(Boolean)
    .map((part) => {
      if (/^\d+$/.test(part)) return part;
      return part.toUpperCase();
    })
    .join(" ");
}

function formatParticipantDisplayId(participantId: string): string {
  return `Patient #${participantId}`;
}

function parseModelRecord(
  participantId: string,
  modelId: string,
  value: unknown,
): ParsedModelRecord | null {
  if (!isObject(value)) return null;

  const trueAhi = toNumber(value.true_ahi);
  const predAhi = toNumber(value.pred_ahi);
  const trueStr = typeof value.true_str === "string" ? value.true_str : null;
  const predStr = typeof value.pred_str === "string" ? value.pred_str : null;
  const confusion = parseConfusionMatrix(value.confusion_matrix);

  if (trueAhi === null || predAhi === null || !trueStr || !predStr || confusion === null) {
    return null;
  }

  const [tn, fp, fn, tp] = confusion;
  const mcc = computeMcc(tn, fp, fn, tp);
  if (mcc === null) return null;

  let sensitivity: number | null = null;
  if (isObject(value.classification_report)) {
    const apneaMetrics = value.classification_report["1.0"];
    if (isObject(apneaMetrics)) {
      sensitivity = toNumber(apneaMetrics.recall);
    }
  }
  if (sensitivity === null) {
    sensitivity = computeSensitivity(tn, fp, fn, tp);
  }
  if (sensitivity === null) return null;

  return {
    participantId,
    modelId,
    trueAhi,
    predAhi,
    trueStr,
    predStr,
    sensitivity,
    mcc,
  };
}

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function buildModelResultsDataset(raw: unknown): ModelResultsDataset {
  const recordsByModel = new Map<string, ParsedModelRecord[]>();
  let skippedRecords = 0;

  if (!isObject(raw)) {
    return { models: [], skippedRecords: 1 };
  }

  for (const [participantId, participantValue] of Object.entries(raw)) {
    if (!isObject(participantValue)) {
      skippedRecords += 1;
      continue;
    }

    for (const [modelId, modelValue] of Object.entries(participantValue)) {
      const parsed = parseModelRecord(participantId, modelId, modelValue);
      if (!parsed) {
        skippedRecords += 1;
        continue;
      }

      if (!recordsByModel.has(modelId)) {
        recordsByModel.set(modelId, []);
      }
      recordsByModel.get(modelId)?.push(parsed);
    }
  }

  const models: ModelTabData[] = Array.from(recordsByModel.entries())
    .map(([modelId, records]) => {
      const participants: ModelParticipantResult[] = records
        .map((record) => {
          const trueTier = deriveTier(record.trueAhi);
          const predTier = deriveTier(record.predAhi);
          return {
            participantId: record.participantId,
            displayId: formatParticipantDisplayId(record.participantId),
            trueAhi: record.trueAhi,
            predAhi: record.predAhi,
            ahiError: Math.abs(record.predAhi - record.trueAhi),
            mcc: record.mcc,
            sensitivity: record.sensitivity,
            trueStr: record.trueStr,
            predStr: record.predStr,
            trueTier,
            predTier,
            callDirection: deriveCallDirection(trueTier, predTier),
          };
        })
        .sort((a, b) => {
          if (a.ahiError !== b.ahiError) return a.ahiError - b.ahiError;
          return b.mcc - a.mcc;
        });

      const summary: ModelSummaryMetrics = {
        avgMcc: mean(participants.map((item) => item.mcc)),
        avgSensitivity: mean(participants.map((item) => item.sensitivity)),
        tierMatchCount: participants.filter((item) => item.callDirection === "match").length,
        totalCount: participants.length,
        meanAhiError: mean(participants.map((item) => item.ahiError)),
      };

      return {
        modelId,
        label: MODEL_LABEL_OVERRIDES[modelId] ?? humanizeModelId(modelId),
        summary,
        participants,
      };
    })
    .sort((a, b) => b.summary.avgMcc - a.summary.avgMcc);

  return { models, skippedRecords };
}

export function downsampleSegments(sequence: string, maxSegments = 240): string {
  if (sequence.length <= maxSegments) return sequence;

  const output: string[] = [];
  const binSize = sequence.length / maxSegments;

  for (let i = 0; i < maxSegments; i += 1) {
    const start = Math.floor(i * binSize);
    const end = Math.min(sequence.length, Math.floor((i + 1) * binSize));
    const chunk = sequence.slice(start, Math.max(start + 1, end));
    let apneaCount = 0;

    for (const char of chunk) {
      if (char === "A") apneaCount += 1;
    }

    output.push(apneaCount >= chunk.length / 2 ? "A" : "N");
  }

  return output.join("");
}
