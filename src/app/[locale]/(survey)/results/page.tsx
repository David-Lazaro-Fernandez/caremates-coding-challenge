"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useFormContext } from "@/src/context/form-context"
import { findMatchingFacilities } from "@/src/services/facility-service"
import type { Facility } from "@/src/types/facility"
import { Button } from "@/src/components/ui/button"
import { useTranslations } from "next-intl"

export default function ResultsPage() {
  const router = useRouter()
  const { formData, isStepCompleted, resetForm } = useFormContext()
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)
  const t = useTranslations("results")

  // Redirect if required steps not completed
  useEffect(() => {
    if (!isStepCompleted("careType")) {
      router.push("/care-type")
      return
    }

    // Find matching facilities
    setLoading(true)
    const result = findMatchingFacilities(formData.careType!, formData.zipCode || "")
    setFacilities(result.facilities || [])
    setLoading(false)
  }, [formData, isStepCompleted, router])

  const handleNewApplication = () => {
    resetForm()
    router.push("/start")
  }

  if (loading) {
    return <div className="text-center py-10">Loading results...</div>
  }

  return (
    <div className="space-y-6 container w-full mt-24">
      <button 
        onClick={handleNewApplication} 
        className="flex items-center gap-2 text-[#A958FF] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("createApplication")}
      </button>

      <h1 className="text-2xl font-bold text-[#333950]">
        {facilities.length > 0
          ? t("congratulations")
          : t("noFacilitiesFound")
        }
      </h1>

      <div className="space-y-4">
        {facilities.length > 0 ? (
          facilities.map((facility) => (
            <div key={facility.id} className="p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg text-[#333950]">{facility.name}</h3>
              <p className="text-[#333950]/70 mt-1">{facility.address}</p>
              <Button 
                onClick={() => router.push('/end')}
                className="py-2 mt-4 w-full"
              >
                {t("register")}
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-lg font-medium text-[#333950]">{t("noFacilitiesFound")}</p>
            <p className="text-[#333950]/70 mt-2">{t("searchHint")}</p>
            <Link
              href="/zip"
              className="mt-6 inline-block bg-primary text-white px-6 py-2 rounded-md font-medium"
            >
              {t("adjustSearch")}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}