'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StartPage() {

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
                <h1 className="text-lg font-bold text-[#333950]">
                    Hi There!
                </h1>
                <p className="text-gray-500">
                    Find the right care facility for your needs in less than 2 minutes
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <h2 className="text-md font-semibold text-[#333950] mb-2">Step 1: Review Your Details</h2>
                    <p className="text-[#333950]/70 text-sm">
                        Your provided information (name, type of care needed, and zip code) will be used to determine the best
                        available care facility for your needs.
                    </p>
                </div>

                <div>
                    <h2 className="text-md font-semibold text-[#333950] mb-2">Step 2: Confirm Your Match</h2>
                    <p className="text-[#333950]/70 text-sm">
                        After reviewing your details, confirm your selection. A care coordinator will then contact you to discuss
                        the facility's availability and next steps.
                    </p>
                </div>

                <div>
                    <h2 className="text-md font-semibold text-[#333950] mb-2">Step 3: Finalize Your Registration</h2>
                    <p className="text-[#333950]/70 text-sm">
                        Prepare to complete your registration by reviewing and providing any additional required documentation to
                        secure your placement.
                    </p>
                </div>
            </div>

            <div className="flex flex-col mt-6 gap-10">
                <label className="flex gap-6 justify-start items-start accent-primary">
                    <input type="checkbox" className="w-10 h-10 hover:cursor-pointer" />
                    <p className="text-sm text-gray-500">I confirm that I have read and agree to the <Link href='#' className='text-primary underline' >Caremates Terms of Use</Link>, and <Link href='#' className='text-primary underline'>[Facility] Terms of Use</Link>, <Link href='#' className='text-primary underline'>Consent to Use Electronic Signatures and Records.</Link></p>
                </label>
                <p className="text-sm text-gray-500">By clicking “Continue”, I acknowledge receipt of the <Link href='#' className='text-primary underline'>Caremates Privacy Policy </Link>, and I consent to the processing of my personal data in accordance with the <Link href='' className="text-primary underline">EU General Data Protection Regulation (GDPR)</Link>.</p>
            </div>

            <button className="bg-primary text-white px-3 py-2 rounded-md w-full mt-10 hover:bg-primaryHover transition-colors duration-200 ease-in-out">
                Continue
            </button>

        </div>
    );
}