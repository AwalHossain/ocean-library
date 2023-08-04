import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BsArrowReturnRight } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddReviewMutation, useGetSingleBookQuery } from '../redux/feature/filter/filterApi';
import { useAppSelector } from '../redux/hooks';

interface ReviewsProps {
  bookId: string;
}

type IReview = {
  _id: string;
  email: string;
  review: string;

}



 const Reviews: React.FC<ReviewsProps>= ({bookId}) => {

  const [addReview,{isSuccess, isError}] = useAddReviewMutation()
  const { data: book } = useGetSingleBookQuery(bookId)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
    
      const { user } = useAppSelector((state) => state.userState);

    
      const onSubmit = (data: ReviewFormInputs) => {
        const payload = { email: user?.email, ...data, bookId };
        console.log(payload,'checkin');
        addReview(payload)
        // reset();
      };
    // console.log(reviews.review,'reviews');
    
      useEffect(() => {
        if (isSuccess)
          toast.success("Your reivew is posted Successfully!");
        if (isError) toast.error("Failed to post your review 😔");
      }, [isSuccess, isError]);
    
    //   const userReviewd = reviewsData?.reviews?.find(
    //     (review: IReview) => review.userEmail === user?.email
    //   );

  return (
    <div>
    <div>
      <h4 className="text-xl font-semibold">User Reviews:</h4>
      <div className="bg-gray-300 h-[0.5px]" />
      <div className="mt-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row md:gap-3 items-end">
            <textarea
              rows={4}
              placeholder="This book is ....."
              className="resize-none border rounded-lg p-2 w-full md:w-[400px] focus:outline-none focus:ring focus:border-blue-500"
              {...register('review', { required: 'Review is required' })}
            ></textarea>
           <button
            type='submit'
           className="py-3 px-6 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 rounded-md shadow-md text-white font-semibold">
 Submit
</button>

          </div>
          {/* {userReviewd && (
            <p className="text-red-500 text-xs mt-1">User can't add more than one review</p>
          )} */}
          {!user?.email && (
            <div className="flex gap-2 items-center mt-2">
              <p className="text-red-500 text-xs">Please sign in to post a review</p>
              <Link to="/sign-in" className="text-xs text-blue-500 hover:underline">
                Sign In
              </Link>
            </div>
          )}
        </form>
        <div className='flex justify-center'>

        {
  book?.reviews && book.reviews.length > 0 && (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Reviews:</h2>
      <div className="space-y-4">
        {book.reviews.map((review) => (
          <div key={review?._id} className="bg-white rounded-lg shadow-md p-4">
            <h4 className="font-medium text-accent text-sm mb-2">{review?.email}</h4>
            <div className="flex items-center mt-1">
              <BsArrowReturnRight className="text-lg text-slate-400" />
              <p className="ml-2 text-slate-800">{review?.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  
  )
}

</div>
      </div>
    </div>
  </div>
  )
}

export default Reviews;