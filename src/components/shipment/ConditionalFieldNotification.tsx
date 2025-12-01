import React from 'react';
import { Mode, Country } from '../../types/shipment';

interface ConditionalFieldNotificationProps {
  mode?: Mode;
  country?: Country;
  variant?: 'info' | 'warning' | 'success';
  title: string;
  message: string;
  icon?: React.ReactNode;
  fieldList?: string[];
}

export const ConditionalFieldNotification: React.FC<ConditionalFieldNotificationProps> = ({
  mode,
  country,
  variant = 'info',
  title,
  message,
  icon,
  fieldList,
}) => {
  const variantStyles = {
    info: {
      container: 'bg-blue-50 border-blue-200',
      title: 'text-blue-900',
      message: 'text-blue-700',
      icon: 'text-blue-500',
      border: 'border-blue-500',
    },
    warning: {
      container: 'bg-amber-50 border-amber-200',
      title: 'text-amber-900',
      message: 'text-amber-700',
      icon: 'text-amber-500',
      border: 'border-amber-500',
    },
    success: {
      container: 'bg-emerald-50 border-emerald-200',
      title: 'text-emerald-900',
      message: 'text-emerald-700',
      icon: 'text-emerald-500',
      border: 'border-emerald-500',
    },
  };

  const styles = variantStyles[variant];

  const defaultIcon = (
    <svg
      className={`w-6 h-6 ${styles.icon} mr-3 mt-0.5`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className={`${styles.container} border-l-4 ${styles.border} p-4 rounded-r-lg`}>
      <div className="flex items-start">
        {icon || defaultIcon}
        <div className="flex-1">
          <h4 className={`font-semibold ${styles.title}`}>{title}</h4>
          <p className={`text-sm ${styles.message} mt-1`}>{message}</p>

          {/* Display mode/country badges */}
          {(mode || country) && (
            <div className="flex flex-wrap gap-2 mt-3">
              {mode && (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  mode === 'Air'
                    ? 'bg-sky-100 text-sky-800'
                    : 'bg-cyan-100 text-cyan-800'
                }`}>
                  {mode === 'Air' ? '✈️' : '🚢'} {mode} Mode
                </span>
              )}
              {country && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  📍 {country}
                </span>
              )}
            </div>
          )}

          {/* Display field list if provided */}
          {fieldList && fieldList.length > 0 && (
            <div className={`mt-3 ${styles.message}`}>
              <p className="text-xs font-semibold mb-1">Affected Fields:</p>
              <ul className="text-xs space-y-1">
                {fieldList.map((field, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-1">•</span>
                    <span>{field}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
