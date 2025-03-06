"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useFormContext } from "@/src/context/form-context"
import { findMatchingFacilities } from "@/src/services/facility-service"
import type { Facility } from "@/src/types/facility"

export default function ResultsPage() {
  const router = useRouter()
  const { formData, isStepCompleted, resetForm } = useFormContext()
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)

  // Redirect if required steps not completed
  useEffect(() => {
    if (!isStepCompleted("careType")) {
      router.push("/survey/care-type")
      return
    }

    // For non-daycare, check location
    if (formData.careType !== "daycare" && !isStepCompleted("location")) {
      router.push("/survey/location")
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
    router.push("/survey/terms")
  }

  if (loading) {
    return <div className="text-center py-10">Loading results...</div>
  }

  return (
    <div className="space-y-6 container w-full mt-24">
      <button onClick={handleNewApplication} className="flex items-center gap-2 text-[#A958FF] hover:underline">
        <ArrowLeft className="w-4 h-4" />
        Create a new application
      </button>

      <h1 className="text-2xl font-bold text-[#333950]">
        {facilities.length > 0
          ? "Congratulations! Here are the facilities we found for you."
          : "No matching facilities found"}
      </h1>

      <div className="space-y-4">
        {facilities.length > 0 ? (
          facilities.map((facility) => (
            <div key={facility.id} className="p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg text-[#333950]">{facility.name}</h3>
              <p className="text-[#333950]/70 mt-1">{facility.address}</p>
              <button 
              onClick={()=>router.push('/end')}
              className="w-full bg-primary text-white py-2 rounded-md font-medium hover:bg-primaryHover transition-colors mt-4">
                Register
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-lg font-medium text-[#333950]">No facilities found matching your criteria</p>
            <p className="text-[#333950]/70 mt-2">
              Try adjusting your search parameters or contact support for assistance
            </p>
            <Link
              href="/survey/care-type"
              className="mt-6 inline-block bg-primary text-white px-6 py-2 rounded-md font-medium"
            >
              Adjust Search
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

