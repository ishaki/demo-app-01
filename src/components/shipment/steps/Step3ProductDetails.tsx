import React from 'react';
import { ShipmentData } from '../../../types/shipment';
import { getStepFields } from '../../../lib/wizardStepMapping';
import { LineItemsTable } from '../LineItemsTable';
import { FormField } from '../FormField';

interface Step3ProductDetailsProps {
  formData: ShipmentData;
  onChange: (field: keyof ShipmentData, value: any) => void;
}

export const Step3ProductDetails: React.FC<Step3ProductDetailsProps> = ({
  formData,
  onChange,
}) => {
  const containerFields = getStepFields(3, formData.Mode, formData.Destination_Country);

  return (
    <div className="space-y-8">
      {/* Info Banner */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
        <div className="flex items-start">
          <svg
            className="w-6 h-6 text-green-500 mr-3 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h3 className="font-semibold text-green-900">Product Line Items</h3>
            <p className="text-sm text-green-700 mt-1">
              Add one or more products to this shipment. Each line represents a different
              product with its delivery number, SKU, description, and quantities.{' '}
              <strong>At least one product line is required.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Line Items Table (Master-Detail) */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
        <LineItemsTable
          lineItems={formData.lineItems}
          onChange={(items) => onChange('lineItems', items)}
        />
      </div>

      {/* Container/Pallet Information */}
      {containerFields.length > 0 && (
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 border-2 border-gray-200 shadow-sm">
          <div className="mb-6 pb-4 border-b-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Container Information</h3>
            <p className="text-sm text-gray-500 mt-1">
              Overall pallet and container details for this shipment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {containerFields.map((field) => (
              <FormField
                key={field.fieldName}
                field={field}
                value={formData[field.fieldName as keyof ShipmentData]}
                onChange={(value) =>
                  onChange(field.fieldName as keyof ShipmentData, value)
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Validation Warning */}
      {formData.lineItems.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <div className="flex items-start">
            <svg
              className="w-6 h-6 text-yellow-600 mr-3 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h4 className="font-semibold text-yellow-900">No Products Added</h4>
              <p className="text-sm text-yellow-700 mt-1">
                You must add at least one product line item before proceeding to the next
                step. Click the <strong>"Add Product Line"</strong> button above to get
                started.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
