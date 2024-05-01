import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetAllbooksQuery } from "@/redux/feature/book/bookApi";
import { IBook } from "@/types";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function LargeBookCards() {
  const { data } = useGetAllbooksQuery(undefined);

  const books: IBook[] = data?.data ?? [];

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full my-5"
    >
      <CarouselContent>
        {/* {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6"></CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))} */}

        {books.map((book, index) => (
          <CarouselItem
            key={index}
            className="basis-1/1   md:basis-1/1 lg:basis-1/2  xl:basis-1/2 w-full mx-auto"
            style={{
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            <div className="flex flex-col md:flex-row bg-[#e8e0c6] w-full md:space-x-8 rounded">
              <div className="w-full md:w-[30%] lg:w-[40%] ">
                <div className=" max-w-[250px] lg:w-[320px] mx-auto h-[350px] p-4 md:p-0 transform hover:scale-105 transition-transform duration-200 ease-in-out">
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className=" rounded-md w-full h-full "
                  />
                </div>
              </div>
              <div className="w-full md:w-[60%] p-2">
                <div className="my-4">
                  <h2 className="text-[1.4rem] font-semibold primary-color">
                    {book.title}
                  </h2>
                  <p className="text-[1rem] font-medium secondary-color">
                    {book.author}
                  </p>
                  <div className="flex  space-x-1">
                    {Array.from({ length: book.rating }, (_, index) => (
                      <svg
                        key={index}
                        className="h-4 w-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="Formatted text-[14px] secondary-color">
                    Not since Lionel Shriver brought us We Need to Talk About
                    Kevin has a writer delved into the complexities of a
                    disturbed mother/son relationship. Until now. Meet Noah—an
                    A-honor roll student, award-winning swimmer, and small-town
                    star destined for greatness. There weren’t
                  </span>
                </div>
                <div className="mt-2">
                  <Link to={`/book-details/${book._id}`}>
                    <Button className="bg-minor hover:bg-main">
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
