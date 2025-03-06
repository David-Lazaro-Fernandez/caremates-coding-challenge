"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface UnsavedChangesContextType {
  hasUnsavedChanges: boolean
  setHasUnsavedChanges: (value: boolean) => void
  resetUnsavedChanges: () => void
}

const UnsavedChangesContext = createContext<UnsavedChangesContextType | undefined>(undefined)

export const UnsavedChangesProvider = ({ children }: { children: ReactNode }) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const resetUnsavedChanges = () => {
    setHasUnsavedChanges(false)
  }

  // Add beforeunload event listener
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?"
        return "You have unsaved changes. Are you sure you want to leave?"
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [hasUnsavedChanges])

  return (
    <UnsavedChangesContext.Provider value={{ hasUnsavedChanges, setHasUnsavedChanges, resetUnsavedChanges }}>
      {children}
    </UnsavedChangesContext.Provider>
  )
}

export function useUnsavedChanges() {
  const context = useContext(UnsavedChangesContext)
  if (context === undefined) {
    throw new Error("useUnsavedChanges must be used within an UnsavedChangesProvider")
  }
  return context
}

