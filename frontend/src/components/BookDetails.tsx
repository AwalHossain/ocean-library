

import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaClipboardList, FaPencil, FaTrash } from "react-icons/fa6";
import { HiOutlineClipboardList } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddToReadingListMutation, useAddToWishListMutation, useGetReadingListQuery, useGetWishListQuery, useRemoveFromReadingListMutation, useRemoveFromWishListMutation } from "../redux/feature/book/bookApi";
import { useAppSelector } from "../redux/hooks";
import { IBook } from "../types";
import DeleteModal from "./DeleteModal";

const BookDetails = ({ book, key }: { book: IBook, key: number }) => {

  // 👇 API Login Mutation
  const [addToWishList,{isLoading:wishLoad}] = useAddToWishListMutation();
  const { data: wish } = useGetWishListQuery(undefined)
  const [removeFromWishList] = useRemoveFromWishListMutation();
  const [addToReadingList,{isLoading:readingLoad}] = useAddToReadingListMutation();
  const { data: finish } = useGetReadingListQuery(undefined)
  const [removeFromReadingList] = useRemoveFromReadingListMutation()
  // const {data: finishedList} = useGetFinishedListQuery(undefined)
  const [showModal, setShowModal] = useState(false);


  const { wishlist, readingList } = useAppSelector(state => state.userBookState)
  const { user } = useAppSelector(state => state.userState)

  // Empty dependency array ensures this effect runs only once when the component mounts


  const onAddWishlist = async (bookId: string) => {
    try {
      const result = await addToWishList({ bookId: bookId })
      if ((result as { data: any; }).data?.success) {
        toast.success('Books added to Wishlist successfully');
      }      
    } catch (error) {
      toast.error('Failed to add book to wishlist');
    }

  }


  const onRemoveFromWishlist = async (bookId: string) => {
    try {
      const result = await removeFromWishList(bookId)

      if ((result as { data: any; }).data?.success) {
        toast.success('Books removed from wishlist')
      }

    } catch (error) {
      toast.error('Failed to remove book from wishlist');
    }

  }
  const wishlisted = wishlist?.some((wishlistBook: IBook) => wishlistBook._id === book._id);


  const onAddToReadingList = async (bookId: string) => {
    try {
      const result = await addToReadingList({ bookId })
      console.log(result, 'result');

      if ((result as { data: any; }).data?.success) {
        toast.success('Books added ReadingList')
      }

    } catch (error) {
      toast.error('Failed to add book to readinglist');
    }
  }

  const onUpdateReadinglist = async (bookId: string) => {
    try {
      const result = await removeFromReadingList(bookId)
      console.log(result, 'result');

      if ((result as { data: any; }).data?.success) {
        toast.success('Books remove from ReadingList')
      }

    } catch (error) {
      toast.error('Failed to remove book from readinglist');
    }
  }

  const readinglisted = readingList?.some((readingListBook: IBook) => readingListBook._id === book._id);

  //  console.log(readinglist, 'readinglist');



  const navigate = useNavigate();

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
              {/* Wishlist Button */}
              {
                verifiedUser &&
                <div>
                  <div className=" flex justify-end space-x-2">
                    {
                    readingLoad  ? <span>Load...</span> :
                    <button className="btn btn-circle text-info text-2xl">
                      {readinglisted ? (
                        < AiFillHeart onClick={() => onUpdateReadinglist(book._id)} />
                      ) : (
                        < AiOutlineHeart onClick={() => onAddToReadingList(book._id)} />
                      )}
                    </button>
                    }
                    {
                      wishLoad ? <span>Load...</span> :
                    <button className="btn btn-circle text-info text-2xl">
                      {wishlisted ?
                        (< FaClipboardList onClick={() => onRemoveFromWishlist(book._id)} />)
                        :
                        (< HiOutlineClipboardList onClick={() => onAddWishlist(book._id)} />)
                      }
                    </button>
                    }

                  </div>
                </div>
              }
              {
                athorizedUser &&
                <div className="flex items-center gap-x-2 mt-8">
                  <h4 className="font-semibold">Action Center :</h4>
                  <button
                    onClick={() => navigate(`/update-book/${book._id}`)}
                    className="bg-cyan-700 hover:bg-cyan-800 p-2 rounded-full tooltip"
                    data-tip="Update Book"
                  >
                    <FaPencil className="text-white" />
                  </button>
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-red-700 hover:bg-red-800 p-2 rounded-full tooltip"
                    data-tip="Delete Book"
                  >
                    <FaTrash className="text-white" />
                  </button>
                </div>
              }
            </div>

            <div className="text-gray-500 space-x-2">
            </div>
          </div>

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