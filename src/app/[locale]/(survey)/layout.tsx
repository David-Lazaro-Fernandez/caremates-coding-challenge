import type React from "react";
import { FormProvider } from "../../../context/form-context";
import { UnsavedChangesProvider } from "@/src/context/unsaved-changes-context";

export default function SurveyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FormProvider>
      <UnsavedChangesProvider>{children}</UnsavedChangesProvider>
    </FormProvider>
  );
}
