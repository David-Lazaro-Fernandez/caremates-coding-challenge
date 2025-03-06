"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useFormContext } from "@/src/context/form-context"
import { personalInfoSchema, type PersonalInfoFormData } from "@/src/lib/validation/form-schemas"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/src/components/ui/form"
import { Input } from '@/src/components/ui/input'
import { Button } from "@/src/components/ui/button"
import { useTranslations } from "next-intl"

export default function PersonalInfoPage() {
  const router = useRouter()
  const { formData, updateFormData, setStepCompleted } = useFormContext()
  const t = useTranslations("personalInfo")

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: formData.firstName || "",
      middleName: formData.middleName || "",
      lastName: formData.lastName || "",
    },
  })

  const onSubmit = (data: PersonalInfoFormData) => {
    updateFormData(data)
    setStepCompleted("personalInfo")
    router.push("/care-type")
  }

  return (
    <div className="pt-24 container w-full">
      <h1 className="text-2xl font-bold text-[#333950] mb-12">
        {t("heading")}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-formLabel">
                    {t("firstName")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("placeholders.firstName")}
                      className="placeholder:text-gray-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-formLabel">
                    {t("middleName")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("placeholders.middleName")}
                      className="placeholder:text-gray-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-formLabel">
                  {t("lastName")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("placeholders.lastName")}
                    className="placeholder:text-gray-300"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full py-2 mt-10">
            {t("continue")}
          </Button>
        </form>
      </Form>
    </div>
  )
}
