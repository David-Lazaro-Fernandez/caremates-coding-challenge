'use client'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Confetti from 'react-confetti'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useFormContext } from '@/src/context/form-context'
import { Button } from '@/src/components/ui/button'


export default function EndPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const hospital = searchParams.get('hospital')
    const [showConfetti, setShowConfetti] = useState(true)
    const {resetForm} = useFormContext()
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowConfetti(false)
        }, 5000)

        return () => clearTimeout(timer)
    }, [])

    const handleNewApplication = () => {
        resetForm()
        router.push("/start")
    }

    return (
        <div className="space-y-6 mt-24 container w-full">
            <Button onClick={handleNewApplication} className="flex items-center">
                    <ArrowLeft className="w-4 h-4" />
                    Create a new application
            </Button>
            <div className='flex flex-col items-center w-full'>
                
                {showConfetti && (
                    <Confetti
                        width={window.innerWidth}
                        height={window.innerHeight}
                        recycle={true}
                        numberOfPieces={200}
                    />
                )}

                <Image
                    src="/confetti.png"
                    alt="Success"
                    width={100}
                    height={100}
                    className="mb-8"
                />

                <h1 className="text-xl font-bold text-primary mb-4">
                    ¡Congratulations!
                </h1>

                <p className="text-lg">
                    Thank you for submitting your application with us, please go to the{' '}
                    <span className="font-semibold text-primary">
                        {hospital || 'selected hospital'}
                    </span>{' '}
                    as soon as you can.
                </p>
            </div>

        </div>
    )
}