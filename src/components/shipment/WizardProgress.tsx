import React from 'react';
import { getVisibleSteps, getStepTitle } from '../../lib/wizardStepMapping';
import { Mode, Country } from '../../types/shipment';

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
  visitedSteps: Set<number>;
  mode?: Mode;
  country?: Country;
}

export const WizardProgress: React.FC<WizardProgressProps> = ({
  currentStep,
  totalSteps: _totalSteps,
  visitedSteps,
  mode,
  country,
}) => {
  const visibleSteps = getVisibleSteps(mode, country);
  const currentIndex = visibleSteps.findIndex((s) => s.number === currentStep);
  const progressPercentage = ((currentIndex + 1) / visibleSteps.length) * 100;

  const getStepStatus = (stepNumber: number) => {
    if (stepNumber === currentStep) return 'current';
    if (visitedSteps.has(stepNumber)) return 'completed';
    return 'upcoming';
  };

  return (
    <div className="w-full bg-white border-b-2 border-gray-200 pb-6">
      {/* Step Counter */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {getStepTitle(currentStep, mode)}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Step {currentIndex + 1} of {visibleSteps.length}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-600">Progress</div>
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(progressPercentage)}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500 ease-out shadow-md"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Step Indicators (Desktop only) */}
      <div className="hidden lg:flex items-center justify-between mt-6 px-2">
        {visibleSteps.map((step, index) => {
          const status = getStepStatus(step.number);
          const isLast = index === visibleSteps.length - 1;

          return (
            <React.Fragment key={step.number}>
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                    transition-all duration-300 border-2
                    ${
                      status === 'completed'
                        ? 'bg-green-500 border-green-600 text-white'
                        : status === 'current'
                        ? 'bg-blue-600 border-blue-700 text-white ring-4 ring-blue-200 animate-pulse'
                        : 'bg-gray-200 border-gray-300 text-gray-500'
                    }
                  `}
                >
                  {status === 'completed' ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : status === 'current' ? (
                    <span>→</span>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-xs text-center max-w-[100px]">
                  <div
                    className={`font-medium ${
                      status === 'current'
                        ? 'text-blue-700'
                        : status === 'completed'
                        ? 'text-green-700'
                        : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div
                  className={`flex-1 h-1 mx-2 rounded transition-colors duration-300 ${
                    visitedSteps.has(step.number) ? 'bg-green-400' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile Step List */}
      <div className="lg:hidden mt-4">
        <div className="text-sm text-gray-600">
          <span className="font-medium">{getStepTitle(currentStep, mode)}</span>
          <span className="text-gray-400 mx-2">•</span>
          <span>
            Step {currentIndex + 1} of {visibleSteps.length}
          </span>
        </div>
      </div>
    </div>
  );
};
