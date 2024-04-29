import { BookModal } from "../card/BookModal";

const ButtonWithSeparator = () => {
  const onLeftClick = () => {
    console.log("left button clicked");
  };
  const onRightClick = () => {
    console.log("right button clicked");
  };
  return (
    <div
      className="flex items-center rounded-full bg-page text-white font-semibold w-full"
      style={{
        fontFamily: '"Montserrat", sans-serif',
        fontWeight: "500",
      }}
    >
      <button
        onClick={onLeftClick}
        className="px-4 py-2 rounded-l-full hover:bg-green-600 transition-colors duration-300 w-[80%]"
      >
        want to read
      </button>
      <span className="h-10 border-l border-white"></span>

      <BookModal />
    </div>
  );
};

export default ButtonWithSeparator;
