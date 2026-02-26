# Health Inequality Atlas

**Measuring the gap in health outcomes, access, and behaviours between the richest and poorest income quintiles across 22 European countries.**

Part of the **EU Health Intelligence Suite** — 10 production-grade applications for **WHO**- and **EU**-level health policy analysis.

## What This Shows

Universal health coverage does **not** guarantee health equity.

- **France** has universal coverage — and a **9.2-year life expectancy gap** between its richest and poorest income quintiles.
- **Bulgaria** shows a **15.8-year gap** — meaning poverty alone costs nearly 16 years of life.

This atlas measures the **structural distance between what health systems promise and what they deliver** to their most disadvantaged citizens.

Health inequality is treated here not as a marginal outcome, but as a **core system performance failure**.

## Inequality Dimensions

Six dimensions are measured consistently as the **gap between the richest quintile (Q5) and the poorest (Q1)**:

| Indicator | What It Measures |
|---------|------------------|
| **Life Expectancy Gap** | Years of life lost by being born poor |
| **Unmet Need Gap** | Differential failure to access needed care |
| **Screening Access Gap** | Preventive care utilisation by income |
| **Mental Health Gap** | Depression and anxiety prevalence differential |
| **Smoking Gap** | Behavioural risk factor inequality |
| **Mortality Ratio** | Relative mortality disadvantage of the poorest quintile |

## Visual Design

Warm **sepia academic aesthetic** — *Fraunces* (serif) + *Epilogue*  
Inspired by rigorous **social epidemiology** and population health research.

## Data Sources

| Indicator | Source | Notes |
|--------|--------|------|
| Unmet need by income quintile | :contentReference[oaicite:0]{index=0} EU-SILC (`hlth_silc_08`) | Survey of Income and Living Conditions |
| Life expectancy by income | :contentReference[oaicite:1]{index=1} *Health at a Glance 2023* | Socioeconomic LE gradients |
| Preventive screening | EU-SILC health module | Mammography & colorectal screening |
| Mental health | EU-SILC health module | Self-reported depression & anxiety |
| Smoking prevalence | EU-SILC + OECD Health Statistics | Behavioural stratification |
| Gini coefficient | World Bank + Eurostat | Income inequality baseline |
| Avoidable mortality ratio | Eurostat (`hlth_cd_asdr2`) | Mortality: lowest vs highest quintile |

**Reference years:** 2021–2022

## The Gini–Health Inequality Relationship

The scatter plot at the heart of the **Outcomes** view makes a clear epidemiological argument:

> **Income inequality and health inequality move together.**

Countries with higher **Gini coefficients** consistently show **larger life expectancy gaps** between income quintiles.  
This relationship is one of the most replicated findings in social epidemiology — **steep, consistent, and causal**.

**Policy implication:**  
You cannot close health inequality without addressing **income inequality**. Healthcare access alone cannot bridge a **15-year life expectancy gap**.

## Inequality Tiers

| Tier | Inequality Index | Life Expectancy Gap | Countries |
|----|-----------------|---------------------|----------|
| 🟢 **High Equity** | < 35 | < 6 years | Norway, Sweden |
| 🔵 **Moderate** | 35–55 | 6–9 years | Denmark, Finland, Netherlands, Germany |
| 🟠 **High Inequality** | 55–70 | 9–12 years | France, Spain, Italy, Portugal, Czechia |
| 🔴 **Severe Inequality** | > 70 | > 12 years | Greece, Hungary, Romania, Bulgaria, Lithuania, Latvia |

## Key Findings

- **Bulgaria**  
  Gini: **40.2** → **15.8-year life expectancy gap**  
  The poorest quintile lives nearly **16 fewer years** than the richest.

- **Romania**  
  **22.4 percentage-point unmet need gap** — the poorest are almost a quarter of the population away from accessing needed care.

- **Greece**  
  **14.8pp unmet need gap** + **11.2-year LE gap**  
  A clear signal of **post-austerity health system failure** concentrated on vulnerable groups.

- **Norway**  
  Gini: **25.0** + **5.2-year LE gap**  
  Demonstrates that **income compression is one of the most effective health interventions available**.

## The Inequality Index

Each country receives a **composite Inequality Index (0–100)**:

- Weighted across all six gap indicators  
- Higher score = worse inequality  
- Designed for **cross-country comparability**, while recognising that different gaps reflect different policy failures

> This index is **not** a published indicator — it is transparently constructed from **published EU-SILC, OECD, and Eurostat parameters**.

Full methodology is documented in `lib/data.ts`.

## Run Locally

```bash
git clone https://github.com/your-username/health-inequality
cd health-inequality
npm install
npm run dev
