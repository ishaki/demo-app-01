import React from 'react';
import { ShipmentData } from '../../../types/shipment';
import { getStepFields } from '../../../lib/wizardStepMapping';
import { FormField } from '../FormField';

interface Step8DocumentationProps {
  formData: ShipmentData;
  onChange: (field: keyof ShipmentData, value: any) => void;
}

export const Step8Documentation: React.FC<Step8DocumentationProps> = ({
  formData,
  onChange,
}) => {
  const fields = getStepFields(8, formData.Mode, formData.Destination_Country);

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
        <div className="flex items-start">
          <svg
            className="w-6 h-6 text-purple-500 mr-3 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h3 className="font-semibold text-purple-900">Documentation Tracking</h3>
            <p className="text-sm text-purple-700 mt-1">
              Track important document milestones including commercial invoice, packing
              list, TTB forms, and tax documents throughout the shipment lifecycle.
            </p>
          </div>
        </div>
      </div>

      {/* Commercial Invoice & Packing List */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
            <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
          </svg>
          Commercial Invoice & Packing List (CI/PL)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields
            .filter((f) =>
              ['Date_CI_PL_Drafted', 'Date_CI_PL_Printed'].includes(f.fieldName)
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

      {/* TTB Forms */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
        <h4 className="font-semibold text-amber-900 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          TTB (Alcohol & Tobacco Tax and Trade Bureau) Forms
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
              TTB forms are required for tobacco shipments entering the United States.
              Track drafting, printing, and signed receipt dates carefully.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fields
            .filter((f) =>
              [
                'Date_TTB_Drafted',
                'Date_TTB_Printed',
                'Dated_TTB_Received_Signed',
                'TTB_Complete',
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

      {/* Final Documents & Submission */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200">
        <h4 className="font-semibold text-emerald-900 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
              clipRule="evenodd"
            />
          </svg>
          Final Document Submission
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields
            .filter((f) =>
              [
                'Date_Final_Docs_Sent',
                'Date_Docs_Have_To_Be_Sent',
                'Final_Docs_Complete',
                'Final_Docs_To_EM',
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

      {/* Tax & Accounting Documents */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 border-2 border-rose-200">
        <h4 className="font-semibold text-rose-900 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
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
          Tax & Accounting
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields
            .filter((f) =>
              [
                'Docs_Sent_To_Tax',
                'Tax_Status',
                'Estimated_SWB_Available',
                'Accounting_Doc',
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

      {/* Documentation Tips */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200">
        <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
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
          Documentation Timeline Tips
        </h4>
        <ul className="text-sm text-purple-700 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              <strong>CI/PL (Commercial Invoice & Packing List)</strong> - Required
              customs documents listing cargo value and contents
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              <strong>TTB Forms</strong> - Federal permits required for tobacco
              imports to the USA
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              <strong>SWB (Sea Waybill)</strong> - Non-negotiable transport document
              for sea freight
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              Ensure all documents are sent before the deadline to avoid customs delays
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
