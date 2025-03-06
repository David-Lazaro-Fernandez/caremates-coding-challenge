"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useFormContext } from "@/src/context/form-context"
import { useUnsavedChanges } from "@/src/context/unsaved-changes-context"
import { locationSchema, type LocationFormData } from "@/src/lib/validation/form-schemas"
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { useTranslations } from "next-intl"


export default function LocationPage() {
  const router = useRouter()
  const { formData, updateFormData, setStepCompleted, isStepCompleted } = useFormContext()
  const { setHasUnsavedChanges } = useUnsavedChanges()
  const t = useTranslations("zipCode")

  // Redirect if previous step not completed
  useEffect(() => {
    if (!isStepCompleted("careType")) {
      router.push("/start")
    }
    
    if (formData.careType === "daycare") {
      router.push("/results")
    }
  }, [isStepCompleted, formData.careType, router])

  const form = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      zipCode: formData.zipCode || "",
    },
  })

   // Track form changes
   const isDirty = form.formState.isDirty

   // Update unsaved changes state
   useEffect(() => {
       setHasUnsavedChanges(isDirty)
       return () => setHasUnsavedChanges(false)
   }, [isDirty, setHasUnsavedChanges])


  const onSubmit = (data: LocationFormData) => {
    updateFormData(data)
    setStepCompleted("location")
    router.push("/results")
  }

  return (
    <div className="space-y-6 container w-full mt-24">
      <div>
        <h1 className="text-2xl font-bold text-[#333950]">{t("heading")}</h1>
        <p className="text-[#333950]/70 mt-1">{t("title")}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder={t("placeholder")} 
                    className="placeholder:text-gray-300" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
                <a 
                  href="#" 
                  className="text-[#A958FF] text-sm hover:underline mt-2 inline-block"
                >
                  {t("dontKnow")}
                </a>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full py-2 mt-10"
            disabled={!form.formState.isValid}
          >
            {t("continue")}
          </Button>
        </form>
      </Form>
    </div>
  )
}
