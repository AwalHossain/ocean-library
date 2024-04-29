export default function ModalContent() {
  const dataObj = [
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

  return (
    <div>
      <ul>
        {dataObj.map((framework) => (
          <li
            key={framework.value}
            className="hover:bg-gray-400 w-full p-2 cursor-pointer"
          >
            <span>{framework.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
