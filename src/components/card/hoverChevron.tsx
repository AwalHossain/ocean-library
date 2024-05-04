import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChevronDown } from "lucide-react";
import React, { useEffect } from "react";
import { HoverContent } from "./hoverContent";

export function HoverChevron({
  bookId,
  setUpdatingBookId,
  setOpenChevronBookId,
  openChevronBookId,
}: {
  bookId: string;
  setUpdatingBookId: (id: string | null) => void;
  setOpenChevronBookId: (id: string | null) => void;
  openChevronBookId: string | null;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    setIsOpen(bookId === openChevronBookId);
  }, [bookId, openChevronBookId]);

  const handleClick = () => {
    setIsOpen(!isOpen);
    setOpenChevronBookId(isOpen ? null : bookId);
  };

  return (
    <HoverCard open={isOpen}>
      <HoverCardTrigger asChild onClick={handleClick}>
        <ChevronDown className="text-white cursor-pointer inline-block w-auto h-auto" />
      </HoverCardTrigger>
      <HoverCardContent className="w-auto max-h-[250px] p-1.5 border-2 border-[#4444444d]">
        <HoverContent bookId={bookId} setUpdatingBookId={setUpdatingBookId} />
      </HoverCardContent>
    </HoverCard>
  );
}
