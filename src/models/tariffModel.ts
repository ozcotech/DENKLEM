import { TARIFF_2025 } from '../constants/tariffs_2025';
import { TARIFF_CALCULATION, DISPUTE_TYPES, DISPUTE_TYPE_KEYWORDS } from '../constants/dimensions';

// Helper function to map dispute types from UI to tariff keys
function mapDisputeTypeToTariffKey(disputeType?: string): string {
  if (!disputeType) return DISPUTE_TYPES.DEFAULT;
  
  if (disputeType.includes(DISPUTE_TYPE_KEYWORDS.RENT)) return DISPUTE_TYPES.RENT;
  if (disputeType.includes(DISPUTE_TYPE_KEYWORDS.PARTNERSHIP)) return DISPUTE_TYPES.PARTNERSHIP_DISSOLUTION;
  
  // For exact matches or default case
  return disputeType;
}

// Helper function to calculate fee based on party count
function calculateFeeByPartyCount(disputeType?: string, partyCount: number = TARIFF_CALCULATION.VALIDATION.MIN_PARTY_COUNT): number {
  // Map the dispute type to a valid key
  const mappedType = mapDisputeTypeToTariffKey(disputeType);
  
  // Get the rate brackets for this dispute type
  const rateTable = TARIFF_2025.partyBasedRates[mappedType as keyof typeof TARIFF_2025.partyBasedRates] || 
                   TARIFF_2025.partyBasedRates[DISPUTE_TYPES.DEFAULT];

  // In case of non-agreement, a minimum of 2 hours must be calculated
  // We will multiply the result by the minimum hours multiplier in all cases
  
  // Find the appropriate rate for this party count
  for (const entry of rateTable) {
    if (partyCount <= entry.count) {
      // Multiply the calculated fee by minimum hours multiplier (for 2 hours minimum)
      return entry.rate * TARIFF_CALCULATION.MINIMUM_HOURS_MULTIPLIER;
    }
  }
  
  // Fallback to the highest rate if no bracket matches
  const lastIndex = rateTable.length - TARIFF_CALCULATION.ARRAY_ACCESS.LAST_INDEX_OFFSET;
  return rateTable[lastIndex].rate * TARIFF_CALCULATION.MINIMUM_HOURS_MULTIPLIER;
}

type FeeParams = {
  isAgreement: boolean;
  isMonetary: boolean;
  amount?: number;
  partyCount: number;
  disputeType?: string;
};

export function calculateMediationFee(params: FeeParams): number {
  const { isAgreement, isMonetary, amount, partyCount, disputeType } = params;

  if (!partyCount || partyCount <= TARIFF_CALCULATION.VALIDATION.MIN_PARTY_COUNT) return 0;

  if (isMonetary) {
    if (isAgreement) {
      if (!amount || amount <= TARIFF_CALCULATION.VALIDATION.MIN_AMOUNT) return 0;

      const brackets = TARIFF_2025.brackets;

      let fee = 0;
      let remaining = amount;
      let lastLimit = 0;

      for (const bracket of brackets) {
        const range = bracket.limit - lastLimit;
        const applicable = Math.min(remaining, range);
        fee += applicable * bracket.rate;
        remaining -= applicable;
        lastLimit = bracket.limit;
        if (remaining <= TARIFF_CALCULATION.VALIDATION.MIN_AMOUNT) break;
      }

      // Determine minimum fee
      const mappedDisputeType = mapDisputeTypeToTariffKey(disputeType);
      const isCommercial = 
        mappedDisputeType === DISPUTE_TYPES.COMMERCIAL || mappedDisputeType === DISPUTE_TYPES.PARTNERSHIP_DISSOLUTION;
      const minFee = isCommercial ? TARIFF_2025.minimumFees.commercial : TARIFF_2025.minimumFees.general;

      return Math.max(fee, minFee);
    } else {
      // Non-agreement case - calculate based on the number of parties
      return calculateFeeByPartyCount(disputeType, partyCount);
    }
  } else {
    // Non-monetary disputes - calculate based on the number of parties
    return calculateFeeByPartyCount(disputeType, partyCount);
  }
}