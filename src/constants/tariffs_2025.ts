// Tariff rate constants for 2025
const HOURLY_RATE_VALUES = {
  WORKER_EMPLOYER: 785,
  COMMERCIAL: 1150,
  CONSUMER: 785,
  RENT: 835,
  FAMILY: 785,
  OTHER: 785,
  PARTNERSHIP_DISSOLUTION: 900,
} as const;

// Party count thresholds
const PARTY_COUNT_THRESHOLDS = {
  TWO_PARTIES: 2,
  SMALL_GROUP: 5,
  MEDIUM_GROUP: 10,
  UNLIMITED: Infinity,
} as const;

// Multipliers for party-based calculations
const PARTY_MULTIPLIER = {
  TWO_PARTY: 2, // For 2-party disputes: rate × 2
} as const;

// Fixed fees for different party count ranges
const FIXED_FEES = {
  WORKER_EMPLOYER: {
    SMALL_GROUP: 1650,
    MEDIUM_GROUP: 1750,
    LARGE_GROUP: 1850,
  },
  COMMERCIAL: {
    SMALL_GROUP: 2350,
    MEDIUM_GROUP: 2450,
    LARGE_GROUP: 2550,
  },
  CONSUMER: {
    SMALL_GROUP: 1650,
    MEDIUM_GROUP: 1750,
    LARGE_GROUP: 1850,
  },
  RENT: {
    SMALL_GROUP: 1750,
    MEDIUM_GROUP: 1850,
    LARGE_GROUP: 1950,
  },
  FAMILY: {
    SMALL_GROUP: 1650,
    MEDIUM_GROUP: 1750,
    LARGE_GROUP: 1850,
  },
  PARTNERSHIP_DISSOLUTION: {
    SMALL_GROUP: 2000,
    MEDIUM_GROUP: 2100,
    LARGE_GROUP: 2200,
  },
  OTHER: {
    SMALL_GROUP: 1650,
    MEDIUM_GROUP: 1750,
    LARGE_GROUP: 1850,
  },
} as const;

// Minimum fee constants
const MINIMUM_FEES = {
  GENERAL: 6000,
  COMMERCIAL: 9000,
} as const;

// Bracket calculation constants
const BRACKET_LIMITS = {
  FIRST: 300000,
  SECOND: 780000,
  THIRD: 1560000,
  FOURTH: 4680000,
  FIFTH: 6240000,
  SIXTH: 12480000,
  SEVENTH: 26520000,
  FINAL: Infinity,
} as const;

const BRACKET_RATES = {
  FIRST: 0.06,
  SECOND: 0.05,
  THIRD: 0.04,
  FOURTH: 0.03,
  FIFTH: 0.02,
  SIXTH: 0.015,
  SEVENTH: 0.01,
  FINAL: 0.005,
} as const;

export const TARIFF_2025 = {
  hourlyRates: {
    'İşçi-İşveren': HOURLY_RATE_VALUES.WORKER_EMPLOYER,
    'Ticari': HOURLY_RATE_VALUES.COMMERCIAL,
    'Tüketici': HOURLY_RATE_VALUES.CONSUMER,
    'Kira': HOURLY_RATE_VALUES.RENT,
    'Aile': HOURLY_RATE_VALUES.FAMILY,
    'Diğer': HOURLY_RATE_VALUES.OTHER,
    'Ortaklığın Giderilmesi': HOURLY_RATE_VALUES.PARTNERSHIP_DISSOLUTION,
  },
  partyBasedRates: {
    'İşçi-İşveren': [
      { count: PARTY_COUNT_THRESHOLDS.TWO_PARTIES, rate: HOURLY_RATE_VALUES.WORKER_EMPLOYER * PARTY_MULTIPLIER.TWO_PARTY },       // For 2 parties: 785 TL * 2 (785 × per party × number of parties)
      { count: PARTY_COUNT_THRESHOLDS.SMALL_GROUP, rate: FIXED_FEES.WORKER_EMPLOYER.SMALL_GROUP },         // For 3-5 parties: 1650 TL (fixed fee)
      { count: PARTY_COUNT_THRESHOLDS.MEDIUM_GROUP, rate: FIXED_FEES.WORKER_EMPLOYER.MEDIUM_GROUP },        // For 6-10 parties: 1750 TL (fixed fee)
      { count: PARTY_COUNT_THRESHOLDS.UNLIMITED, rate: FIXED_FEES.WORKER_EMPLOYER.LARGE_GROUP },  // For 11+ parties: 1850 TL (fixed fee)
    ],
    'Ticari': [
      { count: PARTY_COUNT_THRESHOLDS.TWO_PARTIES, rate: HOURLY_RATE_VALUES.COMMERCIAL * PARTY_MULTIPLIER.TWO_PARTY },     // For 2 parties: 1150 TL * 2 (1150 × per party × number of parties)
      { count: PARTY_COUNT_THRESHOLDS.SMALL_GROUP, rate: FIXED_FEES.COMMERCIAL.SMALL_GROUP },         // For 3-5 parties: 2350 TL (fixed fee)
      { count: PARTY_COUNT_THRESHOLDS.MEDIUM_GROUP, rate: FIXED_FEES.COMMERCIAL.MEDIUM_GROUP },        // For 6-10 parties: 2450 TL (fixed fee)
      { count: PARTY_COUNT_THRESHOLDS.UNLIMITED, rate: FIXED_FEES.COMMERCIAL.LARGE_GROUP },  // For 11+ parties: 2550 TL (fixed fee)
    ],
    'Tüketici': [
      { count: PARTY_COUNT_THRESHOLDS.TWO_PARTIES, rate: HOURLY_RATE_VALUES.CONSUMER * PARTY_MULTIPLIER.TWO_PARTY },      // For 2 parties: 785 TL * 2 (785 × per party × number of parties)
      { count: PARTY_COUNT_THRESHOLDS.SMALL_GROUP, rate: FIXED_FEES.CONSUMER.SMALL_GROUP },         // For 3-5 parties: 1650 TL (fixed fee)
      { count: PARTY_COUNT_THRESHOLDS.MEDIUM_GROUP, rate: FIXED_FEES.CONSUMER.MEDIUM_GROUP },        // For 6-10 parties: 1750 TL (fixed fee)
      { count: PARTY_COUNT_THRESHOLDS.UNLIMITED, rate: FIXED_FEES.CONSUMER.LARGE_GROUP },  // For 11+ parties: 1850 TL (fixed fee)
    ],
    'Kira': [
      { count: PARTY_COUNT_THRESHOLDS.TWO_PARTIES, rate: HOURLY_RATE_VALUES.RENT * PARTY_MULTIPLIER.TWO_PARTY },      // For 2 parties: 835 TL * 2 (835 × per party × number of parties)
      { count: PARTY_COUNT_THRESHOLDS.SMALL_GROUP, rate: FIXED_FEES.RENT.SMALL_GROUP },         // For 3-5 parties: 1750 TL (fixed fee)
      { count: PARTY_COUNT_THRESHOLDS.MEDIUM_GROUP, rate: FIXED_FEES.RENT.MEDIUM_GROUP },        // For 6-10 parties: 1850 TL (fixed fee)
      { count: PARTY_COUNT_THRESHOLDS.UNLIMITED, rate: FIXED_FEES.RENT.LARGE_GROUP },  // For 11+ parties: 1950 TL (fixed fee)
    ],
    'Aile': [
      { count: PARTY_COUNT_THRESHOLDS.TWO_PARTIES, rate: HOURLY_RATE_VALUES.FAMILY * PARTY_MULTIPLIER.TWO_PARTY },      // For 2 parties: 785 TL * 2 (785 × per party × number of parties)
      { count: PARTY_COUNT_THRESHOLDS.SMALL_GROUP, rate: FIXED_FEES.FAMILY.SMALL_GROUP },         // For 3-5 parties: 1650 TL (fixed fee)
      { count: PARTY_COUNT_THRESHOLDS.MEDIUM_GROUP, rate: FIXED_FEES.FAMILY.MEDIUM_GROUP },        // For 6-10 parties: 1750 TL (fixed fee)
      { count: PARTY_COUNT_THRESHOLDS.UNLIMITED, rate: FIXED_FEES.FAMILY.LARGE_GROUP },  // For 11+ parties: 1850 TL (fixed fee)
    ],
    'Ortaklığın Giderilmesi': [
      { count: PARTY_COUNT_THRESHOLDS.TWO_PARTIES, rate: HOURLY_RATE_VALUES.PARTNERSHIP_DISSOLUTION * PARTY_MULTIPLIER.TWO_PARTY },     // For 2 parties: 900 TL * 2 (900 × per party × number of parties)
      { count: PARTY_COUNT_THRESHOLDS.SMALL_GROUP, rate: FIXED_FEES.PARTNERSHIP_DISSOLUTION.SMALL_GROUP },         // For 3-5 parties: 2000 TL (fixed fee)
      { count: PARTY_COUNT_THRESHOLDS.MEDIUM_GROUP, rate: FIXED_FEES.PARTNERSHIP_DISSOLUTION.MEDIUM_GROUP },        // For 6-10 parties: 2100 TL (fixed fee)
      { count: PARTY_COUNT_THRESHOLDS.UNLIMITED, rate: FIXED_FEES.PARTNERSHIP_DISSOLUTION.LARGE_GROUP },  // For 11+ parties: 2200 TL (fixed fee)
    ],
    'Diğer': [
      { count: PARTY_COUNT_THRESHOLDS.TWO_PARTIES, rate: HOURLY_RATE_VALUES.OTHER * PARTY_MULTIPLIER.TWO_PARTY },      // For 2 parties: 785 TL * 2 (785 × per party × number of parties)
      { count: PARTY_COUNT_THRESHOLDS.SMALL_GROUP, rate: FIXED_FEES.OTHER.SMALL_GROUP },         // For 3-5 parties: 1650 TL (fixed fee)
      { count: PARTY_COUNT_THRESHOLDS.MEDIUM_GROUP, rate: FIXED_FEES.OTHER.MEDIUM_GROUP },        // For 6-10 parties: 1750 TL (fixed fee)
      { count: PARTY_COUNT_THRESHOLDS.UNLIMITED, rate: FIXED_FEES.OTHER.LARGE_GROUP },  // For 11+ parties: 1850 TL (fixed fee)
    ],
  },
  minimumFees: {
    general: MINIMUM_FEES.GENERAL,
    commercial: MINIMUM_FEES.COMMERCIAL,
  },
  brackets: [
    { limit: BRACKET_LIMITS.FIRST, rate: BRACKET_RATES.FIRST },
    { limit: BRACKET_LIMITS.SECOND, rate: BRACKET_RATES.SECOND },
    { limit: BRACKET_LIMITS.THIRD, rate: BRACKET_RATES.THIRD },
    { limit: BRACKET_LIMITS.FOURTH, rate: BRACKET_RATES.FOURTH },
    { limit: BRACKET_LIMITS.FIFTH, rate: BRACKET_RATES.FIFTH },
    { limit: BRACKET_LIMITS.SIXTH, rate: BRACKET_RATES.SIXTH },
    { limit: BRACKET_LIMITS.SEVENTH, rate: BRACKET_RATES.SEVENTH },
    { limit: BRACKET_LIMITS.FINAL, rate: BRACKET_RATES.FINAL },
  ],
};
