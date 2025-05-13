import { TARIFF_2025 } from '../constants/tariffs_2025';

// Helper function to map dispute types from UI to tariff keys
function mapDisputeTypeToTariffKey(disputeType?: string): string {
  if (!disputeType) return 'Diğer';
  
  if (disputeType.includes('Kira')) return 'Kira';
  if (disputeType.includes('Ortaklık')) return 'Ortaklığın Giderilmesi';
  
  // For exact matches or default case
  return disputeType;
}

// Helper function to calculate fee based on party count
function calculateFeeByPartyCount(disputeType?: string, partyCount: number = 0): number {
  // Map the dispute type to a valid key
  const mappedType = mapDisputeTypeToTariffKey(disputeType);
  
  // Get the rate brackets for this dispute type
  const rateTable = TARIFF_2025.partyBasedRates[mappedType as keyof typeof TARIFF_2025.partyBasedRates] || 
                   TARIFF_2025.partyBasedRates['Diğer'];

  // In case of non-agreement, a minimum of 2 hours must be calculated
  // We will multiply the result by 2 in all cases
  
  // Find the appropriate rate for this party count
  for (const entry of rateTable) {
    if (partyCount <= entry.count) {
      // Multiply the calculated fee by 2 (for 2 hours minimum)
      return entry.rate * 2;
    }
  }
  
  // Fallback to the highest rate if no bracket matches
  return rateTable[rateTable.length - 1].rate * 2;
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

  if (!partyCount || partyCount <= 0) return 0;

  if (isMonetary) {
    if (isAgreement) {
      if (!amount || amount <= 0) return 0;

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
        if (remaining <= 0) break;
      }

      // Determine minimum fee
      const mappedDisputeType = mapDisputeTypeToTariffKey(disputeType);
      const isCommercial = 
        mappedDisputeType === 'Ticari' || mappedDisputeType === 'Ortaklığın Giderilmesi';
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