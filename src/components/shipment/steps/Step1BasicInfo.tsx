import React from 'react';
import { ShipmentData } from '../../../types/shipment';
import { getStepFields } from '../../../lib/wizardStepMapping';
import { FormField } from '../FormField';

interface Step1BasicInfoProps {
  formData: ShipmentData;
  onChange: (field: keyof ShipmentData, value: any) => void;
}

export const Step1BasicInfo: React.FC<Step1BasicInfoProps> = ({
  formData,
  onChange,
}) => {
  const fields = getStepFields(1, formData.Mode, formData.Destination_Country);

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <div className="flex items-start">
          <svg
            className="w-6 h-6 text-blue-500 mr-3 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h3 className="font-semibold text-blue-900">Start Here</h3>
            <p className="text-sm text-blue-700 mt-1">
              Fill in the basic shipment information. <strong>Mode</strong> and{' '}
              <strong>Destination Country</strong> will determine which fields appear in
              later steps.
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

      {/* Conditional Notifications */}
      {formData.Mode && (
        <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start">
            <span className="text-2xl mr-3">
              {formData.Mode === 'Air' ? '✈️' : '🚢'}
            </span>
            <div>
              <h4 className="font-semibold text-purple-900">
                {formData.Mode === 'Air' ? 'Air Freight Mode' : 'Sea Freight Mode'}
              </h4>
              <p className="text-sm text-purple-700 mt-1">
                You'll see {formData.Mode === 'Air' ? 'air-specific' : 'sea-specific'}{' '}
                fields like{' '}
                {formData.Mode === 'Air'
                  ? 'AWB, Airline, and Departure Airport'
                  : 'Container Number, Vessel, and BOL'}{' '}
                in upcoming steps.
              </p>
            </div>
          </div>
        </div>
      )}

      {formData.Destination_Country && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <span className="text-2xl mr-3">🌍</span>
            <div>
              <h4 className="font-semibold text-green-900">
                Destination: {formData.Destination_Country}
              </h4>
              <p className="text-sm text-green-700 mt-1">
                {formData.Destination_Country === 'Japan' && (
                  <>
                    You'll see Japan-specific fields including Documentation (TTB, CI/PL
                    dates), Tape Color, ETA Tokyo, and Lead Time calculations.
                  </>
                )}
                {formData.Destination_Country === 'Taiwan' && (
                  <>
                    You'll see Taiwan-specific fields including CIF Los Angeles, Data
                    Logger, and LA Port arrival tracking.
                  </>
                )}
                {formData.Destination_Country === 'Mauritius' && (
                  <>You'll see the 2nd Delivery field for split shipments.</>
                )}
                {!['Japan', 'Taiwan', 'Mauritius'].includes(
                  formData.Destination_Country
                ) && <>Standard shipment fields will be available.</>}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
