import { ShipmentData } from '../types/shipment';

/**
 * Auto-calculation utilities for shipment wizard
 * These functions compute derived values based on user inputs
 */

/**
 * Calculate Lead Time in days (ETA - ETD)
 * Returns null if dates are invalid or ETA is before/equal to ETD
 */
export const calculateLeadTimeDays = (etd?: string, eta?: string): number | null => {
  if (!etd || !eta) return null;

  try {
    const etdDate = new Date(etd);
    const etaDate = new Date(eta);

    // Validation: ETA must be after ETD
    if (etaDate <= etdDate) return null;

    const diffTime = Math.abs(etaDate.getTime() - etdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  } catch {
    return null;
  }
};

/**
 * Calculate Price Per Unit (Total Price ÷ Total Cases)
 * Used for Japan shipments
 */
export const calculatePricePerUnit = (totalPrice?: number, totalCases?: number): number | null => {
  if (!totalPrice || !totalCases || totalCases === 0) return null;
  return totalPrice / totalCases;
};

/**
 * Calculate total cases from line items
 */
export const calculateTotalCases = (formData: ShipmentData): number => {
  return formData.lineItems.reduce((sum, item) => sum + (item.Cases || 0), 0);
};

/**
 * Calculate total sticks from line items
 */
export const calculateTotalSticks = (formData: ShipmentData): number => {
  return formData.lineItems.reduce((sum, item) => sum + (item.Sticks || 0), 0);
};

/**
 * Calculate total gross weight from line items
 */
export const calculateTotalGrossKilos = (formData: ShipmentData): number => {
  return formData.lineItems.reduce((sum, item) => sum + (item.Gross_Kilos || 0), 0);
};

/**
 * Calculate total net weight from line items
 */
export const calculateTotalNetKilos = (formData: ShipmentData): number => {
  return formData.lineItems.reduce((sum, item) => sum + (item.Net_Kilos || 0), 0);
};

/**
 * Calculate percentage pilfered (Cases_Stolen / Total Cases * 100)
 * Returns null if total cases is 0 or data is missing
 */
export const calculatePercentPilfered = (
  casesStolen?: number,
  totalCases?: number
): number | null => {
  if (casesStolen === undefined || !totalCases || totalCases === 0) return null;
  return (casesStolen / totalCases) * 100;
};

/**
 * Calculate value of stolen items (Cases_Stolen * Cost_Per_Case)
 * Returns null if data is missing
 */
export const calculateValueOfStolenItems = (
  casesStolen?: number,
  costPerCase?: number
): number | null => {
  if (casesStolen === undefined || !costPerCase) return null;
  return casesStolen * costPerCase;
};

/**
 * Calculate sticks pilfered (Cases_Stolen * sticks per case)
 * Assumes average sticks per case from line items
 */
export const calculateSticksPilfered = (
  formData: ShipmentData,
  casesStolen?: number
): number | null => {
  if (!casesStolen) return null;

  const totalCases = calculateTotalCases(formData);
  const totalSticks = calculateTotalSticks(formData);

  if (totalCases === 0) return null;

  const sticksPerCase = totalSticks / totalCases;
  return Math.round(casesStolen * sticksPerCase);
};

/**
 * Comprehensive auto-calculations for a shipment
 * Returns all calculated fields in one object
 */
export const calculateAllDerivedFields = (formData: ShipmentData) => {
  const totalCases = calculateTotalCases(formData);
  const totalSticks = calculateTotalSticks(formData);
  const totalGrossKilos = calculateTotalGrossKilos(formData);
  const totalNetKilos = calculateTotalNetKilos(formData);

  const leadTimeDays = calculateLeadTimeDays(formData.ETD, formData.ETA);
  const pricePerUnit = calculatePricePerUnit(formData.Price, totalCases);
  const percentPilfered = calculatePercentPilfered(formData.Cases_Stolen, totalCases);
  const valueOfStolenItems = calculateValueOfStolenItems(
    formData.Cases_Stolen,
    formData.Cost_Per_Case
  );
  const sticksPilfered = calculateSticksPilfered(formData, formData.Cases_Stolen);

  return {
    // Totals from line items
    totalCases,
    totalSticks,
    totalGrossKilos,
    totalNetKilos,

    // Date calculations
    leadTimeDays,

    // Pricing calculations
    pricePerUnit,

    // Theft calculations
    percentPilfered,
    valueOfStolenItems,
    sticksPilfered,
  };
};

/**
 * Format calculation display with appropriate units
 */
export const formatCalculatedValue = (
  value: number | null,
  type: 'days' | 'currency' | 'percentage' | 'number' | 'weight'
): string => {
  if (value === null) return 'N/A';

  switch (type) {
    case 'days':
      return `${value} day${value !== 1 ? 's' : ''}`;
    case 'currency':
      return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case 'percentage':
      return `${value.toFixed(2)}%`;
    case 'weight':
      return `${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kg`;
    case 'number':
    default:
      return value.toLocaleString();
  }
};

/**
 * Validation helper: Check if calculated value is valid and within expected range
 */
export const isCalculatedValueValid = (
  value: number | null,
  min?: number,
  max?: number
): boolean => {
  if (value === null) return false;
  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;
  return true;
};
