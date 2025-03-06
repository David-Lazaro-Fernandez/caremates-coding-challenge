"use client";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { applicantService } from "@/src/services/application-service";
import { useTranslations } from "next-intl";
export default function StartPage() {
  const router = useRouter();
  const t = useTranslations("letsGetStarted");
  const handleNavigation = async () => {
    const data = await applicantService.createApplication({
      terms_accepted: true,
    });
    console.log(data);
    router.push("/personal-info");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="flex flex-col items-center text-start mb-8">
        <Image
          src="/hero.png"
          alt="Doctor consulting with patient illustration"
          width={150}
          height={150}
          className="mb-6"
        />
        <h1 className="text-lg font-bold text-[#333950]">{t("title")}</h1>
        <p className="text-gray-500">{t("heading")}</p>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-md font-semibold text-[#333950] mb-2">
            {t("steps.step1.title")}
          </h2>
          <p className="text-[#333950]/70 text-sm">
            {t("steps.step1.description")}
          </p>
        </div>

        <div>
          <h2 className="text-md font-semibold text-[#333950] mb-2">
            {t("steps.step2.title")}
          </h2>
          <p className="text-[#333950]/70 text-sm">
            {t("steps.step2.description")}
          </p>
        </div>

        <div>
          <h2 className="text-md font-semibold text-[#333950] mb-2">
            {t("steps.step3.title")}
          </h2>
          <p className="text-[#333950]/70 text-sm">
            {t("steps.step3.description")}
          </p>
        </div>
      </div>

      <div className="flex flex-col mt-6 gap-10">
        <label className="flex gap-6 justify-start items-start accent-primary">
          <input type="checkbox" className="w-10 h-10 hover:cursor-pointer" />
          <p className="text-sm text-gray-500">
            {t("agreement.text")}{" "}
            <Link href="#" className="text-primary underline">
              {t("agreement.termsOfUse")}
            </Link>
            , {t("agreement.and")}{" "}
            <Link href="#" className="text-primary underline">
              {t("agreement.facilityTerms")}
            </Link>
            .
          </p>
        </label>
        <p className="text-sm text-gray-500">
          {t("privacyNotice.text")}{" "}
          <Link href="#" className="text-primary underline">
            {t("privacyNotice.privacyPolicy")}
          </Link>{" "}
          {t("privacyNotice.gdprConsent")}
        </p>
      </div>

      <Button onClick={handleNavigation} className="w-full py-2 mt-10">
        Continue
      </Button>
    </div>
  );
}
