import { useState, useEffect, useCallback } from 'react';
import { Mode, Country, ShipmentData } from '../../types/shipment';
import { getTotalSteps, getVisibleSteps, stepMetadata } from '../wizardStepMapping';
import { validateStep, canProceedFromStep } from '../wizardValidation';

export interface WizardNavigationState {
  currentStep: number;
  totalSteps: number;
  visitedSteps: Set<number>;
  canGoNext: boolean;
  canGoBack: boolean;
}

export interface UseWizardNavigationReturn {
  currentStep: number;
  totalSteps: number;
  visitedSteps: Set<number>;
  canGoNext: boolean;
  canGoBack: boolean;
  goNext: () => void;
  goBack: () => void;
  goToStep: (step: number) => void;
  resetWizard: () => void;
  markStepVisited: (step: number) => void;
}

interface UseWizardNavigationProps {
  formData: ShipmentData;
  mode?: Mode;
  country?: Country;
}

export const useWizardNavigation = ({
  formData,
  mode,
  country,
}: UseWizardNavigationProps): UseWizardNavigationReturn => {
  const [currentStep, setCurrentStep] = useState(1);
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([1]));

  // Calculate total steps based on mode and country
  const totalSteps = getTotalSteps(mode, country);

  // Check if we can proceed from current step
  const canGoNext = canProceedFromStep(currentStep, formData, mode, country) && currentStep < totalSteps;

  // Can always go back except from step 1
  const canGoBack = currentStep > 1;

  // Navigate to next step
  const goNext = useCallback(() => {
    if (!canGoNext) return;

    const visibleSteps = getVisibleSteps(mode, country);
    const currentIndex = visibleSteps.findIndex((s) => s.number === currentStep);

    if (currentIndex < visibleSteps.length - 1) {
      const nextStep = visibleSteps[currentIndex + 1].number;
      setCurrentStep(nextStep);
      setVisitedSteps((prev) => new Set([...prev, nextStep]));
    }
  }, [canGoNext, currentStep, mode, country]);

  // Navigate to previous step
  const goBack = useCallback(() => {
    if (!canGoBack) return;

    const visibleSteps = getVisibleSteps(mode, country);
    const currentIndex = visibleSteps.findIndex((s) => s.number === currentStep);

    if (currentIndex > 0) {
      const prevStep = visibleSteps[currentIndex - 1].number;
      setCurrentStep(prevStep);
    }
  }, [canGoBack, currentStep, mode, country]);

  // Navigate to specific step (used for Review edit buttons)
  const goToStep = useCallback((step: number) => {
    const visibleSteps = getVisibleSteps(mode, country);
    const isValidStep = visibleSteps.some((s) => s.number === step);

    if (isValidStep && step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
      setVisitedSteps((prev) => new Set([...prev, step]));
    }
  }, [mode, country, totalSteps]);

  // Reset wizard to initial state
  const resetWizard = useCallback(() => {
    setCurrentStep(1);
    setVisitedSteps(new Set([1]));
  }, []);

  // Mark a step as visited
  const markStepVisited = useCallback((step: number) => {
    setVisitedSteps((prev) => new Set([...prev, step]));
  }, []);

  // Update total steps when mode/country changes
  useEffect(() => {
    const newTotalSteps = getTotalSteps(mode, country);

    // If current step is now beyond total steps, go back
    if (currentStep > newTotalSteps) {
      const visibleSteps = getVisibleSteps(mode, country);
      if (visibleSteps.length > 0) {
        setCurrentStep(visibleSteps[visibleSteps.length - 1].number);
      }
    }
  }, [mode, country, currentStep]);

  // Sync with URL hash (optional)
  useEffect(() => {
    const hash = window.location.hash.replace('#step=', '');
    const stepFromHash = parseInt(hash, 10);

    if (stepFromHash && stepFromHash >= 1 && stepFromHash <= totalSteps) {
      setCurrentStep(stepFromHash);
    }
  }, []);

  // Update URL hash when step changes
  useEffect(() => {
    if (currentStep > 0) {
      window.location.hash = `step=${currentStep}`;
    }
  }, [currentStep]);

  return {
    currentStep,
    totalSteps,
    visitedSteps,
    canGoNext,
    canGoBack,
    goNext,
    goBack,
    goToStep,
    resetWizard,
    markStepVisited,
  };
};
