import { FaClipboardList } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import Container from '../components/container'
import { useGetWishListQuery, useRemoveFromWishListMutation } from '../redux/feature/book/bookApi'
import { useAppSelector } from '../redux/hooks'
import { IBook } from '../types'

export const Wishlist = () => {
    const { data: wishlist } = useGetWishListQuery(undefined)
    const { user } = useAppSelector(state => state.userState)
    const [removeFromWishList] = useRemoveFromWishListMutation();


    console.log('hellog from wish', wishlist);

    const onRemoveFromWishlist = async (bookId: string) => {
        try {
            const result = await removeFromWishList(bookId)

            if (result?.data?.success) {
                toast.success('Books removed from wishlist')
            }

        } catch (error) {
            toast.error('Failed to remove book from wishlist');
        }

    }

    const verifiedUser = user?.email;

    return (
        <Container>
            <div className='grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 px-5'>

                {
                    verifiedUser && wishlist?.wishlist.length >0 ?
                    wishlist?.wishlist?.map((book: IBook, index: number) => <div key={index} className="flex flex-col md:flex-col items-center md:items-start border border-gray-200 rounded-lg p-4 shadow-md">
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

                                    <div className=" flex justify-end space-x-2">

                                        <button className="btn btn-circle text-info text-2xl">

                                            < FaClipboardList onClick={() => onRemoveFromWishlist(book._id)} />

                                        </button>

                                    </div>
                                    {/* Delete Button */}
                                    {/* <button onClick={() => handleDelete(book.id)} className="transition ease-out duration-150">
                      <TrashIcon className="w-6 h-6" />
                    </button> */}
                                </div>

                                <div className="text-gray-500 space-x-2">
                                    <button className="transition ease-out duration-150">
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
                                    <button className="transition ease-out duration-150">
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
                    </div>)
                    : (
                        <div className='flex flex-col items-center justify-center my-12'>
                            <h1 className='text-3xl font-bold text-gray-600'>No Books in Wishlist</h1>
                        </div>
                    )
                }
            </div>

        </Container>

    )
}
