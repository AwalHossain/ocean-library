import { CheckIcon } from "lucide-react";
import React from "react";

interface StepperProps {
  currentStep: number;
  numOfSteps: number;
  isSubmitted: boolean; // Add this prop
}

export default function Stepper({
  currentStep,
  numOfSteps,
  isSubmitted,
}: StepperProps) {
  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: numOfSteps }, (_, i) => {
        const index = i + 1;
        const isActive = index === currentStep;
        const isCompleted =
          index <= currentStep || (index === numOfSteps && isSubmitted);

        return (
          <React.Fragment key={index}>
            <div className="flex justify-center items-center">
              <div
                className={`rounded-full border-2 ${
                  isCompleted
                    ? "bg-green-400 border-gray-200"
                    : "border-gray-400"
                } w-10 h-10 flex justify-center items-center`}
              >
                {isCompleted ? (
                  <span className="text-center">
                    <CheckIcon size={20} className="text-white" />
                  </span>
                ) : (
                  <span className="text-black text-center">{index}</span>
                )}
              </div>
            </div>
            {index !== numOfSteps && (
              <div
                className={`w-52 h-1 ${
                  isActive ? "bg-yellow-700" : "bg-gray-400"
                }`}
              ></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
