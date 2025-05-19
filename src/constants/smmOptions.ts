// This file contains constants and types related to SMM (Serbest Meslek Makbuzu) calculations.
// It includes the calculation types, rates, and result structures for both real and legal persons.

export const KDV_RATE = 0.20; 
export const STOPAJ_RATE = 0.20; 

export enum SMMCalculationType {
  KDV_DAHIL_STOPAJ_YOK = 'KDV_DAHIL_STOPAJ_YOK',
  KDV_DAHIL_STOPAJ_VAR = 'KDV_DAHIL_STOPAJ_VAR',
  KDV_HARIC_STOPAJ_YOK = 'KDV_HARIC_STOPAJ_YOK',
  KDV_HARIC_STOPAJ_VAR = 'KDV_HARIC_STOPAJ_VAR',
}

export const smmCalculationTypeOptions = [
  { label: 'KDV Dahil, Stopaj Yok', value: SMMCalculationType.KDV_DAHIL_STOPAJ_YOK },
  { label: 'KDV Dahil, Stopaj Var', value: SMMCalculationType.KDV_DAHIL_STOPAJ_VAR },
  { label: 'KDV Hariç, Stopaj Yok', value: SMMCalculationType.KDV_HARIC_STOPAJ_YOK },
  { label: 'KDV Hariç, Stopaj Var', value: SMMCalculationType.KDV_HARIC_STOPAJ_VAR },
];

export interface SMMInput {
  mediationFee: number;
  calculationType: SMMCalculationType;
}

export interface SMMResultRow {
  label: string;
  gercekKisiAmount: number | null; // Amount for Real Person
  tuzelKisiAmount: number | null;  // Amount for Legal Entity
}

export interface SMMResults {
  rows: SMMResultRow[];
  warningMessage?: string; // Optional message for specific scenarios
}

export const smmResultTableLabels = {
  mediationFee: 'Arabuluculuk Ücreti',
  kdv: `KDV (%${KDV_RATE * 100})`,
  stopaj: `Stopaj (%${STOPAJ_RATE * 100})`,
  araToplam: 'Ara Toplam', // Intermediate sum if needed
  gelirVergisiStopaji: 'Gelir Vergisi Stopajı', // Specific for some calculations
  netUcret: 'Net Ücret',
  tahsilEdilecek: 'Tahsil Edilecek Tutar',
};

// Constants for identifying who the calculation is for
export const PERSON_TYPE_GERCEK = 'Gerçek Kişi';
export const PERSON_TYPE_TUZEL = 'Tüzel Kişi';
