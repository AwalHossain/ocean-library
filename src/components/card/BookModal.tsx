import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";
import ModalContent from "./ModalContent";

export function BookModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          //   onClick={onRightClick}
          className="px-4 py-3 rounded-r-full h-full hover:bg-green-600 transition-colors duration-300 w-[20%]"
        >
          <ChevronDown size={18} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <ModalContent />
      </DialogContent>
    </Dialog>
  );
}
