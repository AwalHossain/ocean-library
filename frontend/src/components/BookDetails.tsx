import { HeartIcon } from "lucide-react";
import { toast } from "react-toastify";
import { useAddToWishListMutation, useGetWishListQuery } from "../redux/feature/book/bookApi";
import { useAppSelector } from "../redux/hooks";
import { IBook } from "../types";


const BookDetails = ({ book, key }: { book: IBook, key: number }) => {

  // 👇 API Login Mutation
  const [addToWishList] =
    useAddToWishListMutation();

    const {data} = useGetWishListQuery(undefined)

    const {wishlist}  = useAppSelector(state => state.wishListState)
    const {user}  = useAppSelector(state => state.userState)
    
  // Empty dependency array ensures this effect runs only once when the component mounts
  
    
  const onWishlistClick = async (bookId: string) => {
    try {
      const result = await addToWishList({ bookId: bookId })
      console.log(result, 'result');
      
      if (result.data?.success) {
        toast.success('Books added successfully')
      }

    } catch (error) {
      toast.error('Failed to add book to wishlist');
    }

  }


  const wishlisted = wishlist?.some((wishlistBook: IBook) => wishlistBook._id === book._id);


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
            <div>
            {
              
              wishlisted  ? <p>"wishlisted" </p> :
              <button onClick={() => onWishlistClick(book._id)}  className="transition ease-out duration-150">
                <HeartIcon  className="w-6 h-6" /> 
            </button>
            }
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