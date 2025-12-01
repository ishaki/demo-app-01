import { FieldDefinition, Mode, Country } from '../types/shipment';
import { fieldDefinitions } from './fieldConfig';
import { isFieldVisible } from './fieldUtils';

/**
 * Maps field names to wizard step numbers
 * Based on Excel template column order (left-to-right user workflow)
 */
export const fieldStepMap: Record<string, number> = {
  // Step 1: Basic Information
  Shipment: 1,
  Loading_Date: 1,
  Mode: 1,
  Destination_Country: 1,
  End_Market: 1,
  Freight_Forwarder: 1,

  // Step 2: Order References
  Sales_Order: 2,
  STO: 2,
  GBA1_JP21: 2,
  US41_Shorefair_GBA1: 2,
  Delivery: 2,
  '2nd_Delivery': 2,

  // Step 3: Product Details (Line Items Table + Container Info)
  // Note: SKU, Description, Cases, Sticks, Gross_Kilos, Net_Kilos are in LineItemsTable
  Pallets: 3,
  Pallets_Per_Case: 3,
  Pallet_Dimensions: 3,

  // Step 4: Value & Customs
  Value: 4,
  HS_Code: 4,
  Date_Code: 4,
  Price: 4,
  Price_Per_Unit: 4,
  Cost_Per_Case: 4,
  CIF_Los_Angeles: 4,
  Incoterm: 4,

  // Step 5 (Dynamic): Air Freight (if Mode === 'Air')
  AWB: 5,
  AWB_Booking: 5,
  Airline: 5,
  Departure_Airport: 5,

  // Step 5 (Dynamic): Sea Freight (if Mode === 'Sea')
  Container_No: 5,
  Seal_No: 5,
  Booking_No: 5,
  BOL_No: 5,
  Data_Logger_Serial: 5,

  // Step 6: Schedule & Timeline
  ETD: 6,
  ETS: 6,
  ETA: 6,
  ETA_Tokyo: 6,
  Lead_Time_Days: 6,
  Arrived_Memphis: 6,
  Arrived_LA_Port: 6,
  COB_Rail: 6,
  COB_Sail: 6,

  // Step 7: Carrier Details
  Vessel: 7,
  Shipping_Line: 7,
  Original_Vessel: 7,
  Final_Vessel: 7,
  Transhipments: 7,

  // Step 8: Documentation Tracking
  Date_CI_PL_Drafted: 8,
  Date_CI_PL_Printed: 8,
  Date_TTB_Drafted: 8,
  Date_TTB_Printed: 8,
  Dated_TTB_Received_Signed: 8,
  Date_Final_Docs_Sent: 8,
  Date_Docs_Have_To_Be_Sent: 8,
  Docs_Sent_To_Tax: 8,
  Final_Docs_Complete: 8,
  Final_Docs_To_EM: 8,
  TTB_Complete: 8,
  Tax_Status: 8,
  Estimated_SWB_Available: 8,
  Accounting_Doc: 8,

  // Step 9: Location & Delivery
  Port_Of_Departure: 9,
  Port_Of_Delivery: 9,
  Final_Place_Of_Delivery: 9,
  CNEE_Address: 9,

  // Step 10: Japan-Specific
  Tape_Color: 10,
  Container_Checklist_Recorded: 10,
  STO_Date_Updated: 10,

  // Step 11: Theft Tracking & Notes
  Cases_Stolen: 11,
  Sticks_Stolen: 11,
  Difference_Remaining: 11,
  Percent_Pilfered: 11,
  Seals_Broken: 11,
  Value_Of_Stolen_Items: 11,
  Notes: 11,
};

/**
 * Step metadata for display and navigation
 */
export interface StepMetadata {
  number: number;
  title: string;
  description: string;
  isConditional: boolean;
  condition?: (mode?: Mode, country?: Country) => boolean;
}

export const stepMetadata: StepMetadata[] = [
  {
    number: 1,
    title: 'Basic Information',
    description: 'Shipment ID, dates, mode, and destination',
    isConditional: false,
  },
  {
    number: 2,
    title: 'Order References',
    description: 'SAP orders, STO, and delivery numbers',
    isConditional: false,
  },
  {
    number: 3,
    title: 'Product Details',
    description: 'Add product line items and container information',
    isConditional: false,
  },
  {
    number: 4,
    title: 'Value & Customs',
    description: 'Pricing, HS codes, and customs information',
    isConditional: false,
  },
  {
    number: 5,
    title: 'Freight Details',
    description: 'Air or Sea freight specific information',
    isConditional: true,
    condition: (mode) => mode === 'Air' || mode === 'Sea',
  },
  {
    number: 6,
    title: 'Schedule & Timeline',
    description: 'Departure, arrival, and milestone dates',
    isConditional: false,
  },
  {
    number: 7,
    title: 'Carrier Details',
    description: 'Vessel and shipping line information',
    isConditional: true,
    condition: (mode) => mode === 'Sea',
  },
  {
    number: 8,
    title: 'Documentation',
    description: 'Document tracking and compliance',
    isConditional: false,
  },
  {
    number: 9,
    title: 'Location & Delivery',
    description: 'Ports and delivery addresses',
    isConditional: false,
  },
  {
    number: 10,
    title: 'Japan-Specific',
    description: 'Japan operational requirements',
    isConditional: true,
    condition: (mode, country) => country === 'Japan',
  },
  {
    number: 11,
    title: 'Theft Tracking & Notes',
    description: 'Loss tracking and additional comments',
    isConditional: false,
  },
  {
    number: 12,
    title: 'Review & Submit',
    description: 'Review all information and submit',
    isConditional: false,
  },
];

/**
 * Get fields for a specific step
 */
export const getStepFields = (
  stepNumber: number,
  mode?: Mode,
  country?: Country
): FieldDefinition[] => {
  return fieldDefinitions.filter(
    (field) =>
      fieldStepMap[field.fieldName] === stepNumber &&
      isFieldVisible(field, country, mode)
  );
};

/**
 * Get visible steps based on mode and country
 */
export const getVisibleSteps = (mode?: Mode, country?: Country): StepMetadata[] => {
  return stepMetadata.filter((step) => {
    if (!step.isConditional) return true;
    if (!step.condition) return true;
    return step.condition(mode, country);
  });
};

/**
 * Get total number of visible steps
 */
export const getTotalSteps = (mode?: Mode, country?: Country): number => {
  return getVisibleSteps(mode, country).length;
};

/**
 * Get step title by number
 */
export const getStepTitle = (stepNumber: number, mode?: Mode): string => {
  const step = stepMetadata.find((s) => s.number === stepNumber);
  if (!step) return 'Unknown Step';

  // Customize title for Step 5 based on mode
  if (stepNumber === 5) {
    if (mode === 'Air') return 'Air Freight Details';
    if (mode === 'Sea') return 'Sea Freight Details';
    return 'Freight Details';
  }

  return step.title;
};

/**
 * Check if a step has any visible fields
 */
export const stepHasVisibleFields = (
  stepNumber: number,
  mode?: Mode,
  country?: Country
): boolean => {
  // Step 3 always has line items table
  if (stepNumber === 3) return true;

  // Step 12 is always review
  if (stepNumber === 12) return true;

  const fields = getStepFields(stepNumber, mode, country);
  return fields.length > 0;
};
