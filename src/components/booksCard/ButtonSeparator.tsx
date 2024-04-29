const ButtonWithSeparator = () => {
  const onLeftClick = () => {
    console.log("left button clicked");
  };
  const onRightClick = () => {
    console.log("right button clicked");
  };
  return (
    <div className="flex items-center rounded-full bg-green-500 text-white font-semibold w-full">
      <button
        onClick={onLeftClick}
        className="px-4 py-2 rounded-l-full hover:bg-green-600 transition-colors duration-300 w-[80%]"
      >
        leftText
      </button>
      <span className="h-6 border-l border-white"></span>
      <button
        onClick={onRightClick}
        className="px-4 py-2 rounded-r-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-200 transition-colors duration-300 w-[20%]"
      >
        right
      </button>
    </div>
  );
};

export default ButtonWithSeparator;
