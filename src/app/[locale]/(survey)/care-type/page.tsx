
"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useFormContext } from "@/src/context/form-context"
import { careTypeSchema, type CareTypeFormData } from "@/src/lib/validation/form-schemas"
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function CareTypePage() {
  const router = useRouter()
  const { formData, updateFormData, setStepCompleted, isStepCompleted } = useFormContext()

  // Redirect if previous step not completed
  useEffect(() => {
    if (!isStepCompleted("personalInfo")) {
      router.push("/survey/personal-info")
    }
  }, [isStepCompleted, router])

  const form = useForm<CareTypeFormData>({
    resolver: zodResolver(careTypeSchema),
    defaultValues: {
      careType: formData.careType || undefined,
    },
  })

  const onSubmit = (data: CareTypeFormData) => {
    updateFormData(data)
    setStepCompleted("careType")

    // Skip location step for daycare
    if (data.careType === "daycare") {
      router.push("/results")
    } else {
      router.push("/zip")
    }
  }

  return (
    <div className="space-y-6 w-full container mt-24">
      <div>
        <h1 className="text-2xl font-bold text-[#333950]">What are you looking for today?</h1>
        <p className="text-[#333950]/70 mt-1">Type of care</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="careType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col gap-3">
                    {[
                      { value: "stationary", label: "Stationary" },
                      { value: "ambulatory", label: "Ambulatory" },
                      { value: "daycare", label: "Day Care" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50"
                      >
                        <RadioGroupItem value={option.value} className="border-[#A958FF] text-[#A958FF]" />
                        <span className="font-medium text-[#333950]">{option.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md font-medium hover:bg-primaryHover transition-colors"
            disabled={!form.formState.isValid}
          >
            Continue
          </button>
        </form>
      </Form>
    </div>
  )
}
