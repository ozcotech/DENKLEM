// filepath: /Users/ozkan/MEDPAY_react/src/utils/smmCalculator.ts
/**
 * Calculates detailed SMM (Serbest Meslek Makbuzu) breakdown for mediation fees,
 * for both legal and real persons, according to the selected calculation type.
 * Returns a row-by-row structure suitable for UI table rendering.
 */
import {
  SMMInput,
  SMMResults,
  SMMResultRow,
  SMMCalculationType,
  KDV_RATE,
  STOPAJ_RATE,
  smmResultTableLabels,
} from '../constants/smmOptions';

export const calculateSMM = (input: SMMInput): SMMResults => {
  const { mediationFee, calculationType } = input;
  let rows: SMMResultRow[] = [];

  // Variables to hold calculated amounts for each scenario
  // These will be populated within each case block
  let brutTuzel: number | null = null;
  let brutGercek: number | null = null;
  let kdvTuzel: number | null = null;
  let kdvGercek: number | null = null;
  let stopajTuzel: number | null = null;
  let stopajGercek: number | null = null;
  let netTuzel: number | null = null;
  let netGercek: number | null = null;
  let tahsilTuzel: number | null = null;
  let tahsilGercek: number | null = null;

  switch (calculationType) {
    case SMMCalculationType.KDV_DAHIL_STOPAJ_VAR: // Python: KDV_STOPAJ_DAHIL (Option 1)
      // mediationFee is KDV-inclusive
      const brut_opt1 = mediationFee / (1 + KDV_RATE);
      const kdv_opt1 = brut_opt1 * KDV_RATE;
      
      stopajTuzel = brut_opt1 * STOPAJ_RATE;
      stopajGercek = 0;
      
      netTuzel = brut_opt1 - stopajTuzel;
      netGercek = brut_opt1;
      
      tahsilTuzel = brut_opt1; // Per Python logic
      tahsilGercek = brut_opt1 + kdv_opt1;

      brutTuzel = brut_opt1;
      brutGercek = brut_opt1;
      kdvTuzel = kdv_opt1;
      kdvGercek = kdv_opt1;
      break;

    case SMMCalculationType.KDV_DAHIL_STOPAJ_YOK: // Python: KDV_DAHIL_STOPAJ_HARIC (Option 2)
      // Gerçek Kişi: mediationFee is KDV-inclusive, Stopaj is 0.
      brutGercek = mediationFee / (1 + KDV_RATE);
      kdvGercek = brutGercek * KDV_RATE;
      stopajGercek = 0;
      netGercek = brutGercek;
      tahsilGercek = mediationFee;

      // Tüzel Kişi: mediationFee is brut (KDV-exclusive), Stopaj is calculated (per Python's specific logic for this option).
      brutTuzel = mediationFee; 
      kdvTuzel = brutTuzel * KDV_RATE;
      stopajTuzel = brutTuzel * STOPAJ_RATE; 
      netTuzel = brutTuzel - stopajTuzel;
      tahsilTuzel = brutTuzel;
      break;

    case SMMCalculationType.KDV_HARIC_STOPAJ_YOK: // Python: KDV_STOPAJ_HARIC (Option 3)
      // Gerçek Kişi: mediationFee is brut (KDV-exclusive), Stopaj is 0.
      brutGercek = mediationFee;
      kdvGercek = brutGercek * KDV_RATE;
      stopajGercek = 0;
      netGercek = brutGercek;
      tahsilGercek = brutGercek + kdvGercek;

      // Tüzel Kişi: mediationFee is net_tuzel (after stopaj deduction from brut).
      netTuzel = mediationFee; 
      brutTuzel = netTuzel / (1 - STOPAJ_RATE); 
      kdvTuzel = brutTuzel * KDV_RATE;
      stopajTuzel = brutTuzel * STOPAJ_RATE;
      // netTuzel is already mediationFee.
      tahsilTuzel = brutTuzel;
      break;

    case SMMCalculationType.KDV_HARIC_STOPAJ_VAR: // Python: KDV_HARIC_STOPAJ_DAHIL (Option 4)
      // mediationFee is brut (KDV-exclusive). Stopaj is calculated.
      const brut_opt4 = mediationFee;
      const kdv_opt4 = brut_opt4 * KDV_RATE;

      brutTuzel = brut_opt4;
      brutGercek = brut_opt4;
      kdvTuzel = kdv_opt4;
      kdvGercek = kdv_opt4;
      
      stopajGercek = 0;
      netGercek = brut_opt4;
      tahsilGercek = brut_opt4 + kdv_opt4;
      
      stopajTuzel = brut_opt4 * STOPAJ_RATE;
      netTuzel = brut_opt4 - stopajTuzel;
      tahsilTuzel = brut_opt4;
      break;

    default:
      // Should not happen with TypeScript enums
      throw new Error(`Unknown calculation type: ${calculationType}`);
  }

  rows = [
    {
      label: smmResultTableLabels.mediationFee, // "Brüt (KDV Hariç)"
      tuzelKisiAmount: brutTuzel,
      gercekKisiAmount: brutGercek,
    },
    {
      label: smmResultTableLabels.gelirVergisiStopaji, // "Gelir Vergisi Stopajı (%20)"
      tuzelKisiAmount: stopajTuzel,
      gercekKisiAmount: stopajGercek,
    },
    {
      label: smmResultTableLabels.netUcret, // "Alınan Net Ücret"
      tuzelKisiAmount: netTuzel,
      gercekKisiAmount: netGercek,
    },
    {
      label: smmResultTableLabels.kdv, // "KDV (%20)"
      tuzelKisiAmount: kdvTuzel,
      gercekKisiAmount: kdvGercek,
    },
    {
      label: smmResultTableLabels.tahsilEdilecek, // "Tahsil Edilen Ücret"
      tuzelKisiAmount: tahsilTuzel,
      gercekKisiAmount: tahsilGercek,
    },
  ];

  return {
    rows,
  };
};
