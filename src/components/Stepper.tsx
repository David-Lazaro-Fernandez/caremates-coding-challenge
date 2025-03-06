'use client'
import { useRouter, usePathname } from "next/navigation";

interface Step {
  label: string;
  path: string;
}

interface StepperProps {
  steps: Step[];
}

const Stepper = ({ steps }: StepperProps) => {
  const router = useRouter();
  const currentPath = usePathname().split('/').pop();

  // Encuentra el índice del paso actual
  const currentStepIndex = steps.findIndex(step => step.path === `/${currentPath}`) ;
  const handleStepClick = (path: string, index: number) => {
    // Solo permitir navegación a pasos completados o al paso actual
    if (index <= currentStepIndex) {
      router.push(path);
    }
  };

  return (
    <div className="w-64  p-4 ">
      <div className="relative">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isFuture = index > currentStepIndex;

          // No renderizar los pasos futuros
          if (isFuture) {
            return null;
          }

          return (
            <div
              key={step.path}
              className={`
                flex items-center gap-3 mb-6 cursor-pointer
                ${isCurrent ? 'font-bold' : ''}
              `}
              onClick={() => handleStepClick(step.path, index)}
            >
              <div className="relative">
                {/* Línea vertical conectora */}
                {index !== currentStepIndex && (
                  <div
                    className={`
                      absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-6
                      ${isCompleted ? 'bg-primary' : 'bg-gray-200'}
                    `}
                  />
                )}
                
                {/* Indicador del paso */}
                <div
                  className={`
                    w-4 h-4 rounded-full flex items-center justify-center
                    ${isCompleted ? 'bg-primary' : ''}
                    ${isCurrent ? 'bg-primary' : ''}
                  `}
                >
                  {isCompleted && (
                    <p className="text-2xl">.</p>
                  )}
                  {isCurrent && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>

              <span>{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper; 