import { useState } from 'react'
import { useGetAllbooksQuery } from '../redux/feature/filter/filterApi'
import { IBook } from '../types'
import BookDetails from './BookDetails'

export const BookCard = () => {
  const [data, setData] = useState([])

  const { data: books, isError, isLoading, isSuccess, } = useGetAllbooksQuery(undefined);
  console.log(books, 'books fetching');

  return (
    <div className='container'>

      <div className='grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 px-5'>
        {
          isLoading ? <h1>Loading...</h1> :
            books?.data.map((book: IBook) => <BookDetails book={book} key={book.id} />)
        }

      </div>
    </div>
  )
}
