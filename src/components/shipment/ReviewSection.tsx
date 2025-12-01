import React, { useState } from 'react';

interface ReviewSectionProps {
  title: string;
  stepNumber: number;
  isExpanded?: boolean;
  onEdit?: (stepNumber: number) => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  isEmpty?: boolean;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  title,
  stepNumber,
  isExpanded = false,
  onEdit,
  children,
  icon,
  isEmpty = false,
}) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Header */}
      <div
        className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${
          expanded ? 'bg-gradient-to-r from-indigo-50 to-purple-50' : 'bg-gray-50 hover:bg-gray-100'
        }`}
        onClick={toggleExpanded}
      >
        <div className="flex items-center flex-1">
          {/* Step Number Badge */}
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm mr-3 ${
              isEmpty
                ? 'bg-gray-200 text-gray-500'
                : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
            }`}
          >
            {stepNumber}
          </div>

          {/* Icon (if provided) */}
          {icon && <div className="mr-3">{icon}</div>}

          {/* Title */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {isEmpty && (
              <p className="text-xs text-gray-500 mt-1">No data entered</p>
            )}
          </div>

          {/* Status Badge */}
          {!isEmpty && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-3">
              ✓ Complete
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(stepNumber);
              }}
              className="px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              Edit
            </button>
          )}

          {/* Expand/Collapse Icon */}
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${
              expanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      {expanded && (
        <div className="p-6 bg-white border-t border-gray-100">
          {isEmpty ? (
            <div className="text-center py-8 text-gray-400">
              <p>No information has been entered for this section.</p>
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
};

interface ReviewFieldProps {
  label: string;
  value: any;
  type?: 'text' | 'date' | 'number' | 'currency' | 'boolean' | 'textarea';
}

export const ReviewField: React.FC<ReviewFieldProps> = ({
  label,
  value,
  type = 'text',
}) => {
  // Handle empty values
  if (value === undefined || value === null || value === '') {
    return (
      <div className="py-2">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-400 italic">Not provided</dd>
      </div>
    );
  }

  // Format value based on type
  let formattedValue = value;
  if (type === 'date' && value) {
    formattedValue = new Date(value).toLocaleDateString();
  } else if (type === 'currency' && typeof value === 'number') {
    formattedValue = `$${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  } else if (type === 'boolean') {
    formattedValue = value ? 'Yes' : 'No';
  } else if (type === 'number' && typeof value === 'number') {
    formattedValue = value.toLocaleString();
  }

  return (
    <div className="py-2">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className={`mt-1 text-sm text-gray-900 ${type === 'textarea' ? 'whitespace-pre-wrap' : ''}`}>
        {formattedValue}
      </dd>
    </div>
  );
};
