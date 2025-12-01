import React from 'react';
import { FieldDefinition, ShipmentData, Category } from '../../types/shipment';
import { FormField } from './FormField';

interface FormSectionProps {
  category: Category;
  fields: FieldDefinition[];
  formData: ShipmentData;
  onFieldChange: (fieldName: keyof ShipmentData, value: any) => void;
}

export const FormSection: React.FC<FormSectionProps> = ({
  category,
  fields,
  formData,
  onFieldChange,
}) => {
  if (fields.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <p className="mt-4 text-gray-500 font-medium">No fields available for this category</p>
        <p className="text-sm text-gray-400 mt-1">
          Fields may appear when you select country or transport mode
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center mb-6 pb-4 border-b-2 border-gray-200">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900">{category}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {fields.filter((f) => f.required).length > 0 && (
                <span>
                  <span className="text-red-500">*</span> Required fields ·{' '}
                </span>
              )}
              {fields.length} field{fields.length !== 1 ? 's' : ''} in this section
            </p>
          </div>
          <div className="bg-blue-100 text-blue-700 rounded-full px-4 py-2 font-semibold text-sm">
            {fields.filter((f) => f.required).length} required
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((field) => (
            <FormField
              key={field.fieldName}
              field={field}
              value={formData[field.fieldName as keyof ShipmentData]}
              onChange={(value) =>
                onFieldChange(field.fieldName as keyof ShipmentData, value)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
