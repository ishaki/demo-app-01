import React from 'react';
import { formatCalculatedValue } from '../../lib/autoCalculations';

interface AutoCalculatedFieldProps {
  label: string;
  value: number | null;
  valueType: 'days' | 'currency' | 'percentage' | 'number' | 'weight';
  formula?: string;
  calculation?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'primary' | 'success' | 'warning';
  sourceFields?: { label: string; value: string | number }[];
}

export const AutoCalculatedField: React.FC<AutoCalculatedFieldProps> = ({
  label,
  value,
  valueType,
  formula,
  calculation,
  size = 'medium',
  variant = 'default',
  sourceFields,
}) => {
  const variantStyles = {
    default: {
      container: 'from-blue-500 to-indigo-600 border-blue-700',
      text: 'text-white',
      subtext: 'text-blue-100',
      badge: 'bg-blue-800/30 text-blue-100',
    },
    primary: {
      container: 'from-indigo-500 to-purple-600 border-indigo-700',
      text: 'text-white',
      subtext: 'text-indigo-100',
      badge: 'bg-indigo-800/30 text-indigo-100',
    },
    success: {
      container: 'from-emerald-500 to-teal-600 border-emerald-700',
      text: 'text-white',
      subtext: 'text-emerald-100',
      badge: 'bg-emerald-800/30 text-emerald-100',
    },
    warning: {
      container: 'from-amber-500 to-orange-600 border-amber-700',
      text: 'text-white',
      subtext: 'text-amber-100',
      badge: 'bg-amber-800/30 text-amber-100',
    },
  };

  const sizeStyles = {
    small: {
      valueText: 'text-2xl',
      unitText: 'text-sm',
      labelText: 'text-xs',
      padding: 'p-3',
    },
    medium: {
      valueText: 'text-3xl',
      unitText: 'text-lg',
      labelText: 'text-sm',
      padding: 'p-4',
    },
    large: {
      valueText: 'text-5xl',
      unitText: 'text-2xl',
      labelText: 'text-sm',
      padding: 'p-6',
    },
  };

  const styles = variantStyles[variant];
  const sizing = sizeStyles[size];

  const formattedValue = formatCalculatedValue(value, valueType);

  return (
    <div
      className={`bg-gradient-to-br ${styles.container} rounded-lg ${sizing.padding} border-2 shadow-lg`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`flex items-center ${sizing.labelText} font-medium ${styles.subtext}`}>
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
          {label}
        </div>
        <div className={`flex items-center text-xs ${styles.subtext}`}>
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

      <div className={`${sizing.valueText} font-bold ${styles.text}`}>
        {formattedValue}
      </div>

      {/* Source Fields Display */}
      {sourceFields && sourceFields.length > 0 && (
        <div className="mt-3 text-right">
          {sourceFields.map((field, index) => (
            <div key={index} className={`text-xs ${styles.subtext}`}>
              {field.label}: {field.value}
            </div>
          ))}
        </div>
      )}

      {/* Formula Display */}
      {formula && (
        <div className={`mt-3 text-xs ${styles.badge} rounded-lg p-2`}>
          <strong>Formula:</strong> {formula}
        </div>
      )}

      {/* Calculation Display */}
      {calculation && (
        <div className={`mt-2 text-xs ${styles.badge} rounded-lg p-2`}>
          <strong>Calculation:</strong> {calculation}
        </div>
      )}
    </div>
  );
};
