import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa6";
import { HiOutlineClipboardList } from "react-icons/hi";
import { toast } from "react-toastify";
import { useAddToReadingListMutation, useAddToWishListMutation, useGetReadingListQuery, useGetWishListQuery } from "../redux/feature/book/bookApi";
import { useAppSelector } from "../redux/hooks";
import { IBook } from "../types";

const BookDetails = ({ book, key }: { book: IBook, key: number }) => {

  // 👇 API Login Mutation
  const [addToWishList] =useAddToWishListMutation();
  const {data:wish} = useGetWishListQuery(undefined)
  const [addToReadingList] = useAddToReadingListMutation();
  const {data:finish } = useGetReadingListQuery(undefined)
  // const {data: finishedList} = useGetFinishedListQuery(undefined)

    const {wishlist,readingList}  = useAppSelector(state => state.userBookState)
    const {user}  = useAppSelector(state => state.userState)
    
  // Empty dependency array ensures this effect runs only once when the component mounts
  
    
  const onAddWishlist = async (bookId: string) => {
    try {
      const result = await addToWishList({ bookId: bookId })
      console.log(result, 'result');
      
      if (result?.data?.success) {
        toast.success('Books added successfully')
      }

    } catch (error) {
      toast.error('Failed to add book to wishlist');
    }

  }


  const onRemoveFromWishlist = async (bookId: string) => {
    try {
 

    } catch (error) {
      toast.error('Failed to add book to wishlist');
    }

  }
const wishlisted = wishlist?.some((wishlistBook: IBook) => wishlistBook._id === book._id);


 const onAddToReadingList = async (bookId: string) => {
  try {
    const result = await addToReadingList({ bookId: bookId })
    console.log(result, 'result');
    
    if (result?.data?.success) {
      toast.success('Books added ReadingList')
    }

  } catch (error) {
    toast.error('Failed to add book to readinglist');
  }
 }

 const onUpdateReadinglist = async (bookId: string) => {

 }

 const readinglisted = readingList?.some((readingListBook: IBook) => readingListBook._id === book._id);

//  console.log(readinglist, 'readinglist');
 

const verifiedUser = user?.email;
  
  return (
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
            <div className=" flex justify-end space-x-2">
                <button className="btn btn-circle text-info text-2xl">
                {readinglisted ? (
                  <FaClipboardList onClick={()=>onUpdateReadinglist(book._id)} />
                ) : (
                  <HiOutlineClipboardList onClick={()=>onAddToReadingList(book._id)} />
                )}
              </button>

              <button className="btn btn-circle text-info text-2xl"> 
              {wishlisted ? 
                (<AiFillHeart onClick={()=>onRemoveFromWishlist(book._id)} />)
              : 
               ( <AiOutlineHeart onClick={()=>onAddWishlist(book._id)} />)
              }
              </button>
            
            </div>
          }
            {/* Delete Button */}
            {/* <button onClick={() => handleDelete(book.id)} className="transition ease-out duration-150">
            <TrashIcon className="w-6 h-6" />
          </button> */}
          </div>

          <div className="text-gray-500 space-x-2">
            <button onClick={() => handleClick(book._id)} className="transition ease-out duration-150">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                {/* <!-- SVG path for the edit icon --> */}
              </svg>
            </button>
            <button onClick={() => handleDelete(book._id)} className="transition ease-out duration-150">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                {/* <!-- SVG path for the delete icon --> */}
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-2 mt-1 md:mt-0">
          <h4 className="text-lg md:text-xl font-semibold capitalize">{book.title}</h4>
          <p className="text-sm md:text-base text-gray-600">{book.author}</p>
          <div className="flex space-x-1 md:space-x-2">
            {/* Render stars dynamically based on book rating */}
          </div>
          <p className="text-base md:text-lg font-semibold text-indigo-500">{book.price}</p>
        </div>
      </div>
    </div>


  )
}

export default BookDetails;