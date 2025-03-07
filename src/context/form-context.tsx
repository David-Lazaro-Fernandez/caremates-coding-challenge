"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";

export interface SurveyFormData {
  id?: string;
  termsAccepted?: boolean;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  careType?: "stationary" | "ambulatory" | "daycare";
  zipCode?: string;
}

type FormStep = "terms" | "personalInfo" | "careType" | "location" | "results";

interface FormContextType {
  formData: SurveyFormData;
  completedSteps: FormStep[];
  currentStep: FormStep;
  updateFormData: (data: Partial<SurveyFormData>) => void;
  setStepCompleted: (step: FormStep) => void;
  isStepCompleted: (step: FormStep) => boolean;
  resetForm: () => Promise<void>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<SurveyFormData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("surveyFormData");
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const [completedSteps, setCompletedSteps] = useState<FormStep[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("completedSteps");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [currentStep, setCurrentStep] = useState<FormStep>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("currentStep");
      return saved ? JSON.parse(saved) : "terms";
    }
    return "terms";
  });

  useEffect(() => {
    localStorage.setItem("surveyFormData", JSON.stringify(formData));
    localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
    localStorage.setItem("currentStep", JSON.stringify(currentStep));
  }, [formData, completedSteps, currentStep]);

  const updateFormData = (data: Partial<SurveyFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const setStepCompleted = (step: FormStep) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step]);
    }

    const stepOrder: FormStep[] = [
      "terms",
      "personalInfo",
      "careType",
      "location",
      "results",
    ];
    const currentIndex = stepOrder.indexOf(step);
    const nextStep = stepOrder[currentIndex + 1];
    if (nextStep) {
      setCurrentStep(nextStep);
    }
  };

  const isStepCompleted = (step: FormStep) => {
    return completedSteps.includes(step);
  };

  const resetForm = async () => {
    localStorage.removeItem("surveyFormData");
    localStorage.removeItem("completedSteps");
    localStorage.removeItem("currentStep");

    setFormData({});
    setCompletedSteps([]);
    setCurrentStep("terms");

    return new Promise<void>((resolve) => setTimeout(resolve, 100));
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        completedSteps,
        currentStep,
        updateFormData,
        setStepCompleted,
        isStepCompleted,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
