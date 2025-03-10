"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/src/context/form-context";
import { useUnsavedChanges } from "@/src/context/unsaved-changes-context";
import {
  careTypeSchema,
  type CareTypeFormData,
} from "@/src/lib/validation/form-schemas";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Button } from "@/src/components/ui/button";
import { useTranslations } from "next-intl";
import { applicantService } from "@/src/services/application-service";

export default function CareTypePage() {
  const router = useRouter();
  const { formData, updateFormData, setStepCompleted, isStepCompleted } =
    useFormContext();
  const { setHasUnsavedChanges } = useUnsavedChanges();

  const t = useTranslations("typeOfCare");

  useEffect(() => {
    if (!isStepCompleted("personalInfo")) {
      router.push("/personal-info");
    }
  }, [isStepCompleted, router]);

  const form = useForm<CareTypeFormData>({
    resolver: zodResolver(careTypeSchema),
    defaultValues: {
      careType: formData.careType || undefined,
    },
  });

  const isDirty = form.formState.isDirty;

  useEffect(() => {
    setHasUnsavedChanges(isDirty);
    return () => setHasUnsavedChanges(false);
  }, [isDirty, setHasUnsavedChanges]);

  const onSubmit = (data: CareTypeFormData) => {
    updateFormData(data);
    setStepCompleted("careType");

    if (formData.id) {
      const careTypeMap = {
        stationary: "STATIONARY",
        ambulatory: "AMBULATORY",
        daycare: "DAY_CARE",
      } as const;

      applicantService.updateApplication(formData.id, {
        care_type: careTypeMap[data.careType],
      });
    }

    if (data.careType === "daycare") {
      router.push("/results");
    } else {
      router.push("/zip");
    }
  };

  const careOptions = [
    { value: "stationary", label: t("options.stationary") },
    { value: "ambulatory", label: t("options.ambulatory") },
    { value: "daycare", label: t("options.dayCare") },
  ];

  return (
    <div className="space-y-6 w-full container mt-24  px-4 md:px-0">
      <div>
        <h1 className="text-2xl font-bold text-[#333950]">{t("heading")}</h1>
        <p className="text-[#333950]/70 mt-1">{t("title")}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="careType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col gap-3"
                  >
                    {careOptions.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50"
                      >
                        <RadioGroupItem
                          value={option.value}
                          className="border-[#A958FF] text-[#A958FF]"
                        />
                        <span className="font-medium text-[#333950]">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full py-2 mt-10 disabled:bg-gray-100"
            disabled={!form.formState.isValid}
          >
            {t("continue")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
