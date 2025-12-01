import React, { useMemo } from 'react';
import { ShipmentData } from '../../../types/shipment';
import { getStepFields } from '../../../lib/wizardStepMapping';
import { FormField } from '../FormField';

interface Step6ScheduleProps {
  formData: ShipmentData;
  onChange: (field: keyof ShipmentData, value: any) => void;
}

export const Step6Schedule: React.FC<Step6ScheduleProps> = ({
  formData,
  onChange,
}) => {
  const fields = getStepFields(6, formData.Mode, formData.Destination_Country);

  // Auto-calculate Lead Time Days
  const leadTimeDays = useMemo(() => {
    if (!formData.ETD || !formData.ETA) return null;

    try {
      const etd = new Date(formData.ETD);
      const eta = new Date(formData.ETA);

      if (eta <= etd) return null; // Invalid: ETA must be after ETD

      const diffTime = Math.abs(eta.getTime() - etd.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return diffDays;
    } catch {
      return null;
    }
  }, [formData.ETD, formData.ETA]);

  const isJapan = formData.Destination_Country === 'Japan';
  const isTaiwan = formData.Destination_Country === 'Taiwan';

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-violet-50 border-l-4 border-violet-500 p-4 rounded-r-lg">
        <div className="flex items-start">
          <svg
            className="w-6 h-6 text-violet-500 mr-3 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h3 className="font-semibold text-violet-900">Schedule & Timeline</h3>
            <p className="text-sm text-violet-700 mt-1">
              Enter departure, arrival, and milestone dates. Lead time will be
              auto-calculated from ETD and ETA.
            </p>
          </div>
        </div>
      </div>

      {/* Core Schedule Fields */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Core Timeline</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fields
            .filter((f) =>
              ['ETD', 'ETS', 'ETA'].includes(f.fieldName)
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

        {/* Lead Time Auto-Calculation */}
        {leadTimeDays !== null && (
          <div className="mt-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-6 border-2 border-indigo-700 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center text-sm font-medium text-indigo-100 mb-1">
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
                  Lead Time (Auto-Calculated)
                </div>
                <div className="text-5xl font-bold text-white">
                  {leadTimeDays}
                  <span className="text-2xl ml-2">days</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-indigo-200">
                  {formData.ETD && new Date(formData.ETD).toLocaleDateString()}
                </div>
                <div className="text-3xl text-white my-2">→</div>
                <div className="text-xs text-indigo-200">
                  {formData.ETA && new Date(formData.ETA).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-indigo-100 bg-indigo-800/30 rounded-lg p-2">
              <strong>Formula:</strong> Lead Time = ETA - ETD
            </div>
          </div>
        )}

        {/* Date Validation Warning */}
        {formData.ETD && formData.ETA && leadTimeDays === null && (
          <div className="mt-4 bg-red-50 border border-red-300 rounded-lg p-3">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-red-600 mr-2 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-sm text-red-700">
                <strong>Invalid Dates:</strong> ETA must be after ETD. Please check your
                dates.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Japan/Taiwan Specific Fields */}
      {(isJapan || isTaiwan) && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
          <div className="flex items-start mb-4">
            <span className="text-2xl mr-3">{isJapan ? '🇯🇵' : '🇹🇼'}</span>
            <div>
              <h4 className="font-semibold text-amber-900">
                {isJapan ? 'Japan' : 'Taiwan'} Additional Milestones
              </h4>
              <p className="text-sm text-amber-700 mt-1">
                {isJapan
                  ? 'Track Tokyo arrival, Memphis rail hub, LA port, and cut-off dates'
                  : 'Track Memphis rail hub and LA port arrival dates'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields
              .filter((f) =>
                !['ETD', 'ETS', 'ETA', 'Lead_Time_Days'].includes(f.fieldName)
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
      )}
    </div>
  );
};
