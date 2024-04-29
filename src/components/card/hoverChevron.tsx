import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChevronDown } from "lucide-react";
import React from "react";
import { HoverContent } from "./hoverContent";

export function HoverChevron() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <HoverCard open={isOpen} onOpenChange={setIsOpen}>
      <HoverCardTrigger asChild onClick={handleClick}>
        <ChevronDown className="text-white cursor-pointer inline-block w-auto h-auto" />
      </HoverCardTrigger>
      <HoverCardContent className="w-auto max-h-[250px] p-1.5 border-2 border-[#4444444d]">
        <HoverContent />
      </HoverCardContent>
    </HoverCard>
  );
}
