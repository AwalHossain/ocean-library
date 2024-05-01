import { setUserPrefernce } from "@/redux/feature/book/bookSlice";

import { useGetAllbooksQuery } from "@/redux/feature/book/bookApi";
import { useAppSelector } from "@/redux/hooks";
import { IBook, IItem } from "@/types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HoverChevron } from "../card/hoverChevron";
import { Separator } from "../ui/separator";

const BookCards = () => {
  const { data, isFetching, isSuccess } = useGetAllbooksQuery(undefined);
  const [updatingBookId, setUpdatingBookId] = useState<string | null>(null);
  console.log(data, "data for invalidation");

  const { user } = useAppSelector((state) => state.userState);
  const books: IBook[] = data?.data ?? [];

  const getStatus = books.flatMap((item: IBook) =>
    item?.userPreference?.map((pref) => ({ ...pref, bookId: item._id }))
  );
  const userPreferences = getStatus?.filter(
    (item: IItem | undefined) => item?.user && item?.user === user?._id
  );
  // dispatch();

  console.log(userPreferences, "userPreference", getStatus);

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
                    className="bg-[#3d9363] pl-2 text-white
                 antialiased h-[28px] flex text-[13px] w-full justify-center items-center"
                  >
                    <span className="inline-block pr-5px sm:pr-[18px] w-[80%] cursor-pointer">
                      {isUpdating ? (
                        <span>saving...</span>
                      ) : userPreference?.status ? (
                        userPreference?.status
                      ) : (
                        "want to read"
                      )}
                    </span>
                    <Separator orientation="vertical" />
                    <div className="w-[20%]">
                      <HoverChevron
                        bookId={book._id}
                        setUpdatingBookId={setUpdatingBookId}
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
            );
          })}
          ;
        </div>
      </div>
    </div>
  );
};

export default BookCards;
