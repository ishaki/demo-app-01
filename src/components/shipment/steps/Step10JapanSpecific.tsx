import React from 'react';
import { ShipmentData } from '../../../types/shipment';
import { getStepFields } from '../../../lib/wizardStepMapping';
import { FormField } from '../FormField';

interface Step10JapanSpecificProps {
  formData: ShipmentData;
  onChange: (field: keyof ShipmentData, value: any) => void;
}

export const Step10JapanSpecific: React.FC<Step10JapanSpecificProps> = ({
  formData,
  onChange,
}) => {
  const fields = getStepFields(10, formData.Mode, formData.Destination_Country);

  // Japan country check
  if (formData.Destination_Country !== 'Japan') {
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
          Japan Destination Required
        </h3>
        <p className="text-gray-500 mt-2">
          This step is only applicable for shipments to Japan. Please go back to Step
          1 and select "Japan" as the destination country to access these fields.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
        <div className="flex items-start">
          <span className="text-3xl mr-3">🇯🇵</span>
          <div>
            <h3 className="font-semibold text-red-900">Japan-Specific Requirements</h3>
            <p className="text-sm text-red-700 mt-1">
              Additional fields required exclusively for shipments to Japan, including
              container tape color coding, checklist tracking, and STO date updates.
            </p>
          </div>
        </div>
      </div>

      {/* Container Identification */}
      <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border-2 border-red-200">
        <h4 className="font-semibold text-red-900 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z"
              clipRule="evenodd"
            />
          </svg>
          Container Tape Color Coding
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
              Japan requires color-coded tape on containers for easy visual
              identification at ports and warehouses. Record the tape color used for
              this shipment.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {fields
            .filter((f) => f.fieldName === 'Tape_Color')
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

        {/* Tape Color Reference */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-lg p-3 border-2 border-red-300 text-center">
            <div className="w-full h-8 bg-red-500 rounded mb-2"></div>
            <span className="text-xs font-medium text-gray-700">Red</span>
          </div>
          <div className="bg-white rounded-lg p-3 border-2 border-blue-300 text-center">
            <div className="w-full h-8 bg-blue-500 rounded mb-2"></div>
            <span className="text-xs font-medium text-gray-700">Blue</span>
          </div>
          <div className="bg-white rounded-lg p-3 border-2 border-green-300 text-center">
            <div className="w-full h-8 bg-green-500 rounded mb-2"></div>
            <span className="text-xs font-medium text-gray-700">Green</span>
          </div>
          <div className="bg-white rounded-lg p-3 border-2 border-yellow-300 text-center">
            <div className="w-full h-8 bg-yellow-400 rounded mb-2"></div>
            <span className="text-xs font-medium text-gray-700">Yellow</span>
          </div>
        </div>
      </div>

      {/* Container Checklist */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
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
          Container Checklist Status
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
              The container checklist verifies that all Japan customs requirements,
              documentation, and physical inspection items have been completed.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {fields
            .filter((f) => f.fieldName === 'Container_Checklist_Recorded')
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

      {/* STO Date Update */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
        <h4 className="font-semibold text-purple-900 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          STO Date Update Tracking
        </h4>

        <div className="mb-4 bg-purple-100 rounded-lg p-3">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-purple-600 mr-2 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-purple-700">
              <strong>STO (Stock Transport Order)</strong> dates may need to be updated
              in SAP when actual delivery dates change. Record when the STO was last
              updated.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {fields
            .filter((f) => f.fieldName === 'STO_Date_Updated')
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

      {/* Japan-Specific Tips */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
        <h4 className="font-semibold text-red-900 mb-3 flex items-center">
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
          Japan Compliance Tips
        </h4>
        <ul className="text-sm text-red-700 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              Japan has strict import regulations for tobacco products - ensure all
              documentation is accurate
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              Container tape colors help warehouse staff quickly identify shipment
              types during unloading
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              The container checklist must be completed before customs clearance can
              begin
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              Keep STO dates synchronized with actual delivery dates to maintain
              inventory accuracy
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
