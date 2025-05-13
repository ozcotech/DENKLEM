export const TARIFF_2025 = {
  hourlyRates: {
    'İşçi-İşveren': 785,
    'Ticari': 1150,
    'Tüketici': 785,
    'Kira': 835,
    'Aile': 785,
    'Diğer': 785,
    'Ortaklığın Giderilmesi': 900,
  },
  partyBasedRates: {
    'İşçi-İşveren': [
      { count: 2, rate: 785 * 2 },       // For 2 parties: 785 TL * 2 (785 × per party × number of parties)
      { count: 5, rate: 1650 },         // For 3-5 parties: 1650 TL (fixed fee)
      { count: 10, rate: 1750 },        // For 6-10 parties: 1750 TL (fixed fee)
      { count: Infinity, rate: 1850 },  // For 11+ parties: 1850 TL (fixed fee)
    ],
    'Ticari': [
      { count: 2, rate: 1150 * 2 },     // For 2 parties: 1150 TL * 2 (1150 × per party × number of parties)
      { count: 5, rate: 2350 },         // For 3-5 parties: 2350 TL (fixed fee)
      { count: 10, rate: 2450 },        // For 6-10 parties: 2450 TL (fixed fee)
      { count: Infinity, rate: 2550 },  // For 11+ parties: 2550 TL (fixed fee)
    ],
    'Tüketici': [
      { count: 2, rate: 785 * 2 },      // For 2 parties: 785 TL * 2 (785 × per party × number of parties)
      { count: 5, rate: 1650 },         // For 3-5 parties: 1650 TL (fixed fee)
      { count: 10, rate: 1750 },        // For 6-10 parties: 1750 TL (fixed fee)
      { count: Infinity, rate: 1850 },  // For 11+ parties: 1850 TL (fixed fee)
    ],
    'Kira': [
      { count: 2, rate: 835 * 2 },      // For 2 parties: 835 TL * 2 (835 × per party × number of parties)
      { count: 5, rate: 1750 },         // For 3-5 parties: 1750 TL (fixed fee)
      { count: 10, rate: 1850 },        // For 6-10 parties: 1850 TL (fixed fee)
      { count: Infinity, rate: 1950 },  // For 11+ parties: 1950 TL (fixed fee)
    ],
    'Aile': [
      { count: 2, rate: 785 * 2 },      // For 2 parties: 785 TL * 2 (785 × per party × number of parties)
      { count: 5, rate: 1650 },         // For 3-5 parties: 1650 TL (fixed fee)
      { count: 10, rate: 1750 },        // For 6-10 parties: 1750 TL (fixed fee)
      { count: Infinity, rate: 1850 },  // For 11+ parties: 1850 TL (fixed fee)
    ],
    'Ortaklığın Giderilmesi': [
      { count: 2, rate: 900 * 2 },     // For 2 parties: 900 TL * 2 (900 × per party × number of parties)
      { count: 5, rate: 2000 },         // For 3-5 parties: 2000 TL (fixed fee)
      { count: 10, rate: 2100 },        // For 6-10 parties: 2100 TL (fixed fee)
      { count: Infinity, rate: 2200 },  // For 11+ parties: 2200 TL (fixed fee)
    ],
    'Diğer': [
      { count: 2, rate: 785 * 2 },      // For 2 parties: 785 TL * 2 (785 × per party × number of parties)
      { count: 5, rate: 1650 },         // For 3-5 parties: 1650 TL (fixed fee)
      { count: 10, rate: 1750 },        // For 6-10 parties: 1750 TL (fixed fee)
      { count: Infinity, rate: 1850 },  // For 11+ parties: 1850 TL (fixed fee)
    ],
  },
  minimumFees: {
    general: 6000,
    commercial: 9000,
  },
  brackets: [
    { limit: 300000, rate: 0.06 },
    { limit: 780000, rate: 0.05 },
    { limit: 1560000, rate: 0.04 },
    { limit: 4680000, rate: 0.03 },
    { limit: 6240000, rate: 0.02 },
    { limit: 12480000, rate: 0.015 },
    { limit: 26520000, rate: 0.01 },
    { limit: Infinity, rate: 0.005 },
  ],
};
