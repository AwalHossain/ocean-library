import BookDetails from "../components/BookDetails";
import Hero from "../components/Hero";
import { useGetAllbooksQuery } from "../redux/feature/filter/filterApi";
import { IBook } from "../types";

function Home() {
  const { data, isFetching, isSuccess } = useGetAllbooksQuery(undefined)

  const books:IBook[] = data?.data ?? [] ;
  return (
    <div>
      <Hero />
      <div className='container'>

        <div className='grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 px-5'>
          {
            isFetching ? <h1>Loading...</h1> :
              isSuccess && books?.map((book: IBook, index) => <BookDetails book={book} key={index} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Home