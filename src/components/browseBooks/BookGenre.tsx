"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const sortOptions = [
  {
    value: "thriller",
    label: "Thriller",
  },
  {
    value: "fantasy",
    label: "Fantasy",
  },
  {
    value: "mystery",
    label: "Mystery",
  },
  {
    value: "romance",
    label: "Romance",
  },
  {
    value: "sci-fi",
    label: "Sci-Fi",
  },
  {
    value: "horror",
    label: "Horror",
  },
  {
    value: "fiction",
    label: "Fiction",
  },
  {
    value: "non-fiction",
    label: "Non-Fiction",
  },
  {
    value: "biography",
    label: "Biography",
  },
  {
    value: "autobiography",
    label: "Autobiography",
  },
  {
    value: "poetry",
    label: "Poetry",
  },
  {
    value: "classic",
    label: "Classic",
  },
  {
    value: "children",
    label: "Children's",
  },
  {
    value: "adventure",
    label: "Adventure",
  },
  {
    value: "crime",
    label: "Crime",
  },
  {
    value: "detective",
    label: "Detective",
  },
  {
    value: "drama",
    label: "Drama",
  },
  {
    value: "historical",
    label: "Historical",
  },
  {
    value: "humor",
    label: "Humor",
  },
  {
    value: "philosophical",
    label: "Philosophical",
  },
];

export default function BookGenre({
  setGenre,
}: {
  setGenre: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-[200px] justify-between text-[12px]"
        >
          {value ? (
            sortOptions.find((framework) => framework.value === value)?.label
          ) : (
            <span className="text-[0.8rem] font-semibold">Genre</span>
          )}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0 z-10">
        <Command>
          <CommandGroup>
            {sortOptions.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  setGenre(currentValue);
                }}
                className="text-[12px] cursor-pointer"
              >
                {framework.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
