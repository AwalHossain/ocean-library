// BookDetails.tsx

import { useEffect, useState } from 'react';
import { FaPencil, FaTrash } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';
import Reviews from '../components/Reviews';
import Container from '../components/container';
import { useGetSingleBookQuery } from '../redux/feature/filter/filterApi';
import { useAppSelector } from '../redux/hooks';


const SingleBook = () => {
  const { id } = useParams()
  const { data: book, isLoading, isSuccess, isFetching,refetch } = useGetSingleBookQuery(id)
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.userState)
  const athorizedUser = user?.email && book?.addedBy === user.email;
  
    
    // refetch()
    useEffect(() => {
      refetch()
    },[showModal])
 
  
  return (
    book && isSuccess ? (
      <>
        <Container className='flex justify-center'>
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <div className="">
              <img
                className="h-80 rounded-sm"
                src={book?.thumbnail}
                alt=""
              />
            </div>
            <div>
              <h4 className="text-xl text-secondary font-semibold">
                {book?.title}{" "}
                <span className="text-sm text-slate-500 font-medium">
                  by {book?.author}
                </span>
              </h4>
              <span className="badge badge-info">{book?.genre}</span>
              <p className="text-sm mt-2">
                <span className="font-semibold">Published On: </span>
                {book?.publicationYear}
              </p>
              {/* {verifiedUser && (
                <div className="flex items-center gap-x-2 mt-8">
                    <h4 className="font-semibold">Action Center :</h4>
                    <button
                    onClick={() => navigate(`/update-book/${book._id}`)}
                    className="btn btn-sm bg-cyan-700 tooltip"
                    data-tip="Update Book"
                    >
                    <FaPencil />
                    </button>
                    <button
                    onClick={() => setShowModal(!showModal)}
                    className="btn btn-sm bg-red-700 tooltip"
                    data-tip="Delete Book"
                    >
                    <FaDeleteLeft className="" />
                    </button>
                </div>
                )} */}
            </div>
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
        </Container>
        <div className='flex justify-center py-5'>

          <Reviews bookId={book._id} />
          {/* <Review /> */}
        </div>
        {showModal && <DeleteModal book={book} setShowModal={setShowModal} />}
      </>

    ) : (
      isFetching ? <div>Loading...</div>: <h2>No Book Found</h2>
    )

  )
};

export default SingleBook;
