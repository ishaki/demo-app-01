import React from 'react';
import { ShipmentData } from '../../../types/shipment';
import { getStepFields } from '../../../lib/wizardStepMapping';
import { FormField } from '../FormField';

interface Step9LocationProps {
  formData: ShipmentData;
  onChange: (field: keyof ShipmentData, value: any) => void;
}

export const Step9Location: React.FC<Step9LocationProps> = ({
  formData,
  onChange,
}) => {
  const fields = getStepFields(9, formData.Mode, formData.Destination_Country);

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-r-lg">
        <div className="flex items-start">
          <svg
            className="w-6 h-6 text-cyan-500 mr-3 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h3 className="font-semibold text-cyan-900">Location & Delivery</h3>
            <p className="text-sm text-cyan-700 mt-1">
              Specify ports of departure and arrival, final delivery location, and
              consignee address details.
            </p>
          </div>
        </div>
      </div>

      {/* Port Information */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
          {formData.Mode === 'Air' ? 'Airport' : 'Port'} Information
        </h4>

        <div className="mb-4 bg-blue-100 rounded-lg p-3">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-blue-600 mr-2 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-blue-700">
              {formData.Mode === 'Air' ? (
                <>
                  Track the departure and arrival airports for your air freight
                  shipment. Use standard IATA airport codes (e.g., LAX, NRT, TPE).
                </>
              ) : (
                <>
                  Track the ports where cargo departs and arrives. Use standard UN/LOCODE
                  port codes (e.g., USLAX for Los Angeles, JPTYO for Tokyo).
                </>
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields
            .filter((f) =>
              ['Port_Of_Departure', 'Port_Of_Delivery'].includes(f.fieldName)
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

      {/* Final Delivery Location */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200">
        <h4 className="font-semibold text-emerald-900 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Final Delivery Destination
        </h4>

        <div className="mb-4 bg-emerald-100 rounded-lg p-3">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-emerald-600 mr-2 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-emerald-700">
              The final place of delivery may differ from the arrival port/airport if
              cargo is transported by land after arrival.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {fields
            .filter((f) => f.fieldName === 'Final_Place_Of_Delivery')
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

      {/* Consignee Address */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
        <h4 className="font-semibold text-amber-900 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z"
              clipRule="evenodd"
            />
          </svg>
          Consignee Address (CNEE)
        </h4>

        <div className="mb-4 bg-amber-100 rounded-lg p-3">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-amber-600 mr-2 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-amber-700">
              <strong>Consignee (CNEE)</strong> is the party receiving the shipment.
              This address appears on the bill of lading and customs documents.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {fields
            .filter((f) => f.fieldName === 'CNEE_Address')
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

      {/* Location Tips */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
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
          Location Tracking Tips
        </h4>
        <ul className="text-sm text-cyan-700 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              <strong>Port of Departure</strong> - Where the cargo begins its journey
              (origin port/airport)
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              <strong>Port of Delivery</strong> - Where cargo arrives by sea/air
              (destination port/airport)
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              <strong>Final Place of Delivery</strong> - Ultimate destination including
              inland transport (e.g., warehouse, distribution center)
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              Use standard codes: UN/LOCODE for ports, IATA codes for airports
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
