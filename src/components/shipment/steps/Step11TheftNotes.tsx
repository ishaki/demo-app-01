import React, { useMemo } from 'react';
import { ShipmentData } from '../../../types/shipment';
import { getStepFields } from '../../../lib/wizardStepMapping';
import { FormField } from '../FormField';
import { AutoCalculatedField } from '../AutoCalculatedField';
import {
  calculateTotalCases,
  calculatePercentPilfered,
  calculateValueOfStolenItems,
  calculateSticksPilfered,
} from '../../../lib/autoCalculations';

interface Step11TheftNotesProps {
  formData: ShipmentData;
  onChange: (field: keyof ShipmentData, value: any) => void;
}

export const Step11TheftNotes: React.FC<Step11TheftNotesProps> = ({
  formData,
  onChange,
}) => {
  const fields = getStepFields(11, formData.Mode, formData.Destination_Country);

  // Calculate totals and auto-calculated theft metrics
  const totalCases = useMemo(() => calculateTotalCases(formData), [formData.lineItems]);

  const percentPilfered = useMemo(
    () => calculatePercentPilfered(formData.Cases_Stolen, totalCases),
    [formData.Cases_Stolen, totalCases]
  );

  const valueOfStolenItems = useMemo(
    () => calculateValueOfStolenItems(formData.Cases_Stolen, formData.Cost_Per_Case),
    [formData.Cases_Stolen, formData.Cost_Per_Case]
  );

  const sticksPilfered = useMemo(
    () => calculateSticksPilfered(formData, formData.Cases_Stolen),
    [formData, formData.Cases_Stolen]
  );

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
        <div className="flex items-start">
          <svg
            className="w-6 h-6 text-red-500 mr-3 mt-0.5"
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
            <h3 className="font-semibold text-red-900">Theft Tracking & Notes</h3>
            <p className="text-sm text-red-700 mt-1">
              Record any cargo theft or pilferage incidents. Metrics such as percentage
              pilfered and value of stolen items will be auto-calculated. Add general
              notes about the shipment.
            </p>
          </div>
        </div>
      </div>

      {/* Theft Incident Recording */}
      <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border-2 border-red-200">
        <h4 className="font-semibold text-red-900 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
              clipRule="evenodd"
            />
          </svg>
          Theft Incident Details
        </h4>

        <div className="mb-4 bg-red-100 rounded-lg p-3">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-red-600 mr-2 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-red-700">
              If theft or pilferage occurred during transit, record the number of cases
              and sticks stolen, check if seals were broken, and note any remaining
              differences.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields
            .filter((f) =>
              [
                'Cases_Stolen',
                'Sticks_Stolen',
                'Difference_Remaining',
                'Seals_Broken',
              ].includes(f.fieldName)
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

      {/* Auto-Calculated Theft Metrics */}
      {(percentPilfered !== null ||
        valueOfStolenItems !== null ||
        sticksPilfered !== null) && (
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
          <h4 className="font-semibold text-orange-900 mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            Auto-Calculated Theft Analytics
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Percent Pilfered */}
            {percentPilfered !== null && (
              <AutoCalculatedField
                label="Percent Pilfered"
                value={percentPilfered}
                valueType="percentage"
                size="medium"
                variant="warning"
                formula="(Cases Stolen ÷ Total Cases) × 100"
                calculation={`(${formData.Cases_Stolen || 0} ÷ ${totalCases}) × 100 = ${percentPilfered.toFixed(2)}%`}
                sourceFields={[
                  { label: 'Cases Stolen', value: formData.Cases_Stolen || 0 },
                  { label: 'Total Cases', value: totalCases },
                ]}
              />
            )}

            {/* Value of Stolen Items */}
            {valueOfStolenItems !== null && (
              <AutoCalculatedField
                label="Value of Stolen Items"
                value={valueOfStolenItems}
                valueType="currency"
                size="medium"
                variant="warning"
                formula="Cases Stolen × Cost Per Case"
                calculation={`${formData.Cases_Stolen || 0} × $${formData.Cost_Per_Case || 0} = $${valueOfStolenItems.toLocaleString()}`}
                sourceFields={[
                  { label: 'Cases Stolen', value: formData.Cases_Stolen || 0 },
                  {
                    label: 'Cost Per Case',
                    value: `$${formData.Cost_Per_Case || 0}`,
                  },
                ]}
              />
            )}

            {/* Estimated Sticks Pilfered */}
            {sticksPilfered !== null && (
              <AutoCalculatedField
                label="Estimated Sticks Pilfered"
                value={sticksPilfered}
                valueType="number"
                size="medium"
                variant="warning"
                formula="Cases Stolen × Avg Sticks/Case"
                sourceFields={[
                  { label: 'Cases Stolen', value: formData.Cases_Stolen || 0 },
                  {
                    label: 'Estimated',
                    value: `${sticksPilfered.toLocaleString()} sticks`,
                  },
                ]}
              />
            )}
          </div>

          <div className="mt-4 text-xs text-orange-700 bg-orange-100 rounded-lg p-3">
            <strong>Note:</strong> These metrics are automatically calculated based on
            theft incident data and product line items. The sticks pilfered is
            estimated using the average sticks per case from your product details.
          </div>
        </div>
      )}

      {/* Theft Context - No Theft Recorded */}
      {!formData.Cases_Stolen && !formData.Sticks_Stolen && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg
              className="w-6 h-6 text-emerald-600 mr-3 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h4 className="font-semibold text-emerald-900">No Theft Incidents</h4>
              <p className="text-sm text-emerald-700 mt-1">
                No cargo theft has been recorded for this shipment. If theft occurs,
                update the fields above to track the incident.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* General Notes */}
      <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 border-2 border-slate-200">
        <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Shipment Notes
        </h4>

        <div className="mb-4 bg-slate-100 rounded-lg p-3">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-slate-600 mr-2 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-slate-700">
              Add any additional notes, special instructions, or important observations
              about this shipment.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {fields
            .filter((f) => f.fieldName === 'Notes')
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
    </div>
  );
};
