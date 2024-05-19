import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { UseFormReturn, useController } from "react-hook-form";
import ReactQuill from "react-quill";
import { z } from "zod";
import { Textarea } from "../ui/textarea";

const accountFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  // dob: z.date({
  //   required_error: "A date of birth is required.",
  // }),
  author: z.string({
    required_error: "Please enter an author name.",
  }),
  description: z.string({
    required_error: "Please enter a description.",
  }),
  summary: z.string({
    message: "Please enter a summary.",
  }),
  thumbnail: z.string({
    required_error: "Please enter a thumbnail url",
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

interface StepOneProps {
  form: UseFormReturn<AccountFormValues>;
  onSubmit?: (data: AccountFormValues) => void;
  handleNextStep: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ form, handleNextStep }) => {
  const {
    field: { value, onChange },
  } = useController({
    name: "description",
    control: form.control,
  });

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const formats = [
    // "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "font",
  ];

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-gray-700">
                Title
              </FormLabel>
              <FormControl>
                <Input placeholder="Book name" {...field} required />
              </FormControl>
              {/* <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-gray-700">
                Author Name
              </FormLabel>
              <FormControl>
                <Input placeholder="Book name" {...field} required />
              </FormControl>
              {/* <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={() => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-gray-700">
                Description
              </FormLabel>
              <FormControl>
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  value={value}
                  onChange={onChange}
                />
              </FormControl>
              <FormDescription>
                This is the description that will be
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-gray-700">
                Summary
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your message here."
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-gray-700">
                Thumbnail
              </FormLabel>
              <FormControl>
                <Input placeholder="Thumbnail URL" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          onClick={handleNextStep}
          className="bg-blue-600 text-white p-2 rounded-md mt-10"
        >
          Next step
        </button>
      </form>
    </Form>
  );
};

export default StepOne;
