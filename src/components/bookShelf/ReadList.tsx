import { IBook } from "@/types";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";

interface ReadListProps {
  item: {
    book: IBook;
    status: string;
  };
}

export default function ReadList({ item }: ReadListProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 w-full items-center bg-[#e8e0c6] p-5">
      <div className="w-[60px] h-[60px] md:w-[60px] md:h-[80px] sm:mx-auto">
        <img src={item.book.thumbnail} className="w-full h-full" alt="" />
      </div>
      <div className="mx-auto hidden md:block">
        <h2 className="text-xl font-semibold">{item.book.title}</h2>
        <p className="text-sm font-semibold">{item.book.author}</p>
      </div>
      <div className=" justify-center items-center space-x-1 hidden sm:flex">
        {Array.from({ length: 3 }, (_, index) => (
          <svg
            key={index}
            className="h-4 w-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <div className="mx-auto hidden lg:block">
        <span className="tex-xl font-semibold">
          {item.book.updatedAt
            ? format(new Date(item.book.updatedAt), "dd MMM yyyy")
            : "N/A"}
        </span>
      </div>
      <div className="ml-auto sm:mx-auto ">
        <div className="bg-[#f44336] text-white px-3 py-1 rounded-md space-x-1 cursor-pointer flex items-center">
          <span>Remove</span>
          <span>
            <Trash2 size={16} className="text-inline text-center" />
          </span>
        </div>
      </div>
    </div>
  );
}
