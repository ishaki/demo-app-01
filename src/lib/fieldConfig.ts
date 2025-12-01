import { FieldDefinition, Category } from '../types/shipment';

export const fieldDefinitions: FieldDefinition[] = [
  // Identifiers
  { fieldName: 'Shipment', required: true, dataType: 'Text', appliesTo: ['All'], category: 'Identifiers', description: 'Unique shipment identifier number', example: '5862926' },
  { fieldName: 'Loading_Date', required: true, dataType: 'Date', appliesTo: ['All'], category: 'Identifiers', description: 'Date shipment was loaded at origin', example: '2025-04-17' },
  { fieldName: 'Mode', required: true, dataType: 'Text', appliesTo: ['All'], category: 'Identifiers', description: 'Transport mode: Air or Sea', example: 'Air' },
  { fieldName: 'Destination_Country', required: true, dataType: 'Text', appliesTo: ['All'], category: 'Identifiers', description: 'Target market/destination country', example: 'Japan' },
  { fieldName: 'End_Market', required: false, dataType: 'Text', appliesTo: ['All'], category: 'Identifiers', description: 'End market designation', example: 'Japan' },
  { fieldName: 'Freight_Forwarder', required: false, dataType: 'Text', appliesTo: ['All'], category: 'Identifiers', description: 'Logistics partner (SOS, Bennett, DHL, etc.)', example: 'Bennett' },

  // Order References
  { fieldName: 'Sales_Order', required: false, dataType: 'Text', appliesTo: ['All'], category: 'Order References', description: 'SAP Sales Order number', example: '5329531513' },
  { fieldName: 'STO', required: true, dataType: 'Text', appliesTo: ['All'], category: 'Order References', description: 'Stock Transport Order (US47-XXX format)', example: '4301017845' },
  { fieldName: 'GBA1_JP21', required: false, dataType: 'Text', appliesTo: ['Japan/Taiwan'], category: 'Order References', description: 'Japan/Taiwan internal transfer order', example: '4300984608' },
  { fieldName: 'US41_Shorefair_GBA1', required: false, dataType: 'Text', appliesTo: ['Japan'], category: 'Order References', description: 'US41 Shorefair to GBA1 transfer', example: '4301053127' },
  { fieldName: '2nd_Delivery', required: false, dataType: 'Text', appliesTo: ['Mauritius'], category: 'Order References', description: 'Secondary delivery for split shipments (Mauritius)', example: '9190538130' },

  // Container/Pallet Info
  { fieldName: 'Pallets', required: false, dataType: 'Integer', appliesTo: ['All'], category: 'Container Info', description: 'Number of pallets', example: '28' },
  { fieldName: 'Pallets_Per_Case', required: false, dataType: 'Text', appliesTo: ['All'], category: 'Container Info', description: 'Cases per pallet configuration', example: '16cs/pal' },
  { fieldName: 'Pallet_Dimensions', required: false, dataType: 'Text', appliesTo: ['All'], category: 'Container Info', description: 'Standard pallet dimensions', example: '40x48x54 inches' },

  // Value & Customs
  { fieldName: 'Value', required: false, dataType: 'Decimal', appliesTo: ['All'], category: 'Value & Customs', description: 'Declared shipment value', example: '30000' },
  { fieldName: 'HS_Code', required: false, dataType: 'Text', appliesTo: ['All'], category: 'Value & Customs', description: 'Harmonized System customs code', example: '2402.20.0000' },
  { fieldName: 'Date_Code', required: false, dataType: 'Text', appliesTo: ['All'], category: 'Value & Customs', description: 'Internal production date code', example: 'J4, K5, H5' },
  { fieldName: 'Price', required: false, dataType: 'Decimal', appliesTo: ['Japan'], category: 'Value & Customs', description: 'Total price for shipment', example: '53150' },
  { fieldName: 'Price_Per_Unit', required: false, dataType: 'Text', appliesTo: ['Japan'], category: 'Value & Customs', description: 'Price per unit/case', example: '106.3' },
  { fieldName: 'Cost_Per_Case', required: false, dataType: 'Text', appliesTo: ['All'], category: 'Value & Customs', description: 'Cost per case', example: '78.48' },
  { fieldName: 'CIF_Los_Angeles', required: false, dataType: 'Text', appliesTo: ['Taiwan'], category: 'Value & Customs', description: 'CIF value at Los Angeles', example: '' },
  { fieldName: 'Incoterm', required: false, dataType: 'Text', appliesTo: ['All'], category: 'Value & Customs', description: 'International commercial terms', example: 'DAP, FOB-LA' },

  // Air Freight
  { fieldName: 'AWB', required: false, dataType: 'Text', appliesTo: ['Air'], category: 'Air Freight', description: 'Air Waybill number', example: '817-09583195' },
  { fieldName: 'AWB_Booking', required: false, dataType: 'Text', appliesTo: ['Air'], category: 'Air Freight', description: 'Air freight booking reference', example: '729-40700310' },
  { fieldName: 'Airline', required: false, dataType: 'Text', appliesTo: ['Air'], category: 'Air Freight', description: 'Air carrier name', example: 'Emirates, Amerijet' },
  { fieldName: 'Departure_Airport', required: false, dataType: 'Text', appliesTo: ['Air'], category: 'Air Freight', description: 'Origin airport', example: 'Chicago Int.' },

  // Sea Freight
  { fieldName: 'Container_No', required: false, dataType: 'Text', appliesTo: ['Sea'], category: 'Sea Freight', description: 'Shipping container ID', example: 'HAMU185514' },
  { fieldName: 'Seal_No', required: false, dataType: 'Text', appliesTo: ['All'], category: 'Sea Freight', description: 'Container/shipment seal number', example: '*035067' },
  { fieldName: 'Booking_No', required: false, dataType: 'Text', appliesTo: ['All'], category: 'Sea Freight', description: 'Sea freight booking reference', example: 'RICEND301900' },
  { fieldName: 'BOL_No', required: false, dataType: 'Text', appliesTo: ['Sea'], category: 'Sea Freight', description: 'Bill of Lading number', example: '' },
  { fieldName: 'Data_Logger_Serial', required: false, dataType: 'Text', appliesTo: ['Japan/Taiwan'], category: 'Sea Freight', description: 'Temperature logger serial number', example: 'AOC1053180TT' },

  // Schedule
  { fieldName: 'ETD', required: false, dataType: 'Date', appliesTo: ['All'], category: 'Schedule', description: 'Estimated Time of Departure', example: '2025-04-20' },
  { fieldName: 'ETS', required: false, dataType: 'Date', appliesTo: ['All'], category: 'Schedule', description: 'Estimated Time of Shipment', example: '2025-04-20' },
  { fieldName: 'ETA', required: false, dataType: 'Date', appliesTo: ['All'], category: 'Schedule', description: 'Estimated Time of Arrival (general)', example: '2025-05-15' },
  { fieldName: 'ETA_Tokyo', required: false, dataType: 'Text', appliesTo: ['Japan'], category: 'Schedule', description: 'ETA Tokyo (date or Julian date)', example: '45583' },
  { fieldName: 'Lead_Time_Days', required: false, dataType: 'Text', appliesTo: ['Japan'], category: 'Schedule', description: 'Lead time calculation (35/47/60 days)', example: '47' },
  { fieldName: 'Arrived_Memphis', required: false, dataType: 'Text', appliesTo: ['Japan/Taiwan'], category: 'Schedule', description: 'Date arrived at Memphis rail hub', example: '2025-07-23' },
  { fieldName: 'Arrived_LA_Port', required: false, dataType: 'Text', appliesTo: ['Japan/Taiwan'], category: 'Schedule', description: 'Date arrived at LA Port', example: '2025-08-01' },
  { fieldName: 'COB_Rail', required: false, dataType: 'Text', appliesTo: ['Japan/Taiwan'], category: 'Schedule', description: 'Cut-off date for rail connection', example: '2025-07-20' },
  { fieldName: 'COB_Sail', required: false, dataType: 'Text', appliesTo: ['Japan'], category: 'Schedule', description: 'Cut-off date to sail to Japan', example: '2025-09-19' },

  // Carrier
  { fieldName: 'Vessel', required: false, dataType: 'Text', appliesTo: ['Sea'], category: 'Carrier', description: 'Ship name/voyage', example: 'ONE OWL 031W' },
  { fieldName: 'Shipping_Line', required: false, dataType: 'Text', appliesTo: ['Sea'], category: 'Carrier', description: 'Steamship line', example: 'ONE, HAPAG LLOYD, MSC' },
  { fieldName: 'Original_Vessel', required: false, dataType: 'Text', appliesTo: ['Sea'], category: 'Carrier', description: 'Original vessel if changed', example: '' },
  { fieldName: 'Final_Vessel', required: false, dataType: 'Text', appliesTo: ['Sea'], category: 'Carrier', description: 'Final vessel after changes', example: '' },
  { fieldName: 'Transhipments', required: false, dataType: 'Text', appliesTo: ['Sea'], category: 'Carrier', description: 'Transhipment locations', example: '' },

  // Documentation
  { fieldName: 'Date_CI_PL_Drafted', required: false, dataType: 'Date', appliesTo: ['Japan'], category: 'Documentation', description: 'Date CI/PL drafted', example: '2025-10-14' },
  { fieldName: 'Date_CI_PL_Printed', required: false, dataType: 'Date', appliesTo: ['Japan'], category: 'Documentation', description: 'Date CI/PL printed', example: '2025-09-19' },
  { fieldName: 'Date_TTB_Drafted', required: false, dataType: 'Date', appliesTo: ['Japan'], category: 'Documentation', description: 'Date TTB drafted', example: '2025-08-26' },
  { fieldName: 'Date_TTB_Printed', required: false, dataType: 'Date', appliesTo: ['Japan'], category: 'Documentation', description: 'Date TTB printed', example: '2025-10-14' },
  { fieldName: 'Dated_TTB_Received_Signed', required: false, dataType: 'Date', appliesTo: ['Japan'], category: 'Documentation', description: 'Date signed TTB received', example: '2025-10-16' },
  { fieldName: 'Date_Final_Docs_Sent', required: false, dataType: 'Date', appliesTo: ['All'], category: 'Documentation', description: 'Date final docs sent', example: '2025-10-16' },
  { fieldName: 'Date_Docs_Have_To_Be_Sent', required: false, dataType: 'Date', appliesTo: ['Japan'], category: 'Documentation', description: 'Deadline for sending docs', example: '2025-08-15' },
  { fieldName: 'Docs_Sent_To_Tax', required: false, dataType: 'Text', appliesTo: ['All'], category: 'Documentation', description: 'Date/status docs sent to tax', example: 'Y' },
  { fieldName: 'Final_Docs_Complete', required: false, dataType: 'Text', appliesTo: ['All'], category: 'Documentation', description: 'Final docs completion status', example: 'Yes' },
  { fieldName: 'Final_Docs_To_EM', required: false, dataType: 'Text', appliesTo: ['All'], category: 'Documentation', description: 'Date final docs sent to End Market', example: '2025-09-01' },
  { fieldName: 'TTB_Complete', required: false, dataType: 'Text', appliesTo: ['All'], category: 'Documentation', description: 'TTB sign/return status', example: 'Y' },
  { fieldName: 'Tax_Status', required: false, dataType: 'Text', appliesTo: ['All'], category: 'Documentation', description: 'Tax articles status', example: 'Sent waiting on the EM' },
  { fieldName: 'Estimated_SWB_Available', required: false, dataType: 'Text', appliesTo: ['All'], category: 'Documentation', description: 'Estimated SWB availability', example: 'received 9/2' },
  { fieldName: 'Accounting_Doc', required: false, dataType: 'Text', appliesTo: ['All'], category: 'Documentation', description: 'SAP accounting document number', example: '1252281744' },

  // Location
  { fieldName: 'Port_Of_Departure', required: false, dataType: 'Text', appliesTo: ['Sea'], category: 'Location', description: 'Origin port (East Coast/West Coast)', example: 'Charleston, SC' },
  { fieldName: 'Port_Of_Delivery', required: false, dataType: 'Text', appliesTo: ['Sea'], category: 'Location', description: 'Destination port', example: 'PUERTO CORTES' },
  { fieldName: 'Final_Place_Of_Delivery', required: false, dataType: 'Text', appliesTo: ['Sea'], category: 'Location', description: 'Final delivery location', example: 'SAN PEDRO SULA' },
  { fieldName: 'CNEE_Address', required: false, dataType: 'Text', appliesTo: ['All'], category: 'Location', description: 'Consignee address', example: '' },

  // Japan Specific
  { fieldName: 'Tape_Color', required: false, dataType: 'Text', appliesTo: ['Japan'], category: 'Japan Specific', description: 'Tape color for identification (Japan)', example: 'Black, Red, Green' },
  { fieldName: 'Container_Checklist_Recorded', required: false, dataType: 'Text', appliesTo: ['Japan'], category: 'Japan Specific', description: 'Container checklist status', example: 'Yes' },
  { fieldName: 'STO_Date_Updated', required: false, dataType: 'Date', appliesTo: ['Japan'], category: 'Japan Specific', description: 'STO date update status', example: 'Updated' },

  // Theft Tracking
  { fieldName: 'Cases_Stolen', required: false, dataType: 'Text', appliesTo: ['Theft'], category: 'Theft Tracking', description: 'Number of cases stolen', example: '40' },
  { fieldName: 'Sticks_Stolen', required: false, dataType: 'Text', appliesTo: ['Theft'], category: 'Theft Tracking', description: 'Number of sticks stolen', example: '400000' },
  { fieldName: 'Difference_Remaining', required: false, dataType: 'Text', appliesTo: ['Theft'], category: 'Theft Tracking', description: 'Cases remaining after theft', example: '880' },
  { fieldName: 'Percent_Pilfered', required: false, dataType: 'Decimal', appliesTo: ['Theft'], category: 'Theft Tracking', description: 'Percentage pilfered', example: '0.043' },
  { fieldName: 'Seals_Broken', required: false, dataType: 'Text', appliesTo: ['Theft'], category: 'Theft Tracking', description: 'Broken seal numbers', example: '*035852' },
  { fieldName: 'Value_Of_Stolen_Items', required: false, dataType: 'Text', appliesTo: ['Theft'], category: 'Theft Tracking', description: 'Value of stolen items', example: '4304.8' },

  // Notes
  { fieldName: 'Notes', required: false, dataType: 'Text', appliesTo: ['All'], category: 'Notes', description: 'Additional comments', example: '' },
];

export const categories: Category[] = [
  'Identifiers',
  'Order References',
  'Container Info',
  'Value & Customs',
  'Air Freight',
  'Sea Freight',
  'Schedule',
  'Carrier',
  'Documentation',
  'Location',
  'Japan Specific',
  'Theft Tracking',
  'Notes',
];

export const countries = [
  'Colombia',
  'Costa Rica',
  'El Salvador',
  'Guatemala',
  'Honduras',
  'Japan',
  'Mauritius',
  'Panama',
  'Taiwan',
];

export const forwarders = [
  'Bennett',
  'SOS',
  'DHL',
  'Velogic',
  'Amerijet',
  'Unique Logistics',
];

export const shippingLines = [
  'ONE (Ocean Network Express)',
  'HAPAG LLOYD',
  'MSC',
  'CMA-CGM',
  'Maersk',
  'Seaboard Marine',
];

export const airlines = [
  'Emirates',
  'Amerijet',
  'DHL',
  'FedEx',
];

export const tapeColors = [
  'Black',
  'Red',
  'Green',
  'Blue',
  'Yellow',
  'White',
  'Orange',
];
