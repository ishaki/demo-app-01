export type DataType = 'Text' | 'Date' | 'Integer' | 'Decimal';

export type AppliesTo = 'All' | 'Japan' | 'Taiwan' | 'Japan/Taiwan' | 'Mauritius' | 'Colombia' |
  'El Salvador' | 'Guatemala' | 'Honduras' | 'Panama' | 'Costa Rica' | 'Sea' | 'Air' | 'Theft';

export type Category =
  | 'Identifiers'
  | 'Order References'
  | 'Container Info'
  | 'Value & Customs'
  | 'Air Freight'
  | 'Sea Freight'
  | 'Schedule'
  | 'Carrier'
  | 'Documentation'
  | 'Location'
  | 'Japan Specific'
  | 'Theft Tracking'
  | 'Notes';

export type Country =
  | 'Japan'
  | 'Taiwan'
  | 'Colombia'
  | 'Costa Rica'
  | 'El Salvador'
  | 'Guatemala'
  | 'Honduras'
  | 'Mauritius'
  | 'Panama';

export type Mode = 'Air' | 'Sea';

export interface FieldDefinition {
  fieldName: string;
  required: boolean;
  dataType: DataType;
  appliesTo: AppliesTo[];
  category: Category;
  description: string;
  example: string;
}

// Line Item (Product Detail) - can have multiple per shipment
export interface ShipmentLineItem {
  id: string; // Unique identifier for each line item
  Delivery?: string;
  SKU?: string;
  Description?: string;
  Cases?: number;
  Sticks?: number;
  Gross_Kilos?: number;
  Net_Kilos?: number;
}

// Main Shipment Header Data
export interface ShipmentData {
  // Identifiers
  Shipment?: string;
  Loading_Date?: string;
  Mode?: Mode;
  Destination_Country?: Country;
  End_Market?: string;
  Freight_Forwarder?: string;

  // Order References
  Sales_Order?: string;
  STO?: string;
  GBA1_JP21?: string;
  US41_Shorefair_GBA1?: string;
  '2nd_Delivery'?: string;

  // Line Items (Product Details)
  lineItems: ShipmentLineItem[];

  // Quantity (Aggregate/Container level)
  Pallets?: number;
  Pallets_Per_Case?: string;
  Pallet_Dimensions?: string;

  // Value & Customs
  Value?: number;
  HS_Code?: string;
  Date_Code?: string;
  Price?: number;
  Price_Per_Unit?: string;
  Cost_Per_Case?: number;
  CIF_Los_Angeles?: string;
  Incoterm?: string;

  // Air Freight
  AWB?: string;
  AWB_Booking?: string;
  Airline?: string;
  Departure_Airport?: string;

  // Sea Freight
  Container_No?: string;
  Seal_No?: string;
  Booking_No?: string;
  BOL_No?: string;
  Data_Logger_Serial?: string;

  // Schedule
  ETD?: string;
  ETS?: string;
  ETA?: string;
  ETA_Tokyo?: string;
  Lead_Time_Days?: string;
  Arrived_Memphis?: string;
  Arrived_LA_Port?: string;
  COB_Rail?: string;
  COB_Sail?: string;

  // Carrier
  Vessel?: string;
  Shipping_Line?: string;
  Original_Vessel?: string;
  Final_Vessel?: string;
  Transhipments?: string;

  // Documentation
  Date_CI_PL_Drafted?: string;
  Date_CI_PL_Printed?: string;
  Date_TTB_Drafted?: string;
  Date_TTB_Printed?: string;
  Dated_TTB_Received_Signed?: string;
  Date_Final_Docs_Sent?: string;
  Date_Docs_Have_To_Be_Sent?: string;
  Docs_Sent_To_Tax?: string;
  Final_Docs_Complete?: string;
  Final_Docs_To_EM?: string;
  TTB_Complete?: string;
  Tax_Status?: string;
  Estimated_SWB_Available?: string;
  Accounting_Doc?: string;

  // Location
  Port_Of_Departure?: string;
  Port_Of_Delivery?: string;
  Final_Place_Of_Delivery?: string;
  CNEE_Address?: string;

  // Japan Specific
  Tape_Color?: string;
  Container_Checklist_Recorded?: string;
  STO_Date_Updated?: string;

  // Theft Tracking
  Cases_Stolen?: number;
  Sticks_Stolen?: number;
  Difference_Remaining?: number;
  Percent_Pilfered?: number;
  Seals_Broken?: string;
  Value_Of_Stolen_Items?: number;

  // Notes
  Notes?: string;
}
