

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { IBook } from "../types";
import DeleteModal from "./DeleteModal";
import ItemRegistry from "./ItemRegistry";

const BookDetails = ({ book, key }: { book: IBook, key: number }) => {


 
  // const {data: finishedList} = useGetFinishedListQuery(undefined)
  const [showModal, setShowModal] = useState(false);


  const { user } = useAppSelector(state => state.userState)




  const verifiedUser = user?.email
  const athorizedUser = user?.email && book?.addedBy === user.email;

  return (
    <>

      <div key={key} className="flex flex-col md:flex-col items-center md:items-start border border-gray-200 rounded-lg p-4 shadow-md">
        <div className="flex items-center md:justify-center mb-4 md:mb-0 md:mr-4">
          <img
            className="h-[240px] w-[170px] object-cover md:w-48 md:h-64 lws-bookThumbnail"
            src={book.thumbnail}
            alt="book"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between mb-2">

            <div className="text-gray-500 space-x-2">
              {/* Wishlist & readinglist Button */}
              <ItemRegistry book={book} />
            </div>

            <div className="text-gray-500 space-x-2">
            </div>
          </div>
              {/* see details */}
          <div className="space-y-2 mt-1 md:mt-0">
            <h4 className="text-lg md:text-xl font-semibold capitalize">{book.title}</h4>
            <p className="text-sm md:text-base text-gray-600">{book.author}</p>
            <div className="flex space-x-1 md:space-x-2">
              {/* Render stars dynamically based on book rating */}
              <Link
                to={`/book-details/${book._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-600"
              >
                See Details
              </Link>
            </div>
          </div>
        </div>
      </div>
      {showModal && <DeleteModal book={book} setShowModal={setShowModal} />}
    </>
  )
}

export default BookDetails;