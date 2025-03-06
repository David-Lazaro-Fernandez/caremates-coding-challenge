import Image from "next/image";
import Stepper from "./Stepper";
import LocaleSwitcher from "./LocaleSwitcher";
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
    <div className="bg-[#FDFBFF] flex flex-col justify-start items-start px-10 py-20 gap-10">
      <Image
        src="/logo.png"
        width={150}
        height={120}
        alt="Caremates Logo"
        className="object-fit"
      />
      <Stepper steps={steps} />
      <LocaleSwitcher />
    </div>
  );
}
