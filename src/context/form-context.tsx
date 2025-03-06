"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define the form data structure
export interface SurveyFormData {
  termsAccepted?: boolean
  firstName?: string
  middleName?: string
  lastName?: string
  careType?: "stationary" | "ambulatory" | "daycare"
  zipCode?: string
}

// Define the steps
type FormStep = "terms" | "personalInfo" | "careType" | "location" | "results"

// Define the context structure
interface FormContextType {
  formData: SurveyFormData
  completedSteps: FormStep[]
  currentStep: FormStep
  updateFormData: (data: Partial<SurveyFormData>) => void
  setStepCompleted: (step: FormStep) => void
  isStepCompleted: (step: FormStep) => boolean
  resetForm: () => void
}

// Create the context
const FormContext = createContext<FormContextType | undefined>(undefined)

// Create the provider component
export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<SurveyFormData>({})
  const [completedSteps, setCompletedSteps] = useState<FormStep[]>([])
  const [currentStep, setCurrentStep] = useState<FormStep>("terms")

  const updateFormData = (data: Partial<SurveyFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const setStepCompleted = (step: FormStep) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step])
    }

    // Update current step
    const stepOrder: FormStep[] = ["terms", "personalInfo", "careType", "location", "results"]
    const currentIndex = stepOrder.indexOf(step)
    const nextStep = stepOrder[currentIndex + 1]
    if (nextStep) {
      setCurrentStep(nextStep)
    }
  }

  const isStepCompleted = (step: FormStep) => {
    return completedSteps.includes(step)
  }

  const resetForm = () => {
    setFormData({})
    setCompletedSteps([])
    setCurrentStep("terms")
  }

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
  )
}

// Create a hook to use the context
export function useFormContext() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}

