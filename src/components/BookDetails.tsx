import { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { IBook } from "../types";
import DeleteModal from "./DeleteModal";
import ItemRegistry from "./ItemRegistry";
import { HoverChevron } from "./card/hoverChevron";
import { Separator } from "./ui/separator";

const BookDetails = ({ book, key }: { book: IBook; key: number }) => {
  // const {data: finishedList} = useGetFinishedListQuery(undefined)
  const [showModal, setShowModal] = useState(false);

  const { user } = useAppSelector((state) => state.userState);

  const verifiedUser = user?.email;
  const athorizedUser = user?.email && book?.addedBy === user.email;

  return (
    <>
      <div
        key={key}
        className="w-[180px] bg-book space-x-1 border-red-400 border"
      >
        <div className="">
          <h4 className="text-[13px] font-bold text-center my-[6px] text-[#181818]">
            Fiction
          </h4>
          <div className="w-[150px] h-[230px] m-auto">
            <img className="w-full h-full" src={book.thumbnail} alt="book" />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-[#3d9363] w-auto pl-2 text-white antialiased h-[28px] flex text-[13px] justify-center items-center">
              <span className="inline-block pr-[18px]">Want to read</span>
              <Separator orientation="vertical" />
              <HoverChevron />
            </div>
            <div className="text-gray-500 space-x-2">
              {/* Wishlist & readinglist Button */}
              <ItemRegistry book={book} />
            </div>

            <div className="text-gray-500 space-x-2"></div>
          </div>
          {/* see details */}
          <div className="space-y-2 mt-1 md:mt-0">
            {/* <h4 className="text-lg md:text-xl font-semibold capitalize">
              {book.title}
            </h4> */}
            <p className="text-sm md:text-base text-gray-600">{book.author}</p>
            <div className="flex space-x-1 md:space-x-2">
              {/* Render stars dynamically based on book rating */}
              {/* <Link
                to={`/book-details/${book._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-600"
              >
                See Details
              </Link> */}
            </div>
          </div>
        </div>
      </div>
      {showModal && <DeleteModal book={book} setShowModal={setShowModal} />}
    </>
  );
};

export default BookDetails;
