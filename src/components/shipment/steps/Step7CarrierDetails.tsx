import React from 'react';
import { ShipmentData } from '../../../types/shipment';
import { getStepFields } from '../../../lib/wizardStepMapping';
import { FormField } from '../FormField';

interface Step7CarrierDetailsProps {
  formData: ShipmentData;
  onChange: (field: keyof ShipmentData, value: any) => void;
}

export const Step7CarrierDetails: React.FC<Step7CarrierDetailsProps> = ({
  formData,
  onChange,
}) => {
  const fields = getStepFields(7, formData.Mode, formData.Destination_Country);

  // Sea mode check
  if (formData.Mode !== 'Sea') {
    return (
      <div className="text-center py-12">
        <svg
          className="w-16 h-16 mx-auto text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-700">
          Sea Freight Mode Required
        </h3>
        <p className="text-gray-500 mt-2">
          This step is only applicable for sea freight shipments. Please go back to
          Step 1 and select "Sea" mode to access carrier details.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <div className="flex items-start">
          <span className="text-3xl mr-3">🚢</span>
          <div>
            <h3 className="font-semibold text-blue-900">Sea Carrier Details</h3>
            <p className="text-sm text-blue-700 mt-1">
              Enter vessel name, shipping line, and transhipment information for this
              sea freight shipment.
            </p>
          </div>
        </div>
      </div>

      {/* Vessel Information */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
          Vessel & Shipping Line
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields
            .filter((f) =>
              ['Vessel', 'Shipping_Line'].includes(f.fieldName)
            )
            .map((field) => (
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

      {/* Vessel Route Information */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200">
        <h4 className="font-semibold text-indigo-900 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
              clipRule="evenodd"
            />
          </svg>
          Vessel Route & Transhipment
        </h4>

        {/* Transhipments Info */}
        <div className="mb-4 bg-indigo-100 rounded-lg p-3">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-indigo-600 mr-2 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-sm text-indigo-700">
              <strong>Transhipments</strong> occur when cargo is transferred from one
              vessel to another during the voyage. If the vessel changes during transit,
              record the original and final vessel names.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fields
            .filter((f) =>
              ['Original_Vessel', 'Final_Vessel', 'Transhipments'].includes(f.fieldName)
            )
            .map((field) => (
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

      {/* Carrier Tips */}
      <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-6 border-2 border-cyan-200">
        <h4 className="font-semibold text-cyan-900 mb-3 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          Sea Carrier Information Tips
        </h4>
        <ul className="text-sm text-cyan-700 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              <strong>Vessel</strong> is the name of the primary ship carrying your
              container
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              <strong>Shipping Line</strong> is the carrier company (e.g., Maersk,
              MSC, CMA CGM)
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              <strong>Original Vessel</strong> is the first ship if cargo is
              transferred during transit
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              <strong>Final Vessel</strong> is the last ship that delivers to the
              destination port
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              <strong>Transhipments</strong> indicate the number of times cargo is
              transferred between vessels (0 = direct service, 1+ = indirect)
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
