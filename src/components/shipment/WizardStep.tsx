import React from 'react';
import { Button } from '../ui/button';

interface WizardStepProps {
  children: React.ReactNode;
  onNext: () => void;
  onBack: () => void;
  canGoNext: boolean;
  canGoBack: boolean;
  isLastStep?: boolean;
  onSubmit?: () => void;
}

export const WizardStep: React.FC<WizardStepProps> = ({
  children,
  onNext,
  onBack,
  canGoNext,
  canGoBack,
  isLastStep = false,
  onSubmit,
}) => {
  return (
    <div className="flex flex-col min-h-[600px]">
      {/* Step Content */}
      <div className="flex-1 bg-white rounded-xl p-8 shadow-sm border-2 border-gray-200">
        {children}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-gray-200">
        {/* Back Button */}
        <Button
          type="button"
          onClick={onBack}
          disabled={!canGoBack}
          variant="outline"
          className="px-8 py-3 text-base font-semibold disabled:opacity-40"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Button>

        {/* Next/Submit Button */}
        {isLastStep ? (
          <Button
            type="button"
            onClick={onSubmit}
            className="px-8 py-3 text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Submit Shipment
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onNext}
            disabled={!canGoNext}
            className="px-8 py-3 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {canGoNext ? (
              <>
                Next Step
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Complete Required Fields
              </>
            )}
          </Button>
        )}
      </div>

      {/* Help Text */}
      {!canGoNext && !isLastStep && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Fill in all required fields marked with{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-700">
              Required
            </span>{' '}
            to continue
          </p>
        </div>
      )}
    </div>
  );
};
