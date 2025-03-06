import Image from "next/image";
import Stepper from "./Stepper";
import LocaleSwitcher from "./LocaleSwitcher";
import { cn } from "../lib/utils";
export default function Navigation() {
  const steps = [
    { label: "Let's Get Started", path: "/start" },
    { label: "Personal Info", path: "/personal-info" },
    { label: "Type of Care", path: "/care-type" },
    { label: "Zip Code", path: "/zip" },
    { label: "Results", path: "/results" },
    { label: "Thank you", path: "/end" },
  ];

  return (
    <div
      className={cn(`
      bg-[#FDFBFF] flex flex-row justify-between items-center p-2 sticky top-0
      md:flex-col md:justify-start md:items-start md:px-10 md:py-20 md:gap-10
    `)}
    >
      <div className="relative w-32 h-24 md:w-42">
        <Image
          src="/logo.png"
          alt="Caremates Logo"
          fill
          className="object-contain"
        />
      </div>

      <Stepper steps={steps} />
      <LocaleSwitcher />
    </div>
  );
}
