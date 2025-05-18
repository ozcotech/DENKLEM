/**
 * Mediation Dispute Types Constants
 * ---------------------------------
 * This file defines the dispute types used in the mediation process,
 * along with the relevant week intervals for each type that are considered
 * during timeline calculations.
 *
 * These constants are used in the time calculation module (mediationTimeCalc)
 * and related screens. Each dispute type's week intervals are determined
 * in accordance with the applicable regulations.
 *
 * For example:
 * - For Labor Law Disputes: 3 and 4 weeks
 * - For Commercial Law Disputes: 6 and 8 weeks
 *
 * Usage:
 *   import { DISPUTE_TYPES } from 'src/constants/disputes_time';
 */

export type DisputeType = {
  name: string;
  weekIntervals: number[];
};

export const DISPUTE_TYPES: DisputeType[] = [
  { name: "İş Hukuku Uyuşmazlıkları", weekIntervals: [3, 4] },
  { name: "Ticaret Hukuku Uyuşmazlıkları", weekIntervals: [6, 8] },
  { name: "Tüketici Hukuku Uyuşmazlıkları", weekIntervals: [3, 4] },
  { name: "Kira İlişkisinden Kaynaklanan Uyuşmazlıklar", weekIntervals: [3, 4] },
  { name: "Ortaklığın Giderilmesine İlişkin Uyuşmazlıklar", weekIntervals: [3, 4] },
  { name: "Kat Mülkiyeti Kanunundan Kaynaklanan Uyuşmazlıklar", weekIntervals: [3, 4] },
  { name: "Komşu Hukukundan Kaynaklanan Uyuşmazlıklar", weekIntervals: [3, 4] },
  { name: "Tarımsal Üretim Sözleşmesinden Kaynaklanan Uyuşmazlıklar", weekIntervals: [2, 3, 4] },
];