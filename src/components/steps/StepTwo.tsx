import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useAddBookMutation } from "@/redux/feature/book/bookApi";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { genres } from "../constant/data";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const accountFormSchema = z.object({
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

interface StepOneProps {
  form: UseFormReturn<AccountFormValues>;
  onSubmit: (data: AccountFormValues) => void;
  handlePrevStep: () => void;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const StepTwo: React.FC<StepOneProps> = ({
  form,
  handlePrevStep,
  setIsSubmitted,
}) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [addBook, { isLoading, data }] = useAddBookMutation();

  const handleGenreChange = (genres: string[]) => {
    setSelectedGenres(genres);
    form.setValue("genre", genres);
  };

  async function handleSubmit(data: AccountFormValues) {
    console.log(data, "from newbook");

    form.trigger();
    setIsSubmitted(true);
    const result = await addBook(data);
    console.log(result, "result");
    toast.success("Book added successfully");

    toast.error("You submitted the following values:");
    setIsSubmitted(true);
  }

  const filteredTags = genres.filter(
    (genre) =>
      genre.toLocaleLowerCase().includes(query.toLocaleLowerCase().trim()) &&
      !selectedGenres.includes(genre)
  );

  const isDisabled = !(
    genres.filter((genre) =>
      genre.toLocaleLowerCase().includes(query.toLocaleLowerCase().trim())
    ).length === 0 && !selectedGenres.includes(query)
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {/* <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Input placeholder="Your Genre" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* Publication Year */}
        <FormField
          control={form.control}
          name="publicationYear"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Publication Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] relative pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    fromYear={1960}
                    toYear={2030}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="genre"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <div className="relative w-96">
                  {selectedGenres.length > 0 && (
                    <div className="text-xs flex flex-wrap gap-1 p-2 mb-2">
                      {selectedGenres.map((genre) => {
                        return (
                          <div
                            key={genre}
                            className="rounded-full w-fit py-1.5 px-3 border border-gray-400
                        bg-gray-100 flex items-center
                        "
                          >
                            {genre}
                            <div>
                              <X
                                onClick={() =>
                                  setSelectedGenres(
                                    selectedGenres.filter((g) => g !== genre)
                                  )
                                }
                                onMouseDown={(e) => e.preventDefault()}
                                className="ml-1 h-4 w-4 cursor-pointer hover:text-red-600"
                              />
                            </div>
                          </div>
                        );
                      })}

                      <div className="w-full text-right text-sm ">
                        <span
                          className="cursor-pointer p-1 mb-2 rounded-full"
                          onClick={() => setSelectedGenres([])}
                        >
                          Clear all
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background flex items-center justify-between p-3  gap-2.5">
                    <input
                      type="text"
                      placeholder="Enter genre"
                      onChange={(e) => setQuery(e.target.value.trimStart())}
                      className="bg-transparent text-sm flex-1 caret-rose-600 outline-none"
                      onFocus={() => setMenuOpen(true)}
                      onBlur={() => setMenuOpen(false)}
                      ref={inputRef}
                      value={query}
                    />
                    <button
                      disabled={isDisabled}
                      onClick={() => {
                        setQuery("");
                        setSelectedGenres([...selectedGenres, query]);
                      }}
                      className=" text-rose-500 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-300"
                    >
                      + Add
                    </button>
                  </div>
                  {/* menu's */}
                  {menuOpen ? (
                    <div className="rounded-lg border border-input bg-background absolute w-full max-h-52 mt-2 p-1 flex overflow-y-auto ">
                      <ul className="w-full">
                        {filteredTags.length ? (
                          filteredTags.map((genre) => (
                            <li
                              key={genre}
                              className="p-1 hover:bg-gray-200 cursor-pointer"
                              onClick={() => {
                                setMenuOpen(false);
                                handleGenreChange([...selectedGenres, genre]);
                                inputRef.current?.blur();
                              }}
                              onMouseDown={(e) => e.preventDefault()}
                            >
                              {genre}
                            </li>
                          ))
                        ) : (
                          <li className="p-1">No genre found</li>
                        )}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </FormControl>
              <div className="flex flex-wrap mt-2"></div>
              <FormDescription>This is the genre of the book.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-wrap mt-2"></div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select a status</option>
                  <option value="popular">Popular</option>
                  <option value="Trendy">Trendy</option>
                  <option value="Recommended">Recommended</option>
                  <option value="Latest">Latest</option>
                </select>
              </FormControl>
              <FormDescription>This is the status of the book.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevStep}
            className="bg-blue-600 text-white p-2 rounded-md"
          >
            Prev step
          </button>

          {isLoading ? (
            <button className="bg-blue-600 text-white p-2 rounded-md">
              Submitting...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-md"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default StepTwo;
