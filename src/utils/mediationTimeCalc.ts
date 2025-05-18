import { DISPUTE_TYPES, DisputeType } from '../constants/disputes_time';

/**
 * Calculates target dates for each week interval starting from the given date.
 * @param startDate - Date in 'DD.MM.YYYY' format
 * @returns { [week: number]: Date }
 */
export function calculateWeekDates(startDate: string): { [week: number]: Date } {
  // Parse the input date: 'DD.MM.YYYY'
  const [day, month, year] = startDate.split('.').map(Number);
  const baseDate = new Date(year, month - 1, day);

  // Get all unique week intervals
  const allWeeks = Array.from(new Set(
    DISPUTE_TYPES.flatMap(d => d.weekIntervals)
  )).sort((a, b) => a - b);

  // Calculate the result for each week
  const weekDates: { [week: number]: Date } = {};
  allWeeks.forEach(week => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + week * 7);
    weekDates[week] = date;
  });

  return weekDates;
}

/**
 * Returns all available dispute types.
 */
export function getDisputeTypes(): DisputeType[] {
  return DISPUTE_TYPES;
}

/**
 * Checks if the specified week should be calculated for a given dispute type.
 * @param disputeName
 * @param week
 * @returns boolean
 */
export function shouldCalculate(disputeName: string, week: number): boolean {
  const dispute = DISPUTE_TYPES.find(d => d.name === disputeName);
  return dispute ? dispute.weekIntervals.includes(week) : false;
}