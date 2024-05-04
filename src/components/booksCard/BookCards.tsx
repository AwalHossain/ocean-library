import { setUserPrefernce } from "@/redux/feature/book/bookSlice";

import { useAppSelector } from "@/redux/hooks";
import { IBook, IItem } from "@/types";
import { Check } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HoverChevron } from "../card/hoverChevron";
import { Separator } from "../ui/separator";

interface CardProps {
  bookContent: IBook[];
}

const BookCards = ({ bookContent }: CardProps) => {
  const [openChevronBookId, setOpenChevronBookId] = useState<string | null>(
    null
  );
  const [updatingBookId, setUpdatingBookId] = useState<string | null>(null);

  const { user } = useAppSelector((state) => state.userState);
  const books: IBook[] = bookContent ?? [];

  const getStatus = books.flatMap((item: IBook) =>
    item?.userPreference?.map((pref) => ({ ...pref, bookId: item._id }))
  );
  const userPreferences = getStatus?.filter(
    (item: IItem | undefined) => item?.user && item?.user === user?._id
  );

  return (
    <div className="flex items-center justify-between">
      <div className="w-full">
        <div className="flex flex-wrap justify-center items-center ">
          {books.map((book, index) => {
            const userPreference = userPreferences.find(
              (item) => item?.bookId === book._id
            );
            setUserPrefernce(
              userPreference?.status ? userPreference?.status : "want to read"
            );

            const isUpdating = book._id === updatingBookId;

            return (
              <div
                key={index}
                className={`w-[150px] sm:w-[180px] p-2 sm:p-4 h-[330px] bg-book m-[10px]`}
                // style={{
                //   margin: "10px 10px",
                // }}
              >
                <div className="h-[250px]">
                  <Link to={`/book-details/${book._id}`}>
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className=" rounded-md w-full h-full object-cover"
                    />
                  </Link>
                </div>
                <div className="mt-4 text-center ">
                  <div
                    className=" pl-2 text-white
                 antialiased h-[28px] flex text-[13px] w-full justify-center items-center"
                  >
                    <div
                      className={`flex justify-center pr-5px sm:pr-[18px] w-[80%] h-full
                      ${
                        userPreference?.status
                          ? "text-gray-900 border-2 border-gray-300 border-r-0 font-semibold"
                          : "bg-[#3d9363]"
                      }
                    `}
                    >
                      {isUpdating ? (
                        <span>saving...</span>
                      ) : userPreference?.status ? (
                        <>
                          <span className="flex justify-center items-center">
                            <Check
                              size={20}
                              className="text-[#3d9363] inline-block font-bold  "
                              fontWeight={700}
                            />
                            {userPreference?.status}
                          </span>
                        </>
                      ) : (
                        <span
                          className="flex justify-center items-center cursor-pointer"
                          onClick={() => setOpenChevronBookId(book._id)}
                        >
                          want to read
                        </span>
                      )}
                    </div>
                    <Separator orientation="vertical" />
                    <div className="w-[20%] bg-[#3d9363] h-full">
                      <HoverChevron
                        bookId={book._id}
                        setUpdatingBookId={setUpdatingBookId}
                        openChevronBookId={openChevronBookId}
                        setOpenChevronBookId={setOpenChevronBookId}
                      />
                    </div>
                  </div>
                  {/* <h3 className="text-[1rem] font-semibold text-gray-900">
                  {book.title.length > 20
                    ? book.title.slice(0, 20) + "..."
                    : book.title.slice(0, 20)}
                </h3> */}
                  {/* <p className="text-[0.9rem] font-medium text-gray-900">
                  {book.author}
                </p> */}
                  <div className="flex justify-center items-center space-x-1">
                    {Array.from({ length: Number(book.rating) }, (_, index) => (
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
            );
          })}
          ;
        </div>
      </div>
    </div>
  );
};

export default BookCards;
