import { HeartIcon } from "lucide-react";
import { toast } from "react-toastify";
import { useAddToWishListMutation } from "../redux/feature/book/bookApi";
import { IBook } from "../types";


function BookDetails({ book, key }: { book: IBook, key: number }) {

  // 👇 API Login Mutation
  const [addToWishList] =
    useAddToWishListMutation();

  const onWishlistClick = async (bookId: string) => {
    try {
      const result = await addToWishList({ bookId: bookId })
      if (result.data?.success) {
        toast.success('Books added successfully')
      }

    } catch (error) {
      toast.error('Failed to add book to wishlist');
    }

  }


  // Use a for loop to render the correct number of stars
  const stars = [];
  for (let i = 0; i < book.rating.length; i++) {
    stars.push(
      <div className="flex">
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-[1rem] h-[1rem] text-amber-400">
          <path
            fill-rule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    );
  }


  
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
            <button onClick={() => onWishlistClick(book._id)} className="transition ease-out duration-150">
              <HeartIcon className="w-6 h-6" />
            </button>
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