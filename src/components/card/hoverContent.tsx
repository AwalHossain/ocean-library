"use client";

import { Check } from "lucide-react";
import * as React from "react";

import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useAddToPrefernceMutation } from "@/redux/feature/book/bookApi";
import { setUserPrefernce } from "@/redux/feature/book/bookSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

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
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [loadingItem, setLoadingItem] = React.useState<string | null>(null);

  const [addToPrefernce, { isLoading, error, data }] =
    useAddToPrefernceMutation();

  const { user } = useAppSelector((state) => state.userState);
  const { userPreference } = useAppSelector((state) => state.userBookState);
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
              setOpen(false);
              dispatch(setUserPrefernce(item.label));
              setLoadingItem(item.value);
              setUpdatingBookId(bookId);
              await addToPrefernce({ status: item.value, bookId });
              setLoadingItem(null);
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
