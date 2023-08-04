// BookDetails.tsx

import { useParams } from 'react-router-dom';
import Reviews from '../components/Reviews';
import Container from '../components/container';
import { useGetSingleBookQuery } from '../redux/feature/filter/filterApi';


const SingleBook = () => {
  const { id } = useParams()
  const { data: book, isLoading, isSuccess } = useGetSingleBookQuery(id)
  // const book = data?.data;

  console.log(book, 'data');
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
          </div>
        </Container>
        <div className='flex justify-center py-5'>

          <Reviews bookId={book._id} />
          {/* <Review /> */}
        </div>
      </>

    ) : (
      <div>Loading...</div>
    )

  )
};

export default SingleBook;
