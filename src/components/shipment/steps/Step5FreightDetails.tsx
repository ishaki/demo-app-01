import React from 'react';
import { ShipmentData } from '../../../types/shipment';
import { getStepFields } from '../../../lib/wizardStepMapping';
import { FormField } from '../FormField';

interface Step5FreightDetailsProps {
  formData: ShipmentData;
  onChange: (field: keyof ShipmentData, value: any) => void;
}

export const Step5FreightDetails: React.FC<Step5FreightDetailsProps> = ({
  formData,
  onChange,
}) => {
  const fields = getStepFields(5, formData.Mode, formData.Destination_Country);
  const isAir = formData.Mode === 'Air';
  const isSea = formData.Mode === 'Sea';

  if (!formData.Mode) {
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
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-700">
          Transport Mode Not Selected
        </h3>
        <p className="text-gray-500 mt-2">
          Please go back to Step 1 and select Air or Sea mode to continue.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Info Banner - Air */}
      {isAir && (
        <div className="bg-sky-50 border-l-4 border-sky-500 p-4 rounded-r-lg">
          <div className="flex items-start">
            <span className="text-3xl mr-3">✈️</span>
            <div>
              <h3 className="font-semibold text-sky-900">Air Freight Details</h3>
              <p className="text-sm text-sky-700 mt-1">
                Enter air waybill (AWB) number, airline, booking reference, and departure
                airport for this air shipment.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Info Banner - Sea */}
      {isSea && (
        <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-r-lg">
          <div className="flex items-start">
            <span className="text-3xl mr-3">🚢</span>
            <div>
              <h3 className="font-semibold text-cyan-900">Sea Freight Details</h3>
              <p className="text-sm text-cyan-700 mt-1">
                Enter container number, seal number, booking reference, and bill of lading
                (BOL) for this sea shipment.
              </p>
            </div>
          </div>
        </div>
      )}

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

      {/* Air Freight Additional Info */}
      {isAir && (
        <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-6 border-2 border-sky-200">
          <h4 className="font-semibold text-sky-900 mb-3 flex items-center">
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
            Air Freight Tips
          </h4>
          <ul className="text-sm text-sky-700 space-y-2">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <strong>AWB (Air Waybill)</strong> is the primary tracking document for
                air shipments
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <strong>AWB Booking</strong> is the freight forwarder's booking
                reference number
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Air shipments typically have faster transit times (1-7 days) compared
                to sea freight
              </span>
            </li>
          </ul>
        </div>
      )}

      {/* Sea Freight Additional Info */}
      {isSea && (
        <>
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
              Sea Freight Tips
            </h4>
            <ul className="text-sm text-cyan-700 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Container Number</strong> is the unique identifier for the
                  shipping container (format: ABCD1234567)
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Seal Number</strong> is the security seal applied to the
                  container door
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>BOL (Bill of Lading)</strong> is the contract between shipper
                  and carrier
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Sea freight typically takes longer (20-45 days) but is more
                  cost-effective for large volumes
                </span>
              </li>
            </ul>
          </div>

          {/* Data Logger for Japan/Taiwan */}
          {(formData.Destination_Country === 'Japan' ||
            formData.Destination_Country === 'Taiwan') && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-amber-600 mr-3 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-amber-900">
                    Temperature Monitoring Required
                  </h4>
                  <p className="text-sm text-amber-700 mt-1">
                    {formData.Destination_Country} shipments require a{' '}
                    <strong>Data Logger Serial Number</strong> for temperature monitoring
                    during transit.
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
