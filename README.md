<a href="https://demo-nextjs-with-supabase.vercel.app/">
  <img alt="Next.js and Supabase Starter Kit - the fastest way to build apps with Next.js and Supabase" src="https://demo-nextjs-with-supabase.vercel.app/opengraph-image.png">
  <h1 align="center">Next.js and Supabase Starter Kit</h1>
</a>

<p align="center">
 The fastest way to build apps with Next.js and Supabase
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Deploy to Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a>
  <a href="#more-supabase-examples"><strong>More Examples</strong></a>
</p>
<br/>

## Features

- Works across the entire [Next.js](https://nextjs.org) stack
  - App Router
  - Pages Router
  - Proxy
  - Client
  - Server
  - It just works!
- supabase-ssr. A package to configure Supabase Auth to use cookies
- Password-based authentication block installed via the [Supabase UI Library](https://supabase.com/ui/docs/nextjs/password-based-auth)
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Components with [shadcn/ui](https://ui.shadcn.com/)
- Optional deployment with [Supabase Vercel Integration and Vercel deploy](#deploy-your-own)
  - Environment variables automatically assigned to Vercel project

## Demo

You can view a fully working demo at [demo-nextjs-with-supabase.vercel.app](https://demo-nextjs-with-supabase.vercel.app/).

## Deploy to Vercel

Vercel deployment will guide you through creating a Supabase account and project.

After installation of the Supabase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This+starter+configures+Supabase+Auth+to+use+cookies%2C+making+the+user%27s+session+available+throughout+the+entire+Next.js+app+-+Client+Components%2C+Server+Components%2C+Route+Handlers%2C+Server+Actions+and+Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png)

The above will also clone the Starter kit to your GitHub, you can clone that locally and develop locally.

If you wish to just develop locally and not deploy to Vercel, [follow the steps below](#clone-and-run-locally).

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Create a Next.js app using the Supabase Starter template npx command

   ```bash
   npx create-next-app --example with-supabase with-supabase-app
   ```

   ```bash
   yarn create next-app --example with-supabase with-supabase-app
   ```

   ```bash
   pnpm create next-app --example with-supabase with-supabase-app
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd with-supabase-app
   ```

4. Rename `.env.example` to `.env.local` and update the following:

  ```env
  NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=[INSERT SUPABASE PROJECT API PUBLISHABLE OR ANON KEY]
  ```
  > [!NOTE]
  > This example uses `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, which refers to Supabase's new **publishable** key format.
  > Both legacy **anon** keys and new **publishable** keys can be used with this variable name during the transition period. Supabase's dashboard may show `NEXT_PUBLIC_SUPABASE_ANON_KEY`; its value can be used in this example.
  > See the [full announcement](https://github.com/orgs/supabase/discussions/29260) for more information.

  Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` can be found in [your Supabase project's API settings](https://supabase.com/dashboard/project/_?showConnect=true)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

6. This template comes with the default shadcn/ui style initialized. If you instead want other ui.shadcn styles, delete `components.json` and [re-install shadcn/ui](https://ui.shadcn.com/docs/installation/next)

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)

## Defining a stable delta threshold
That's a dense literature base. I have enough to give a rigorous, evidence-grounded answer. Here it is.

---

## Q7 — The δ threshold for stable/improving/worsening classification

**Short answer: δ = 3.0 is defensible as a starting configuration, but the literature strongly suggests you should plan to raise it to 5.0 once you have your own model's measurement error characterised. Here's the full reasoning.**

---

### Layer 1 — Biological night-to-night variability (the noise floor you can't shrink)

This is the most important layer, because it's irreducible regardless of how good your model is.

In a 28-night home PSG study of a single mild-to-moderate OSA patient, the mean AHI was 14.1 events/h with a standard deviation of 5.7 events/h and a coefficient of variation of 40.4% — with a full range of 5.1 to 28.3 events/h across those nights. That's a swing of 23 points in a single person with no change in condition. This is biology, not measurement error.

Across 99 patients studied over three consecutive nights with a validated home portable monitor, the standard error of measurement for AHI was 4.64 events/h. This is the SEM of AHI itself — before any additional PPG estimation error is added on top.

A 2024 dataset of 4,527 patients using FDA-cleared wearable PPG devices found a pooled AHI standard deviation of 5.8 events/h across multi-night recordings. This is particularly relevant to your use case — it's the same modality (wearable PPG) and a large real-world sample.

What this means for δ: if the biological SEM of AHI is ~4.6–5.8 events/h, and your delta threshold is a comparison of two 3-night averages (not two single nights), you get some variance reduction from averaging. A 3-night average reduces the SEM by √3 ≈ 1.73, giving an expected SEM of the 3-night mean of roughly **2.7–3.4 events/h**. That means a δ of 3.0 sits right at the edge of biological noise — about 1 standard error of the mean. You'd expect to falsely trigger "worsening" or "improving" roughly 16% of the time from noise alone. A δ of 5.0 would give you closer to ~1.5 SEM coverage, dropping false triggers to around 6–7%.

---

### Layer 2 — What clinical literature defines as a meaningful AHI change

Clinical trials using AHI as an endpoint have adopted a minimum clinically important difference of 5 AHI events/h. This is the most directly applicable number from the literature: the threshold below which a change in AHI is not considered clinically meaningful by the field.

The SEM from the 3-night-measurement paper also supports this: for an observed AHI of 15 events/h, the predicted range spans approximately 10.36 to 19.69 events/h — a confidence band of ±4.64 units. Most observed AHI values across nights were within 4.64 units of category boundaries. In other words, a 4.64-point change is "expected noise" at the individual level; only beyond that does a change start to be signal.

---

### Layer 3 — Your PPG model adds measurement error on top

Your model is not measuring true AHI — it's estimating an AHI-equivalent from PPG, which introduces its own error on top of the biological variability above. The literature on wearable PPG for AHI-equivalent estimation shows that even FDA-cleared wearable PPG devices show multi-night AHI standard deviations of 5.8 events/h in a 4,527-patient real-world dataset. Your model's RMSE against ground-truth PSG is the critical unknown here — but if it's in the range of 3–6 events/h (typical for consumer wearable PPG), that error compounds with biological variability.

The practical upshot: your total noise budget (biological + model estimation error) is likely **5–8 events/h at the single-night level**, which averages down to roughly **3–5 events/h** at the 3-night window level.

---

### The δ recommendation matrix

| δ value | What it catches | False trigger rate (est.) | Clinical backing |
|---|---|---|---|
| **2.0** | Hair-trigger — catches everything including noise | Very high (~25–30%) | Not supported |
| **3.0** | Sits at ~1 SEM of the 3-night average | Moderate (~16%) | Marginal |
| **5.0** | Matches clinical MCID; ~1.5 SEM coverage | Low (~6%) | Directly supported |
| **7.0** | Only catches large severity shifts | Very low (<3%) | Conservative |

Here's the reasoning: your wireframe example shows nightly scores of 14, 8, 19, 11, 16 — a 5-night SD of about 4.2 points. A first-3 average of (14+8+19)/3 = **13.7** and a last-3 average of (8+19+11)/3 = **12.7** gives a diff of **−1.0**, which correctly reads as `stable` at δ = 5.0 and also at δ = 3.0. But if we shift the last 3 to nights 3–5 giving (19+11+16)/3 = **15.3**, the diff is +1.6 — still `stable` at both thresholds, which is correct, since this is within-noise oscillation.

The scenario where δ = 3.0 breaks is a user who sleeps in an unusual position for 1–2 nights early in the arc (inflating first-3 average) then returns to baseline. A δ of 3.0 would call this "improving" when the user's condition hasn't changed. A δ of 5.0 absorbs this gracefully.

**One caveat worth flagging:** the 5-point MCID from the literature comes from group-level clinical trials comparing treated vs. untreated cohorts. Individual-level change detection is harder than group-level detection. If your model has a validated per-night RMSE you can share, the correct δ can be computed precisely as: `δ = 1.5 × (model_RMSE / √3)`. At RMSE = 6 events/h, that's `1.5 × 3.46 = 5.2` — which lands almost exactly on the clinically-backed 5.0. That's a reassuring convergence, and a clean justification to put in the config file comment.