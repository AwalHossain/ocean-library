import { useAppSelector } from "@/redux/hooks";
import { ChevronDown, Pencil } from "lucide-react";
import { useState } from "react";
import ModalContent from "../card/ModalContent";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

const ButtonWithSeparator = ({ status }: { status: string | undefined }) => {
  const [showModal, setShowModal] = useState(false);
  const { userPreference } = useAppSelector((state) => state.userBookState);
  const onLeftClick = () => {
    setShowModal(true);
  };
  const onRightClick = () => {
    console.log(
      "right button clicked",
      status?.toLowerCase() === "want to read"
    );
  };
  let displayStatus = status;
  if (status?.toLowerCase() === "read") {
    displayStatus = "Read";
  } else if (status?.toLowerCase() === "reading") {
    displayStatus = "Reading";
  } else {
    displayStatus = "want to read";
  }
  console.log("status:", status);
  console.log("status.toLowerCase():", status?.toLowerCase(), displayStatus);
  return (
    <div
      className={`flex items-center rounded-full ${
        displayStatus === "want to read"
          ? "bg-page text-white"
          : "bg-white border-2 text-gray-800 border-gray-400"
      } font-semibold w-full`}
      style={{ fontFamily: '"Montserrat", sans-serif', fontWeight: "500" }}
    >
      <button
        onClick={onLeftClick}
        className={`px-2 py-2 transition-colors duration-300 ${
          displayStatus === "want to read"
            ? "w-[80%] rounded-l-full"
            : "w-full rounded-full"
        }`}
      >
        {userPreference !== "want to read" ? (
          <span>
            <Pencil size={16} className="text-slate-400 inline-block" />
            {userPreference}
          </span>
        ) : (
          userPreference
        )}
      </button>
      {(displayStatus === "want to read" || showModal) && (
        <>
          <span className="h-10 border-l border-white"></span>
          <Dialog
            open={showModal}
            onOpenChange={() => setShowModal(!showModal)}
          >
            <DialogTrigger asChild>
              <button
                // onClick={onRightClick}
                className="px-4 py-3 rounded-r-full h-full hover:bg-green-600 transition-colors duration-300 w-[20%]"
              >
                <ChevronDown size={18} className="w-full mx-auto" />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <ModalContent />
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default ButtonWithSeparator;
