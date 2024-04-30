// BookDetails.tsx

import BookCardCarousel from "@/components/booksCard/BookCardCarousel";
import BookMetadata from "@/components/booksCard/BookMetadata";
import ButtonWithSeparator from "@/components/booksCard/ButtonSeparator";
import UserReviews from "@/components/reviews/Reviews";
import { setUserPrefernce } from "@/redux/feature/book/bookSlice";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import { useGetSingleBookQuery } from "../redux/feature/filter/filterApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const SingleBook = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    data: book,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetSingleBookQuery(id);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userState);

  const userData = book?.userPreference;
  const result = userData?.find((item: any) => item.user === user?._id);
  dispatch(setUserPrefernce(result?.status ? result?.status : "want to read"));
  console.log(result, "result", book, "book");

  // refetch()

  const meta = {
    title: book?.title ?? "No Title",
    author: book?.author ?? "No Author",
  };

  return book && isSuccess ? (
    <>
      <div
        className="grid grid-cols-1 md:grid-cols-12 md:gap-4 justify-center relative"
        style={{
          fontFamily: 'Copernicus, "Libre Baskerville", Georgia, serif',
        }}
      >
        <div className="md:col-span-3 md:relative">
          <div className="md:sticky md:top-20 max-screen">
            <img
              className="h-64 md:h-80 rounded-sm mx-auto"
              src={book?.thumbnail}
              alt=""
            />
            <div className="block md:hidden">
              <BookMetadata meta={meta} />
            </div>
            <div className="py-5 xl:px-10">
              <ButtonWithSeparator
                status={result ? result.status : undefined}
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-9 md:overflow-y-auto md:pb-16">
          <div className="hidden md:block">
            <BookMetadata meta={meta} />
          </div>
          <div className="md:grid md:grid-cols-9 xl:gap-8 px-4 md:px-0">
            <div className="md:col-span-9 xl:col-span-7">
              <span className="Formatted text-[14px]">
                <b>We forgive murderers, not pedophiles.</b> <br />
                <br />
                Not since Lionel Shriver brought us{" "}
                <i>We Need to Talk About Kevin</i>
                has a writer delved into the complexities of a disturbed
                mother/son relationship. Until now.
                <br />
                <br />
                Meet Noah—an A-honor roll student, award-winning swimmer, and
                small-town star destined for greatness. There weren’t any signs
                that something was wrong until the day he confesses to molesting
                little girls during swim team practice. He’s sentenced to
                eighteen months in a juvenile sexual rehabilitation center.
                <br />
                <br />
                His mother, Adrianne, refuses to turn her back on him despite
                his horrific crimes, but her husband won’t allow Noah back into
                their home. In a series of shocking and shattering revelations,
                Adrianne is forced to make the hardest decision of her life.
                Just how far will she go to protect her son?
                <br />
                <br />
                <i>Saving Noah</i> challenges everything you think you know
                about teenage sexual offenders. It will keep you up at night
                long after you've read the last page, questioning beliefs you
                once thought were true.
              </span>
              <div className="my-5">
                <div className="flex flex-wrap space-x-3 ">
                  <span className="text-[#707070] font-normal">Genre</span>
                  <span
                    className="font-bold border-b-2 border-page text-md text-pa relative group hover:border-transparent"
                    style={{
                      transitionProperty: "border-color",
                      // transitionDuration: "0.5s",
                      // transitionTimingFunction: "ease-in-out",
                    }}
                  >
                    <span
                      className="absolute inset-0 border-b-2 border-transparent transition-all duration-500 origin-left scale-x-0 group-hover:scale-x-100 group-hover:border-page"
                      // style={{ transitionTimingFunction: "ease-in-out" }}
                    ></span>
                    Thriller
                  </span>
                  <span>AudioBook</span>
                  <span>Mystery</span>
                  <span>Horror</span>
                  <span>Fiction</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-3"></div>
          </div>
          {/* Writing Review & Show Review */}
          <div className="px-4 xl:px-0">
            <UserReviews />
          </div>
        </div>
      </div>
      <div className="container my-20">
        <h2 className="text-2xl font-semibold">Related Books</h2>
        <BookCardCarousel />
      </div>

      {showModal && <DeleteModal book={book} setShowModal={setShowModal} />}
    </>
  ) : isFetching ? (
    <div>Loading...</div>
  ) : (
    <h2>No Book Found</h2>
  );
};

export default SingleBook;
