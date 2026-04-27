# PRD: OSA Sleep Screening App

## Problem Statement

An estimated 68.5 million US adults have undiagnosed obstructive sleep apnea (OSA). The primary barrier is not lack of awareness — it is that the only credible diagnostic pathway (polysomnography) costs $1,000–$5,000+, requires an overnight lab stay, has months-long wait times, and produces results from a single night that misclassifies 20–50% of patients. People who suspect something is wrong with their sleep have nowhere credible to turn before committing to that process. They normalise symptoms (fatigue, morning headaches, mood changes), dismiss partner concerns, and never engage with care. The diagnosis gap is where 80–90% of potential patients are permanently lost.

A secondary problem exists for the 63% of diagnosed patients who discontinue CPAP therapy: they have no feedback loop connecting nightly discomfort to objective improvement, so they quit before treatment has time to work.

---

## Solution

A consumer mobile app that uses PPG (photoplethysmography) data from the user's existing wearable device (Apple Watch, Fitbit, Samsung Galaxy Watch, Garmin) to passively monitor sleep breathing patterns over 14 consecutive nights, producing an AHI-style severity score and a plain-language risk tier. The app bridges the gap between suspicion and formal diagnosis by:

1. Framing entry through sleep quality and recovery — not disease screening — to eliminate stigma-driven drop-off at the top of the funnel.
2. Requiring no new hardware — the user sleeps with the wearable they already own.
3. Delivering a 14-night trend rather than a single-night snapshot, which is clinically superior to PSG's first-night effect and more motivating than a one-time result.
4. Translating the score into a risk tier (none / mild / moderate / significant) with plain-language impact statements and a direct next action (telehealth CTA or PCP report export).

The app never claims to diagnose OSA. All outputs are framed as sleep quality screening results. Regulatory positioning is as a wellness screening tool, not a Class II medical device.

---

## User Stories

### Onboarding

1. As an undiagnosed adult who suspects something is wrong with my sleep, I want a low-friction entry point that doesn't immediately label me as sick, so that I engage with the app rather than closing it out of anxiety.
2. As a new user, I want to understand why 14 nights of monitoring produces a better result than one night, so that I commit to completing the full arc before seeing results.
3. As a user with an Apple Watch, I want to connect my existing device without buying new hardware, so that I can start immediately with no additional cost.
4. As a user with a Fitbit, Samsung Galaxy Watch, or Garmin, I want to connect my existing device, so that the app is not limited to Apple ecosystem users.
5. As a privacy-conscious user, I want to know exactly which data types are read from my wearable (heart rate, blood oxygen) and which are not, before I grant access, so that I can make an informed decision about permission.
6. As a user on the permission screen, I want to see a brief, plain-language explanation of data handling before the native OS permission sheet appears, so that I don't refuse access due to uncertainty.
7. As a user who has just connected my wearable, I want to set a bedtime reminder immediately, so that I don't forget to wear my device tonight.
8. As a user who declined wearable permissions, I want a clear explanation of what I'm missing and a way to reconnect later, so that I'm not permanently locked out.

### Tonight (active monitoring)

9. As a user on an active monitoring night, I want to see that my wearable is connected and recording, so that I don't worry that tonight's data will be missed.
10. As a user who forgot to wear their wearable last night, I want to see that night flagged as missing data rather than skipped, so that my trend isn't silently corrupted.
11. As a user whose wearable ran out of battery mid-night, I want to be notified that the night was partial, so that I understand the data quality context.

### 14-night trend view

12. As a user on night 1, I want to see a progress indicator showing how far I am through the 14-night arc, so that incompletion feels like progress rather than failure.
13. As a user on night 1, I want the chart to be gated until 3+ nights of data are available, so that I don't see a meaninglessly sparse chart that reduces motivation.
14. As a user mid-arc, I want to see a bar for each completed night with a nightly score, so that I can see night-to-night variation.
15. As a user mid-arc, I want to see a rolling average line overlaid on the bar chart, so that I understand my trend direction rather than fixating on individual outlier nights.
16. As a user mid-arc, I want to tap any bar to see a detail sheet for that night, so that I can understand what happened on unusually high or low nights.
17. As a user viewing a night detail sheet, I want to see my nightly score, total hours worn, and average SpO2, so that I have enough context to understand the result.
18. As a user viewing a night detail sheet, I want a plain-language explanation of what the data means, so that I don't need to interpret raw sensor values myself.
19. As a user on night 14, I want to see a completion moment with a clear CTA to view my full results, so that I am immediately rewarded for completing the arc.
20. As a user who has completed 14 nights and started a new monitoring period, I want to see both the current and previous arc, so that I can compare improvement over time.
21. As a CPAP user, I want to mark nights when I used my CPAP device, so that my trend view can distinguish treated from untreated nights.
22. As a CPAP user, I want to see a before/after score comparison between CPAP and non-CPAP nights, so that I can see objective evidence that treatment is working.

### Results screen

23. As a user who has completed 14 nights, I want to see my risk tier (none / mild / moderate / significant) as the primary result, so that I don't have to interpret a raw number.
24. As a user, I want to see the four-tier scale with my tier highlighted, so that I understand my severity in relation to the full range.
25. As a user, I want my raw average AHI-style score displayed as secondary information beneath the tier label, so that I have the precise number available if I want it.
26. As a user with a none/mild result, I want to understand what my score means for my daily life (energy, focus, heart health), so that the result feels personally relevant.
27. As a user with a moderate/significant result, I want impact statements framed around treatable consequences (fatigue, cardiovascular risk, driving alertness) rather than alarming disease language, so that I feel motivated to act rather than avoidant.
28. As a user with any result, I want to see the regulatory disclaimer clearly, so that I understand this is a screening result and not a diagnosis — but I don't want it to be the first thing I read.
29. As a user with a mild/moderate/significant result, I want a prominent "Talk to a doctor" CTA that connects me to a telehealth service, so that the next step is frictionless.
30. As a user preparing for a doctor's appointment, I want to download a formatted 14-night summary report as a PDF, so that I can share objective data with my physician without relying on memory.
31. As a user whose results have changed (e.g. after weight loss or medication change), I want to start a new 14-night monitoring arc, so that I can track how my severity has shifted without booking another lab test.

### Export and clinical pathway

32. As a user, I want the PCP export PDF to include nightly scores, the rolling average, the risk tier, my average SpO2, and the regulatory disclaimer, so that it contains everything a doctor needs to triage a referral.
33. As a physician receiving a patient's export, I want to see a clearly labelled "screening result only" disclaimer, so that I understand the document's clinical scope before acting on it.

### Privacy and trust

34. As a user, I want to delete all my health data from the app at any time, so that I have control over sensitive information.
35. As a user, I want to know whether my data is processed on-device or sent to a server, so that I can assess my privacy exposure.
36. As a user, I want the app to never share my data with third parties without explicit consent, so that I trust the product with sensitive sleep health information.

---

## Implementation Decisions

### Modules

**PPGIngestionModule**
Interfaces with Apple HealthKit, Fitbit Web API, Samsung Health SDK, and Garmin Connect IQ to pull nightly heart rate and SpO2 raw data. Normalises data across device vendors into a common schema. Handles partial nights, missing nights, and low-quality signal flags. This is a deep module — its interface is a clean `getNightData(date) → NightRecord` contract that the rest of the app never needs to look behind.

**ScoringModule**
Accepts a `NightRecord` and runs the PPG-based AHI-equivalent model. Returns a `NightScore { value: Float, confidence: Float, dataQuality: Enum }`. The model itself is the team's existing trained pipeline. This module wraps it with input validation, confidence thresholds, and graceful degradation when signal quality is poor. Testable in complete isolation — no UI dependency.

**TrendAggregator**
Accepts an ordered array of `NightScore` records and computes: rolling 3-night average, 14-night average, trend direction (improving / stable / worsening), and CPAP-on vs CPAP-off split averages. Returns a `TrendSummary` object. Pure functional module — no I/O, no side effects.

**RiskTierClassifier**
Accepts a `TrendSummary.average` and returns `RiskTier { tier: Enum[none|mild|moderate|significant], label: String, impactStatements: String[], ctaType: Enum[none|telehealth|urgent] }`. The tier thresholds and copy are configured externally so they can be updated without a code release. This is the module most likely to require regulatory review — its interface and output schema should be locked early.

**WearableConnectionFlow**
Orchestrates the multi-step onboarding: device selection, pre-permission explanation screen, native OS permission request, confirmation, and reminder scheduling. Handles permission denial gracefully with a re-connection path. Stateful module with a simple `ConnectionStatus` observable.

**TrendChartComponent**
Renders the 14-bar chart with rolling average overlay, empty/sparse states, and tap-to-detail interaction. The chart is intentionally gated below 3 nights of data. This component must handle all four states: empty (0 nights), sparse (1–2 nights), in-progress (3–13 nights), complete (14 nights).

**NightDetailSheet**
Bottom sheet presented on bar tap. Displays `NightScore`, wear duration, average SpO2, and a plain-language explanation. Dismissible. Does not navigate away from the trend view.

**ResultScreen**
Presents `RiskTier` as primary element via `TierScaleComponent`. Displays raw score as secondary. Renders `ImpactList`, `ResultCTA`, and `DisclaimerFootnote`. Has four variants keyed to tier enum — none, mild, moderate, significant.

**ReportExporter**
Generates a PDF from a `TrendSummary + RiskTier` payload. Formats for clinical readability. Includes the regulatory disclaimer as a required field. Output is a shareable file — not uploaded anywhere without explicit user action.

**TelehealthCTAModule**
Integrates with a telehealth API partner (e.g. Teladoc, MDLive). On CTA tap, opens a pre-populated intake flow with the user's risk tier passed as context. The specific partner is a business decision — the module interface is partner-agnostic.

### Architectural decisions

- Wellness framing is enforced at the copy layer, not the data layer. The underlying data model uses clinical terminology (AHI-equivalent, SpO2). UI strings are managed in a localisation file and never hardcoded in components.
- The regulatory disclaimer is a required prop on `ResultScreen` — it cannot be rendered without it. This is an architectural guard, not a design convention.
- CPAP tracking is a user-initiated nightly toggle. It does not require integration with any CPAP device or manufacturer.
- The app does not claim to diagnose OSA at any point. `RiskTierClassifier` output copy must be reviewed by a regulatory/legal advisor before production.
- Multi-night data is stored locally on device by default. Cloud sync is opt-in and requires explicit user consent.

### Data schema (conceptual)

```
NightRecord {
  date: Date
  deviceType: Enum
  rawPPG: TimeSeries
  heartRateSamples: TimeSeries
  spO2Samples: TimeSeries
  wearDurationMinutes: Int
  dataQualityFlag: Enum[good|partial|poor]
  cpapUsed: Boolean
}

NightScore {
  date: Date
  ahiEquivalent: Float
  confidence: Float
  dataQuality: Enum
}

TrendSummary {
  nights: NightScore[]
  rollingAverage: Float[]
  fourteenNightAverage: Float
  trendDirection: Enum
  cpapOnAverage: Float?
  cpapOffAverage: Float?
}

RiskTier {
  tier: Enum[none|mild|moderate|significant]
  label: String
  impactStatements: String[]
  ctaType: Enum[none|telehealth|urgent]
}
```

---

## Testing Decisions

### What makes a good test here

Tests should assert on externally observable behaviour — what the module returns given a specific input — not on implementation details like internal state or private method calls. The scoring model is a black box from the test suite's perspective; tests should assert that a given `NightRecord` input produces a score within an expected range, not that a specific algorithm step was executed.

### Modules to test

**ScoringModule** — highest priority. Given a synthetic `NightRecord` with known characteristics (e.g. simulated apnea events at known timestamps), assert that the output `NightScore.value` falls within the expected AHI-equivalent range. Also test graceful degradation: given a `NightRecord` with `dataQuality: poor`, assert that `confidence` is below threshold and the module returns a flagged result rather than a misleading score.

**TrendAggregator** — pure functional, easiest to test exhaustively. Given a known array of `NightScore` records, assert rolling average values, 14-night average, and trend direction. Edge cases: fewer than 14 nights, all identical scores, one extreme outlier, CPAP-mixed nights.

**RiskTierClassifier** — test all four tier boundaries. Assert that a score of 5 maps to `none`, a score of 10 maps to `mild`, etc. Also assert that the `ctaType` output matches the tier (no CTA for none, telehealth for mild/moderate, urgent for significant). The tier thresholds are configuration — tests should import them from the same config so threshold changes don't silently break tests.

**WearableConnectionFlow** — test the permission denial path. Given a simulated OS permission refusal, assert that the app surfaces a re-connection option and does not crash or enter a broken state.

**ReportExporter** — assert that the generated PDF contains: nightly scores, 14-night average, risk tier label, average SpO2, and the regulatory disclaimer string. The disclaimer is a required field — its absence should fail the test.

---

## Out of Scope

- Real-time or in-night monitoring feedback. The app reads data retrospectively each morning, not live during sleep.
- Integration with CPAP devices or manufacturer APIs (ResMed, Philips). The CPAP toggle is manual, not automated.
- Clinical diagnosis. The app is a wellness screening tool. It cannot and does not replace a polysomnography or HSAT.
- Partner account system or shared monitoring. Sharing is limited to the PDF export in v1.
- Android wearable support beyond Samsung Health and Garmin in v1. Additional platforms are a v2 consideration.
- Insurance billing, reimbursement codes, or integration with EHR systems.
- FDA 510(k) clearance pathway. The v1 launch positioning avoids triggering Class II device classification. Any pivot toward clinical diagnosis claims requires a separate regulatory workstream.
- Streak mechanics, gamification, or social features beyond the PDF share.
- AI-generated personalised recommendations. The app surfaces data and context — it does not prescribe treatment or lifestyle changes.

---

## Further Notes

**Regulatory framing is the highest-risk product decision.** Every piece of copy that touches the result screen, the onboarding flow, and the export PDF must be reviewed for compliance with AASM guidance before launch. The app must never imply that its output constitutes a diagnosis of OSA. The phrase "sleep apnea" should be avoided in primary UI copy wherever possible, replaced with "sleep breathing patterns" or "sleep quality screening."

**The 14-night completion rate is the north star metric for v1.** Downloads and activations are vanity metrics. A user who connects their wearable on night 1 and returns for all 14 nights is the unit of value. Every product decision should be evaluated against this metric.

**The telehealth CTA partner selection is a business decision, not a technical one.** The module interface is partner-agnostic. Whichever partner is selected, the referral or affiliate fee structure is the product's first revenue mechanism.

**Consumer wearable PPG accuracy varies by device and user.** The model was trained on dedicated medical wearable data. Validation studies against consumer wearable data should be conducted before public launch to establish confidence intervals by device type. The `dataQualityFlag` in `NightRecord` is a placeholder for this validation output.

**A/B test copy before mid-fi prototyping is complete.** Two copy decisions have high stakes and should be tested with real users before being committed to: (1) "Significant" vs "Severe" as the top tier label — early research suggests "Significant" drives more CTA taps by reducing avoidance response; (2) "Understand your sleep" vs "Sleep breathing tracker" as the onboarding headline — wellness framing vs explicit function description.