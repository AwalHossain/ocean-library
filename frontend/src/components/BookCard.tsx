import { IBook } from '../types';
import BookDetails from './BookDetails';

interface BookCardProps {
  books: IBook[];
  isFetching: boolean;
  isSuccess: boolean;
}

export const BookCard = (
  {
    books,
    isFetching,
    isSuccess
  }: BookCardProps
) => {

  return (
    <div className='container'>

      <div className='grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 px-5'>
        {
          isFetching ? <h1>Loading...</h1> :
           isSuccess && books?.map((book: IBook) => <BookDetails book={book} key={book._id} />)
        }

      </div>
    </div>
  )
}
