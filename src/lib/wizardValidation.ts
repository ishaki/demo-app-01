import { ShipmentData, Mode, Country } from '../types/shipment';
import { getStepFields } from './wizardStepMapping';

export interface ValidationError {
  field: string;
  message: string;
}

export interface StepValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Validate a specific wizard step
 */
export const validateStep = (
  stepNumber: number,
  formData: ShipmentData,
  mode?: Mode,
  country?: Country
): StepValidationResult => {
  switch (stepNumber) {
    case 1:
      return validateStep1(formData);
    case 2:
      return validateStep2(formData, country);
    case 3:
      return validateStep3(formData);
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      // These steps have no required fields (all optional)
      return { isValid: true, errors: [] };
    case 12:
      // Review step - validate all previous steps
      return validateAllSteps(formData, mode, country);
    default:
      return { isValid: true, errors: [] };
  }
};

/**
 * Step 1: Basic Information Validation
 */
const validateStep1 = (formData: ShipmentData): StepValidationResult => {
  const errors: ValidationError[] = [];

  if (!formData.Shipment || formData.Shipment.trim() === '') {
    errors.push({ field: 'Shipment', message: 'Shipment ID is required' });
  }

  if (!formData.Loading_Date) {
    errors.push({ field: 'Loading_Date', message: 'Loading Date is required' });
  }

  if (!formData.Mode) {
    errors.push({ field: 'Mode', message: 'Transport Mode is required' });
  }

  if (!formData.Destination_Country) {
    errors.push({
      field: 'Destination_Country',
      message: 'Destination Country is required',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Step 2: Order References Validation
 */
const validateStep2 = (
  formData: ShipmentData,
  country?: Country
): StepValidationResult => {
  const errors: ValidationError[] = [];

  if (!formData.STO || formData.STO.trim() === '') {
    errors.push({ field: 'STO', message: 'STO (Stock Transport Order) is required' });
  }

  // Conditional: GBA1_JP21 required for Japan/Taiwan
  if ((country === 'Japan' || country === 'Taiwan') && !formData.GBA1_JP21) {
    errors.push({
      field: 'GBA1_JP21',
      message: `GBA1_JP21 is required for ${country} shipments`,
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Step 3: Product Details Validation
 */
const validateStep3 = (formData: ShipmentData): StepValidationResult => {
  const errors: ValidationError[] = [];

  if (!formData.lineItems || formData.lineItems.length === 0) {
    errors.push({
      field: 'lineItems',
      message: 'At least one product line item is required',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate all steps (used in Review step)
 */
const validateAllSteps = (
  formData: ShipmentData,
  _mode?: Mode,
  country?: Country
): StepValidationResult => {
  const allErrors: ValidationError[] = [];

  // Validate Step 1
  const step1Result = validateStep1(formData);
  allErrors.push(...step1Result.errors);

  // Validate Step 2
  const step2Result = validateStep2(formData, country);
  allErrors.push(...step2Result.errors);

  // Validate Step 3
  const step3Result = validateStep3(formData);
  allErrors.push(...step3Result.errors);

  // Additional cross-field validations
  if (formData.ETD && formData.ETA) {
    const etd = new Date(formData.ETD);
    const eta = new Date(formData.ETA);
    if (eta <= etd) {
      allErrors.push({
        field: 'ETA',
        message: 'ETA must be after ETD',
      });
    }
  }

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
};

/**
 * Get required fields for a step
 */
export const getRequiredFields = (
  stepNumber: number,
  mode?: Mode,
  country?: Country
): string[] => {
  const stepFields = getStepFields(stepNumber, mode, country);
  return stepFields.filter((field) => field.required).map((field) => field.fieldName);
};

/**
 * Check if step can proceed (has all required fields)
 */
export const canProceedFromStep = (
  stepNumber: number,
  formData: ShipmentData,
  mode?: Mode,
  country?: Country
): boolean => {
  const validation = validateStep(stepNumber, formData, mode, country);
  return validation.isValid;
};

/**
 * Get friendly error messages for display
 */
export const getErrorSummary = (errors: ValidationError[]): string => {
  if (errors.length === 0) return '';
  if (errors.length === 1) return errors[0].message;
  return `${errors.length} fields require attention`;
};
