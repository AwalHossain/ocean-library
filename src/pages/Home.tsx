import BookCardCarousel from "@/components/booksCard/BookCardCarousel";
import LargeBookCards from "@/components/booksCard/LargeBookCards";
import Hero from "../components/Hero";
import { useGetAllbooksQuery } from "../redux/feature/filter/filterApi";
import { IBook } from "../types";

function Home() {
  const { data, isFetching, isSuccess } = useGetAllbooksQuery(undefined);

  const books: IBook[] = data?.data ?? [];
  return (
    <div>
      <Hero />
      <div
        className="px-2"
        style={{
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        {/* <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 px-5">
          {isFetching ? (
            <h1>Loading...</h1>
          ) : (
            isSuccess &&
            books?.map((book: IBook) => (
              <BookDetails book={book} key={book._id} />
            ))
          )}
        </div> */}
        <div className="my-20 md:my-40">
          <h4 className="text-2xl font-semibold primary-color">Trending Now</h4>
          <LargeBookCards />
        </div>
        <div
          className="my-20 md:my-40"
          style={{
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          <h4 className="text-2xl font-semibold primary-color ">Recommended</h4>
          <BookCardCarousel />
        </div>
      </div>
    </div>
  );
}

export default Home;
