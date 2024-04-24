"use client";

import { Check } from "lucide-react";
import * as React from "react";

import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

const frameworks = [
  {
    value: "want to read",
    label: "Want to Read",
  },
  {
    value: "currently reading",
    label: "Currently Reading",
  },
  {
    value: "wishlist",
    label: "Wishlist",
  },
];

export function HoverContent() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Command className="">
      <CommandGroup className="p-0 m-0 ">
        {frameworks.map((framework) => (
          <CommandItem
            key={framework.value}
            value={framework.value}
            onSelect={(currentValue) => {
              setValue(currentValue === value ? "" : currentValue);
              setOpen(false);
            }}
            className="text-[13px] p-0 m-0! hover:bg-red-600!"
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                value === framework.value ? "opacity-100" : "opacity-0"
              )}
            />
            {framework.label}
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  );
}
