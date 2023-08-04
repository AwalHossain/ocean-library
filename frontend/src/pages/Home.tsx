import BookDetails from "../components/BookDetails";
import Hero from "../components/Hero";
import { useGetAllbooksQuery } from "../redux/feature/filter/filterApi";

function Home() {
  const { data, isFetching, isSuccess } = useGetAllbooksQuery(undefined)
  console.log(data, "checkin");
  const books = data?.data;
  return (
    <div>
      <Hero />
      <div className='container'>

        <div className='grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 px-5'>
          {
            isFetching ? <h1>Loading...</h1> :
              isSuccess && books?.map((book: IBook) => <BookDetails book={book} key={book._id} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Home