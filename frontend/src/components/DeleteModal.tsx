import { IBook } from "../types";


interface IDeleteModalProps {
  book: IBook;
  setShowModal: (value: boolean) => void;
}

export default function DeleteModal({ book, setShowModal }: IDeleteModalProps) {
//   const [deleteBook] = useDeleteBookMutation();

  const onDeleteBook = () => {
    // deleteBook(book._id);
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <form className="bg-white shadow-lg rounded-lg w-96 p-6">
      <button
        onClick={() => setShowModal(false)}
        className="text-gray-500 hover:text-red-500 transition ease-in-out absolute top-2 right-2"
      >
        ✕
      </button>
      <h3 className="text-xl font-bold mb-4">Warning!</h3>
      <p className="text-sm mb-6">
        Are you sure you want to delete the book:{" "}
        <span className="text-blue-500 font-bold">{book.title}</span> by{" "}
        <span className="text-gray-600">{book.author}</span>
      </p>
      <div className="flex justify-end">
        <button
          onClick={onDeleteBook}
          className="px-4 py-2 rounded-md bg-red-600 text-white font-bold hover:bg-red-700 transition ease-in-out"
        >
          Confirm
        </button>
      </div>
    </form>
  </div>
  );
}