import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa6";
import { HiOutlineClipboardList } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddToReadingListMutation, useAddToWishListMutation, useGetReadingListQuery, useGetWishListQuery, useRemoveFromReadingListMutation, useRemoveFromWishListMutation } from "../redux/feature/book/bookApi";
import { useAppSelector } from "../redux/hooks";
import { IBook } from "../types";



const ItemRegistry = ({book}:{book: IBook}) => {
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
    <div>
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
    </div>
  )
}

export default ItemRegistry