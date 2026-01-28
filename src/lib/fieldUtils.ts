import { FieldDefinition, Country, Mode } from '../types/shipment';

/**
 * Determines if a field should be visible based on current country and mode selections
 */
export function isFieldVisible(
  field: FieldDefinition,
  selectedCountry: Country | undefined,
  selectedMode: Mode | undefined
): boolean {
  // If no appliesTo constraints, show the field
  if (!field.appliesTo || field.appliesTo.length === 0) {
    return true;
  }

  // Check if field applies to all
  if (field.appliesTo.includes('All')) {
    return true;
  }

  // Check mode-specific fields
  if (selectedMode) {
    if (field.appliesTo.includes(selectedMode)) {
      return true;
    }
    // If field is mode-specific but doesn't match current mode, hide it
    if (field.appliesTo.includes('Air') || field.appliesTo.includes('Sea')) {
      if (!field.appliesTo.includes(selectedMode)) {
        return false;
      }
    }
  }

  // Check country-specific fields
  if (selectedCountry) {
    // Direct country match
    if (field.appliesTo.includes(selectedCountry)) {
      return true;
    }

    // Handle Japan/Taiwan combined field
    if (field.appliesTo.includes('Japan/Taiwan')) {
      if (selectedCountry === 'Japan' || selectedCountry === 'Taiwan') {
        return true;
      }
    }

    // Check if field is country-specific but doesn't match
    const countrySpecific = field.appliesTo.some(
      (applies) =>
        applies !== 'All' &&
        applies !== 'Air' &&
        applies !== 'Sea' &&
        applies !== 'Theft'
    );

    if (countrySpecific) {
      // Field has country restrictions and current country doesn't match
      return false;
    }
  }

  // Show field if it's not restricted by mode or country
  const hasOnlyTheftRestriction =
    field.appliesTo.length === 1 && field.appliesTo[0] === 'Theft';

  return hasOnlyTheftRestriction || field.appliesTo.includes('All');
}

/**
 * Format field name for display (convert snake_case to Title Case)
 */
export function formatFieldName(fieldName: string): string {
  return fieldName
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/2nd/, '2nd')
    .replace(/Hs Code/, 'HS Code')
    .replace(/Awb/, 'AWB')
    .replace(/Bol/, 'BOL')
    .replace(/Etd/, 'ETD')
    .replace(/Ets/, 'ETS')
    .replace(/Eta/, 'ETA')
    .replace(/Cob/, 'COB')
    .replace(/Ttb/, 'TTB')
    .replace(/Ci Pl/, 'CI/PL')
    .replace(/Sto/, 'STO')
    .replace(/Sku/, 'SKU')
    .replace(/Cif/, 'CIF')
    .replace(/Swb/, 'SWB')
    .replace(/Cnee/, 'CNEE')
    .replace(/Gba1/, 'GBA1')
    .replace(/Jp21/, 'JP21')
    .replace(/Us41/, 'US41');
}

/**
 * Get placeholder text based on field data type
 */
export function getPlaceholder(field: FieldDefinition): string {
  if (field.example) {
    return field.example;
  }

  switch (field.dataType) {
    case 'Date':
      return 'YYYY-MM-DD';
    case 'Integer':
      return 'Enter number';
    case 'Decimal':
      return 'Enter decimal';
    default:
      return `Enter ${formatFieldName(field.fieldName).toLowerCase()}`;
  }
}
