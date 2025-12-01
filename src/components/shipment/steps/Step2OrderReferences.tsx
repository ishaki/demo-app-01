import React from 'react';
import { ShipmentData } from '../../../types/shipment';
import { getStepFields } from '../../../lib/wizardStepMapping';
import { FormField } from '../FormField';

interface Step2OrderReferencesProps {
  formData: ShipmentData;
  onChange: (field: keyof ShipmentData, value: any) => void;
}

export const Step2OrderReferences: React.FC<Step2OrderReferencesProps> = ({
  formData,
  onChange,
}) => {
  const fields = getStepFields(2, formData.Mode, formData.Destination_Country);

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
        <div className="flex items-start">
          <svg
            className="w-6 h-6 text-indigo-500 mr-3 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h3 className="font-semibold text-indigo-900">Order References</h3>
            <p className="text-sm text-indigo-700 mt-1">
              Link this shipment to SAP orders and delivery documents.{' '}
              <strong>STO (Stock Transport Order)</strong> is required for all shipments.
            </p>
          </div>
        </div>
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
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

      {/* Country-Specific Info */}
      {formData.Destination_Country === 'Japan' && (
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <span className="text-2xl mr-3">🇯🇵</span>
            <div>
              <h4 className="font-semibold text-amber-900">Japan Transfer Orders</h4>
              <p className="text-sm text-amber-700 mt-1">
                <strong>GBA1_JP21</strong> and <strong>US41_Shorefair_GBA1</strong> are
                internal transfer orders specific to Japan shipments. Fill these if
                applicable.
              </p>
            </div>
          </div>
        </div>
      )}

      {formData.Destination_Country === 'Taiwan' && (
        <div className="mt-6 bg-teal-50 border border-teal-200 rounded-lg p-4">
          <div className="flex items-start">
            <span className="text-2xl mr-3">🇹🇼</span>
            <div>
              <h4 className="font-semibold text-teal-900">Taiwan Transfer Orders</h4>
              <p className="text-sm text-teal-700 mt-1">
                <strong>GBA1_JP21</strong> is used for Taiwan internal transfer orders.
              </p>
            </div>
          </div>
        </div>
      )}

      {formData.Destination_Country === 'Mauritius' && (
        <div className="mt-6 bg-cyan-50 border border-cyan-200 rounded-lg p-4">
          <div className="flex items-start">
            <span className="text-2xl mr-3">🇲🇺</span>
            <div>
              <h4 className="font-semibold text-cyan-900">Mauritius Split Shipments</h4>
              <p className="text-sm text-cyan-700 mt-1">
                Use <strong>2nd Delivery</strong> field if this shipment is split across
                multiple deliveries.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
