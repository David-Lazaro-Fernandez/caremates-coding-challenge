"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useFormContext } from "@/src/context/form-context"
import { personalInfoSchema, type PersonalInfoFormData } from "@/src/lib/validation/form-schemas"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from '@/components/ui/input'

export default function PersonalInfoPage() {
    const router = useRouter()
    const { formData, updateFormData, setStepCompleted, isStepCompleted } = useFormContext()

    const form = useForm<PersonalInfoFormData>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            firstName: formData.firstName || "",
            middleName: formData.middleName || "",
            lastName: formData.lastName || "",
        },
    })

    // Track form changes
    const isDirty = form.formState.isDirty

    const onSubmit = (data: PersonalInfoFormData) => {
        updateFormData(data)
        setStepCompleted("personalInfo")
        router.push("/type-of-care")
    }

    return (
        <div className="pt-24 container w-full">
            <h1 className="text-2xl font-bold text-[#333950] mb-12">Let&apos;s get to know you</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-formLabel'>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Diego" className="placeholder:text-gray-300" {...field}  />
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
                                    <FormLabel className='text-formLabel'>Middle Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Dionisio" className="placeholder:text-gray-300" {...field} />
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
                                <FormLabel className='text-formLabel'>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: Luna Alexander" className="placeholder:text-gray-300" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-md font-medium hover:bg-primaryHover transition-colors"
                    >
                        Continue
                    </button>
                </form>
            </Form>
        </div>
    )
}

