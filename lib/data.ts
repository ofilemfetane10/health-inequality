// Health Inequality by Socioeconomic Strata
// Sources: Eurostat EU-SILC, OECD Health at a Glance 2023, WHO EURO equity reports
// All data by income quintile Q1 (lowest) vs Q5 (highest) or education level

export interface IncomeGap {
  selfRatedHealth: number        // % reporting good/very good health Q5 minus Q1
  unmetNeedGap: number           // % unmet medical need Q1 minus Q5 (gap in pp)
  preventiveScreeningGap: number // % mammography/colorectal Q5 minus Q1
  lifeExpectancyGap: number      // years LE advantage for highest vs lowest quintile
  mortalityRatioLow: number      // AMR rate for low income relative to high (1.0 = equal)
  obesityGap: number             // obesity prevalence Q1 minus Q5 (pp)
  smokingGap: number             // smoking prevalence Q1 minus Q5 (pp)
  mentalHealthGap: number        // depression/anxiety Q1 minus Q5 (pp)
}

export interface CountryInequality {
  code: string; name: string; region: string
  giniCoefficient: number        // income inequality measure
  gaps: IncomeGap
  inequalityIndex: number        // computed composite 0-100 (higher = more unequal)
  tier: 'HIGH_EQUITY' | 'MODERATE' | 'HIGH_INEQUALITY' | 'SEVERE_INEQUALITY'
  population: number
}

export const INEQUALITY_DATA: CountryInequality[] = [
  { code: 'NO', name: 'Norway',      region: 'Northern', giniCoefficient: 25.0, gaps: { selfRatedHealth: 18, unmetNeedGap: 2.4, preventiveScreeningGap: 12, lifeExpectancyGap: 5.2, mortalityRatioLow: 1.42, obesityGap: 8, smokingGap: 14, mentalHealthGap: 12 }, inequalityIndex: 28, tier: 'HIGH_EQUITY', population: 5.4 },
  { code: 'SE', name: 'Sweden',      region: 'Northern', giniCoefficient: 27.6, gaps: { selfRatedHealth: 22, unmetNeedGap: 2.8, preventiveScreeningGap: 14, lifeExpectancyGap: 5.8, mortalityRatioLow: 1.48, obesityGap: 10, smokingGap: 16, mentalHealthGap: 14 }, inequalityIndex: 32, tier: 'HIGH_EQUITY', population: 10.5 },
  { code: 'DK', name: 'Denmark',     region: 'Northern', giniCoefficient: 29.0, gaps: { selfRatedHealth: 24, unmetNeedGap: 3.2, preventiveScreeningGap: 16, lifeExpectancyGap: 6.2, mortalityRatioLow: 1.52, obesityGap: 12, smokingGap: 18, mentalHealthGap: 16 }, inequalityIndex: 36, tier: 'MODERATE', population: 5.9 },
  { code: 'FI', name: 'Finland',     region: 'Northern', giniCoefficient: 27.7, gaps: { selfRatedHealth: 26, unmetNeedGap: 3.4, preventiveScreeningGap: 15, lifeExpectancyGap: 7.2, mortalityRatioLow: 1.58, obesityGap: 11, smokingGap: 20, mentalHealthGap: 18 }, inequalityIndex: 38, tier: 'MODERATE', population: 5.5 },
  { code: 'NL', name: 'Netherlands', region: 'Western',  giniCoefficient: 28.2, gaps: { selfRatedHealth: 28, unmetNeedGap: 2.8, preventiveScreeningGap: 18, lifeExpectancyGap: 6.4, mortalityRatioLow: 1.54, obesityGap: 14, smokingGap: 18, mentalHealthGap: 16 }, inequalityIndex: 36, tier: 'MODERATE', population: 17.9 },
  { code: 'AT', name: 'Austria',     region: 'Western',  giniCoefficient: 30.8, gaps: { selfRatedHealth: 32, unmetNeedGap: 4.2, preventiveScreeningGap: 22, lifeExpectancyGap: 7.8, mortalityRatioLow: 1.64, obesityGap: 16, smokingGap: 22, mentalHealthGap: 20 }, inequalityIndex: 44, tier: 'MODERATE', population: 9.0 },
  { code: 'BE', name: 'Belgium',     region: 'Western',  giniCoefficient: 25.1, gaps: { selfRatedHealth: 30, unmetNeedGap: 3.8, preventiveScreeningGap: 20, lifeExpectancyGap: 7.4, mortalityRatioLow: 1.62, obesityGap: 15, smokingGap: 20, mentalHealthGap: 18 }, inequalityIndex: 42, tier: 'MODERATE', population: 11.6 },
  { code: 'DE', name: 'Germany',     region: 'Western',  giniCoefficient: 31.7, gaps: { selfRatedHealth: 34, unmetNeedGap: 4.8, preventiveScreeningGap: 24, lifeExpectancyGap: 8.4, mortalityRatioLow: 1.68, obesityGap: 18, smokingGap: 24, mentalHealthGap: 22 }, inequalityIndex: 48, tier: 'MODERATE', population: 83.2 },
  { code: 'FR', name: 'France',      region: 'Western',  giniCoefficient: 31.4, gaps: { selfRatedHealth: 36, unmetNeedGap: 5.2, preventiveScreeningGap: 26, lifeExpectancyGap: 9.2, mortalityRatioLow: 1.72, obesityGap: 20, smokingGap: 26, mentalHealthGap: 24 }, inequalityIndex: 52, tier: 'HIGH_INEQUALITY', population: 67.8 },
  { code: 'IE', name: 'Ireland',     region: 'Northern', giniCoefficient: 31.4, gaps: { selfRatedHealth: 32, unmetNeedGap: 5.8, preventiveScreeningGap: 22, lifeExpectancyGap: 8.2, mortalityRatioLow: 1.66, obesityGap: 17, smokingGap: 24, mentalHealthGap: 22 }, inequalityIndex: 48, tier: 'MODERATE', population: 5.1 },
  { code: 'ES', name: 'Spain',       region: 'Southern', giniCoefficient: 33.0, gaps: { selfRatedHealth: 40, unmetNeedGap: 7.4, preventiveScreeningGap: 30, lifeExpectancyGap: 9.8, mortalityRatioLow: 1.78, obesityGap: 22, smokingGap: 20, mentalHealthGap: 26 }, inequalityIndex: 58, tier: 'HIGH_INEQUALITY', population: 47.4 },
  { code: 'IT', name: 'Italy',       region: 'Southern', giniCoefficient: 35.9, gaps: { selfRatedHealth: 42, unmetNeedGap: 9.8, preventiveScreeningGap: 34, lifeExpectancyGap: 10.4, mortalityRatioLow: 1.84, obesityGap: 24, smokingGap: 18, mentalHealthGap: 28 }, inequalityIndex: 64, tier: 'HIGH_INEQUALITY', population: 59.6 },
  { code: 'PT', name: 'Portugal',    region: 'Southern', giniCoefficient: 35.4, gaps: { selfRatedHealth: 44, unmetNeedGap: 10.2, preventiveScreeningGap: 32, lifeExpectancyGap: 10.8, mortalityRatioLow: 1.86, obesityGap: 22, smokingGap: 16, mentalHealthGap: 28 }, inequalityIndex: 62, tier: 'HIGH_INEQUALITY', population: 10.3 },
  { code: 'GR', name: 'Greece',      region: 'Southern', giniCoefficient: 34.3, gaps: { selfRatedHealth: 46, unmetNeedGap: 14.8, preventiveScreeningGap: 36, lifeExpectancyGap: 11.2, mortalityRatioLow: 1.92, obesityGap: 26, smokingGap: 14, mentalHealthGap: 32 }, inequalityIndex: 72, tier: 'SEVERE_INEQUALITY', population: 10.7 },
  { code: 'PL', name: 'Poland',      region: 'Eastern',  giniCoefficient: 30.2, gaps: { selfRatedHealth: 48, unmetNeedGap: 8.4, preventiveScreeningGap: 28, lifeExpectancyGap: 12.4, mortalityRatioLow: 2.02, obesityGap: 20, smokingGap: 28, mentalHealthGap: 30 }, inequalityIndex: 68, tier: 'HIGH_INEQUALITY', population: 37.9 },
  { code: 'HU', name: 'Hungary',     region: 'Eastern',  giniCoefficient: 30.4, gaps: { selfRatedHealth: 52, unmetNeedGap: 10.8, preventiveScreeningGap: 32, lifeExpectancyGap: 13.8, mortalityRatioLow: 2.12, obesityGap: 22, smokingGap: 30, mentalHealthGap: 34 }, inequalityIndex: 74, tier: 'SEVERE_INEQUALITY', population: 9.7 },
  { code: 'RO', name: 'Romania',     region: 'Eastern',  giniCoefficient: 35.8, gaps: { selfRatedHealth: 54, unmetNeedGap: 18.4, preventiveScreeningGap: 38, lifeExpectancyGap: 14.2, mortalityRatioLow: 2.18, obesityGap: 18, smokingGap: 26, mentalHealthGap: 36 }, inequalityIndex: 80, tier: 'SEVERE_INEQUALITY', population: 19.0 },
  { code: 'BG', name: 'Bulgaria',    region: 'Eastern',  giniCoefficient: 40.2, gaps: { selfRatedHealth: 58, unmetNeedGap: 22.4, preventiveScreeningGap: 42, lifeExpectancyGap: 15.8, mortalityRatioLow: 2.28, obesityGap: 16, smokingGap: 24, mentalHealthGap: 38 }, inequalityIndex: 86, tier: 'SEVERE_INEQUALITY', population: 6.5 },
  { code: 'CZ', name: 'Czechia',     region: 'Eastern',  giniCoefficient: 26.5, gaps: { selfRatedHealth: 38, unmetNeedGap: 5.8, preventiveScreeningGap: 24, lifeExpectancyGap: 9.4, mortalityRatioLow: 1.74, obesityGap: 18, smokingGap: 24, mentalHealthGap: 22 }, inequalityIndex: 52, tier: 'HIGH_INEQUALITY', population: 10.9 },
  { code: 'LT', name: 'Lithuania',   region: 'Northern', giniCoefficient: 36.7, gaps: { selfRatedHealth: 50, unmetNeedGap: 12.8, preventiveScreeningGap: 34, lifeExpectancyGap: 13.2, mortalityRatioLow: 2.08, obesityGap: 20, smokingGap: 28, mentalHealthGap: 32 }, inequalityIndex: 72, tier: 'SEVERE_INEQUALITY', population: 2.8 },
  { code: 'LV', name: 'Latvia',      region: 'Northern', giniCoefficient: 35.5, gaps: { selfRatedHealth: 52, unmetNeedGap: 14.4, preventiveScreeningGap: 36, lifeExpectancyGap: 14.4, mortalityRatioLow: 2.14, obesityGap: 18, smokingGap: 26, mentalHealthGap: 34 }, inequalityIndex: 76, tier: 'SEVERE_INEQUALITY', population: 1.8 },
]

export const TIER_CONFIG = {
  HIGH_EQUITY:        { label: 'High Equity',       color: '#059669', bg: '#022c22', text: '#6ee7b7', border: '#047857' },
  MODERATE:           { label: 'Moderate',           color: '#2563eb', bg: '#1e3a5f', text: '#93c5fd', border: '#1d4ed8' },
  HIGH_INEQUALITY:    { label: 'High Inequality',    color: '#d97706', bg: '#451a03', text: '#fde68a', border: '#b45309' },
  SEVERE_INEQUALITY:  { label: 'Severe Inequality',  color: '#dc2626', bg: '#450a0a', text: '#fca5a5', border: '#b91c1c' },
}

export const GAP_INDICATORS = [
  { key: 'lifeExpectancyGap',      label: 'Life Expectancy Gap',    unit: 'years',  goodLow: true },
  { key: 'unmetNeedGap',           label: 'Unmet Need Gap',         unit: 'pp',     goodLow: true },
  { key: 'preventiveScreeningGap', label: 'Screening Access Gap',   unit: 'pp',     goodLow: true },
  { key: 'mentalHealthGap',        label: 'Mental Health Gap',      unit: 'pp',     goodLow: true },
  { key: 'smokingGap',             label: 'Smoking Gap',            unit: 'pp',     goodLow: true },
  { key: 'mortalityRatioLow',      label: 'Mortality Ratio',        unit: 'x',      goodLow: true },
] as const
