"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useFormContext } from "@/src/context/form-context";
import { findMatchingFacilities } from "@/src/services/facility-service";
import type { Facility } from "@/src/types/facility";
import { Button } from "@/src/components/ui/button";
import { useTranslations } from "next-intl";

export default function ResultsPage() {
  const router = useRouter();
  const { formData, isStepCompleted, resetForm } = useFormContext();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("results");

  useEffect(() => {
    if (!isStepCompleted("careType")) {
      router.push("/care-type");
      return;
    }

    setLoading(true);
    const result = findMatchingFacilities(
      formData.careType!,
      formData.zipCode || "",
    );
    setFacilities(result.facilities || []);
    setLoading(false);
  }, [formData, isStepCompleted, router]);

  const handleNewApplication = async () => {
    await resetForm();
    router.push("/start");
  };

  const handleAdjustSearch = () => {
    if (formData.careType === "daycare") {
      router.push("/care-type");
    } else {
      router.push("/zip");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading results...</div>;
  }

  return (
    <div className="space-y-6 container w-full mt-8 md:mt-24  px-4 md:px-0">
      <Button
        onClick={handleNewApplication}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("createApplication")}
      </Button>

      <h1 className="text-2xl font-bold text-[#333950]">
        {facilities.length > 0 ? t("congratulations") : t("noFacilitiesFound")}
      </h1>

      <div className="space-y-4">
        {facilities.length > 0 ? (
          facilities.map((facility) => (
            <div
              key={facility.id}
              className="p-4 rounded-lg border border-gray-200"
            >
              <h3 className="font-semibold text-lg text-[#333950]">
                {facility.name}
              </h3>
              <p className="text-[#333950]/70 mt-1">{facility.address}</p>
              <Button
                onClick={() => router.push("/end")}
                className="py-2 mt-4 w-full"
              >
                {t("register")}
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-lg font-medium text-[#333950]">
              {t("noFacilitiesFound")}
            </p>
            <p className="text-[#333950]/70 mt-2">{t("searchHint")}</p>
            <Button
              onClick={handleAdjustSearch}
              className="mt-6 inline-block bg-primary text-white px-6 py-2 rounded-md font-medium"
            >
              {t("adjustSearch")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
