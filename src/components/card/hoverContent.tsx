"use client";

import { Check } from "lucide-react";
import * as React from "react";

import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useAddToPrefernceMutation } from "@/redux/feature/book/bookApi";
import {
  setSavingPreference,
  setUserPrefernce,
} from "@/redux/feature/book/bookSlice";
import { useAppDispatch } from "@/redux/hooks";

const dataObj = [
  {
    value: "read",
    label: "Read",
  },
  {
    value: "reading",
    label: "Currently Reading",
  },
];
export function HoverContent({
  bookId,
  setUpdatingBookId,
}: {
  bookId: string;
  setUpdatingBookId: (id: string | null) => void;
}) {
  const [value, setValue] = React.useState("");
  const [loadingItem, setLoadingItem] = React.useState<string | null>(null);

  const [addToPrefernce] = useAddToPrefernceMutation();

  const dispatch = useAppDispatch();

  return (
    <Command className="">
      <CommandGroup className="p-0 m-0 ">
        {dataObj.map((item) => (
          <CommandItem
            key={item.value}
            value={item.value}
            onSelect={async (currentValue) => {
              setValue(currentValue === value ? "" : currentValue);
              dispatch(setUserPrefernce(item.label));
              setLoadingItem(item.value);
              setUpdatingBookId(bookId);
              dispatch(setSavingPreference(true));
              await addToPrefernce({ status: item.value, bookId });
              setLoadingItem(null);
              setSavingPreference(false);
              setUpdatingBookId(null);
            }}
            className="text-[13px] p-0 m-0! cursor-pointer aria-selected:bg-slate-400"
          >
            {loadingItem === item.value ? (
              <span className="w-40">Loading...</span>
            ) : (
              <>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </>
            )}
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  );
}
