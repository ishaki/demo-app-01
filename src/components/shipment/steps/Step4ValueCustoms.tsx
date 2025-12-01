import React from 'react';
import { ShipmentData } from '../../../types/shipment';
import { getStepFields } from '../../../lib/wizardStepMapping';
import { FormField } from '../FormField';

interface Step4ValueCustomsProps {
  formData: ShipmentData;
  onChange: (field: keyof ShipmentData, value: any) => void;
}

export const Step4ValueCustoms: React.FC<Step4ValueCustomsProps> = ({
  formData,
  onChange,
}) => {
  const fields = getStepFields(4, formData.Mode, formData.Destination_Country);

  // Calculate total cases from line items
  const totalCases = formData.lineItems.reduce(
    (sum, item) => sum + (item.Cases || 0),
    0
  );

  // Auto-calculate Price_Per_Unit if Price is filled (Japan only)
  const pricePerUnit =
    formData.Price && totalCases > 0
      ? (formData.Price / totalCases).toFixed(2)
      : null;

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
        <div className="flex items-start">
          <svg
            className="w-6 h-6 text-emerald-500 mr-3 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h3 className="font-semibold text-emerald-900">Value & Customs</h3>
            <p className="text-sm text-emerald-700 mt-1">
              Enter pricing information, customs codes, and incoterms. Fields vary by
              destination country.
            </p>
          </div>
        </div>
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields.map((field) => {
          // Skip Price_Per_Unit if we're auto-calculating it
          if (
            field.fieldName === 'Price_Per_Unit' &&
            formData.Destination_Country === 'Japan' &&
            pricePerUnit
          ) {
            return null;
          }

          return (
            <FormField
              key={field.fieldName}
              field={field}
              value={formData[field.fieldName as keyof ShipmentData]}
              onChange={(value) =>
                onChange(field.fieldName as keyof ShipmentData, value)
              }
            />
          );
        })}
      </div>

      {/* Japan Pricing Breakdown */}
      {formData.Destination_Country === 'Japan' && formData.Price && totalCases > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 shadow-sm">
          <div className="flex items-start mb-4">
            <span className="text-2xl mr-3">🇯🇵</span>
            <div>
              <h3 className="text-lg font-bold text-blue-900">
                Japan Pricing Breakdown
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Auto-calculated based on total price and case count
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="text-sm font-medium text-blue-600">Total Price</div>
              <div className="text-2xl font-bold text-blue-900 mt-1">
                ${formData.Price.toLocaleString()}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="text-sm font-medium text-blue-600">Total Cases</div>
              <div className="text-2xl font-bold text-blue-900 mt-1">
                {totalCases.toLocaleString()}
              </div>
              <div className="text-xs text-blue-600 mt-1">From line items</div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-4 border-2 border-blue-700 shadow-md">
              <div className="flex items-center text-sm font-medium text-blue-100">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Price Per Unit
              </div>
              <div className="text-3xl font-bold text-white mt-1">
                ${pricePerUnit}
              </div>
              <div className="flex items-center text-xs text-blue-200 mt-1">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Auto-calculated
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs text-blue-600 bg-blue-100 rounded-lg p-3">
            <strong>Formula:</strong> Price Per Unit = Total Price ÷ Total Cases
            <br />
            <strong>Calculation:</strong> ${formData.Price.toLocaleString()} ÷{' '}
            {totalCases.toLocaleString()} = ${pricePerUnit}
          </div>
        </div>
      )}

      {/* Taiwan-Specific Info */}
      {formData.Destination_Country === 'Taiwan' && (
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
          <div className="flex items-start">
            <span className="text-2xl mr-3">🇹🇼</span>
            <div>
              <h4 className="font-semibold text-teal-900">Taiwan CIF Pricing</h4>
              <p className="text-sm text-teal-700 mt-1">
                <strong>CIF Los Angeles</strong> is the cost, insurance, and freight value
                at the Los Angeles port for Taiwan shipments.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
