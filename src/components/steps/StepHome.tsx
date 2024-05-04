import React from "react";
import Stepper from "./Stepper";

export default function StepHome() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const NUMBER_OF_STEPS = 5;

  const handleNextStep = () =>
    setCurrentStep((prev) => (prev === NUMBER_OF_STEPS - 1 ? prev : prev + 1));

  const handlePrevStep = () =>
    setCurrentStep((prev) => (prev <= 0 ? prev : prev - 1));

  return (
    <div className="mt-20">
      <Stepper currentStep={currentStep} numOfSteps={NUMBER_OF_STEPS} />
      <div className="mt-40 flex gap-10">
        <button
          onClick={handlePrevStep}
          className="bg-blue-600 text-white p-2 rounded-md"
        >
          Previous step
        </button>
        <button
          onClick={handleNextStep}
          className="bg-blue-600 text-white p-2 rounded-md"
        >
          Next step
        </button>
      </div>
    </div>
  );
}
