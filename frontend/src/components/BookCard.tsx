import { useEffect, useState } from 'react'
import { IBook } from '../types'
import BookDetails from './BookDetails'

export const BookCard = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('./db.json')
        .then(res => res.json())
        .then(data =>setData(data.books))
    }, [])
  return (
    <div className='container'>

    <div className='grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 px-5'>


{
        data?.map((book:IBook) => <BookDetails book={book} key={book.id} />)
}

    </div>
    </div>
  )
}
