import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import StepOne from "../steps/StepOne";
import StepTwo from "../steps/StepTwo";
import Stepper from "../steps/Stepper";

export default function NewBook() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const NUMBER_OF_STEPS = 2;

  const accountFormSchema = z.object({
    title: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters.",
      })
      .max(30, {
        message: "Name must not be longer than 30 characters.",
      }),
    author: z.string({
      required_error: "Please enter an author name.",
    }),
    description: z.string({
      required_error: "Please enter a description.",
    }),
    summary: z.string({
      required_error: "Please enter a summary.",
    }),
    thumbnail: z.string({
      required_error: "Please enter a thumbnail url",
    }),
    genre: z.array(
      z
        .string({
          required_error: "Please enter a genre.",
        })
        .min(1, {
          message: "Please enter at least one genre.",
        })
    ),

    publicationYear: z
      .date({
        required_error: "Please enter a publication year.",
      })
      .transform((val) => new Date(val)),
    status: z.enum(["popular", "Trendy", "Recommended", "Latest"], {
      required_error: "Please select a status.",
    }),
  });

  type AccountFormValues = z.infer<typeof accountFormSchema>;

  // This can come from your database or API.
  const defaultValues: Partial<AccountFormValues> = {
    // title: "",
    // description: "",
    // summary: "",
    // thumbnail: "",
    // genre: [],
    // publicationYear: new Date(),
    // status: "Latest",
    // language: "",
  };

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  const handleNextStep = async () => {
    const check = await form.trigger([
      "title",
      "description",
      "summary",
      "thumbnail",
    ]);

    const {
      formState: { errors },
    } = form;
    console.log(errors, "errors");

    if (check) {
      setCurrentStep((prev) =>
        prev === NUMBER_OF_STEPS - 1 ? prev : prev + 1
      );
    } else {
      toast.error("Please fill all the required fields");
    }
  };

  const handlePrevStep = () =>
    setCurrentStep((prev) => (prev <= 0 ? prev : prev - 1));

  // With this

  return (
    <div className="mt-20">
      <div>
        <Stepper
          currentStep={currentStep}
          numOfSteps={NUMBER_OF_STEPS}
          isSubmitted={isSubmitted}
        />
      </div>
      <div className="mx-auto">
        {/* Step One */}
        {currentStep === 0 && (
          <StepOne form={form} handleNextStep={handleNextStep} />
        )}
        {/* Step Two */}
        {currentStep === 1 && (
          <StepTwo
            form={form}
            handlePrevStep={handlePrevStep}
            setIsSubmitted={setIsSubmitted}
          />
        )}
      </div>
      <div className="mt-40 flex gap-10">
        {currentStep !== 0 && (
          <button
            onClick={handlePrevStep}
            className="bg-blue-600 text-white p-2 rounded-md"
          >
            Previous step
          </button>
        )}
        {currentStep !== NUMBER_OF_STEPS - 1 ? (
          <button
            onClick={handleNextStep}
            className="bg-blue-600 text-white p-2 rounded-md"
          >
            Next step
          </button>
        ) : (
          <button className="bg-blue-600 text-white p-2 rounded-md">
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
