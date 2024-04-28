import { useGetAllbooksQuery } from "@/redux/feature/filter/filterApi";
import { IBook } from "@/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

interface BookCardProps {
  books: {
    title: string;
    author: string;
    rating: number;
    coverImage: string;
  }[];
}

const BookCard: React.FC<BookCardProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, isFetching, isSuccess } = useGetAllbooksQuery(undefined);

  const books: IBook[] = data?.data ?? [];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === books.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className="disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeftIcon className="h-6 w-6 text-gray-500" />
      </button>

      <div className="w-full overflow-hidden">
        <div className="flex space-x-6">
          {books.map((book, index) => (
            <div key={index} className={`flex flex-col items-center `}>
              <div className="w-[205px] h-[305px]">
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className=" rounded-md w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-center ">
                <h3 className="text-[1rem] font-semibold text-gray-900">
                  {book.title}
                </h3>
                <p className="text-[0.9rem] font-medium text-gray-900">
                  {book.author}
                </p>
                <div className="flex justify-center items-center space-x-1">
                  {Array.from({ length: book.rating }, (_, index) => (
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
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={currentIndex === books.length - 1}
        className="disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRightIcon className="h-6 w-6 text-gray-500" />
      </button>
    </div>
  );
};

export default BookCard;
