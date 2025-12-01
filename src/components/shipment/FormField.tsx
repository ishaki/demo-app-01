import React from 'react';
import { FieldDefinition } from '../../types/shipment';
import { formatFieldName, getPlaceholder } from '../../lib/fieldUtils';
import {
  countries,
  forwarders,
  shippingLines,
  airlines,
  tapeColors,
} from '../../lib/fieldConfig';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

interface FormFieldProps {
  field: FieldDefinition;
  value: any;
  onChange: (value: any) => void;
}

export const FormField: React.FC<FormFieldProps> = ({ field, value, onChange }) => {
  const fieldLabel = formatFieldName(field.fieldName);
  const placeholder = getPlaceholder(field);

  const renderInput = () => {
    // Special dropdowns for specific fields
    if (field.fieldName === 'Destination_Country') {
      return (
        <Select value={value || ''} onValueChange={onChange}>
          <SelectTrigger className="w-full border-2 focus:border-blue-400 transition-colors">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (field.fieldName === 'Mode') {
      return (
        <Select value={value || ''} onValueChange={onChange}>
          <SelectTrigger className="w-full border-2 focus:border-blue-400 transition-colors">
            <SelectValue placeholder="Select mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Air">✈️ Air</SelectItem>
            <SelectItem value="Sea">🚢 Sea</SelectItem>
          </SelectContent>
        </Select>
      );
    }

    if (field.fieldName === 'Freight_Forwarder') {
      return (
        <Select value={value || ''} onValueChange={onChange}>
          <SelectTrigger className="w-full border-2 focus:border-blue-400 transition-colors">
            <SelectValue placeholder="Select forwarder" />
          </SelectTrigger>
          <SelectContent>
            {forwarders.map((forwarder) => (
              <SelectItem key={forwarder} value={forwarder}>
                {forwarder}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (field.fieldName === 'Shipping_Line') {
      return (
        <Select value={value || ''} onValueChange={onChange}>
          <SelectTrigger className="w-full border-2 focus:border-blue-400 transition-colors">
            <SelectValue placeholder="Select shipping line" />
          </SelectTrigger>
          <SelectContent>
            {shippingLines.map((line) => (
              <SelectItem key={line} value={line}>
                {line}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (field.fieldName === 'Airline') {
      return (
        <Select value={value || ''} onValueChange={onChange}>
          <SelectTrigger className="w-full border-2 focus:border-blue-400 transition-colors">
            <SelectValue placeholder="Select airline" />
          </SelectTrigger>
          <SelectContent>
            {airlines.map((airline) => (
              <SelectItem key={airline} value={airline}>
                {airline}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (field.fieldName === 'Tape_Color') {
      return (
        <Select value={value || ''} onValueChange={onChange}>
          <SelectTrigger className="w-full border-2 focus:border-blue-400 transition-colors">
            <SelectValue placeholder="Select tape color" />
          </SelectTrigger>
          <SelectContent>
            {tapeColors.map((color) => (
              <SelectItem key={color} value={color}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{
                      backgroundColor: color.toLowerCase(),
                      ...(color === 'White' && { backgroundColor: '#ffffff', borderWidth: 2 }),
                    }}
                  />
                  {color}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    // Yes/No fields
    if (
      field.fieldName === 'Final_Docs_Complete' ||
      field.fieldName === 'TTB_Complete' ||
      field.fieldName === 'Docs_Sent_To_Tax' ||
      field.fieldName === 'Container_Checklist_Recorded'
    ) {
      return (
        <Select value={value || ''} onValueChange={onChange}>
          <SelectTrigger className="w-full border-2 focus:border-blue-400 transition-colors">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">✅ Yes</SelectItem>
            <SelectItem value="Y">✅ Y</SelectItem>
            <SelectItem value="No">❌ No</SelectItem>
            <SelectItem value="N">❌ N</SelectItem>
          </SelectContent>
        </Select>
      );
    }

    // Textarea for Notes
    if (field.fieldName === 'Notes') {
      return (
        <Textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[120px] resize-y border-2 focus:border-blue-400 transition-colors"
        />
      );
    }

    // Date inputs
    if (field.dataType === 'Date') {
      return (
        <Input
          type="date"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border-2 focus:border-blue-400 transition-colors"
        />
      );
    }

    // Number inputs for Integer and Decimal
    if (field.dataType === 'Integer') {
      return (
        <Input
          type="number"
          step="1"
          value={value || ''}
          onChange={(e) => onChange(parseInt(e.target.value) || '')}
          placeholder={placeholder}
          className="w-full border-2 focus:border-blue-400 transition-colors"
        />
      );
    }

    if (field.dataType === 'Decimal') {
      return (
        <Input
          type="number"
          step="0.01"
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || '')}
          placeholder={placeholder}
          className="w-full border-2 focus:border-blue-400 transition-colors"
        />
      );
    }

    // Default text input
    return (
      <Input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-2 focus:border-blue-400 transition-colors"
      />
    );
  };

  return (
    <div className="space-y-2 group">
      <Label
        htmlFor={field.fieldName}
        className="text-sm font-semibold text-gray-700 flex items-center"
      >
        {fieldLabel}
        {field.required && (
          <span className="text-red-600 font-bold ml-1">*</span>
        )}
      </Label>
      <div className="relative">
        {renderInput()}
        {value && field.required && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-5 h-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      {field.description && (
        <p className="text-xs text-gray-500 italic leading-tight">{field.description}</p>
      )}
    </div>
  );
};
