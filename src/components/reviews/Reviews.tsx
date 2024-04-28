import ReviewContent from "./ReviewContent";
import ReviewUser from "./ReviewUser";
import WriteReview from "./WriteReview";

const Reviews = () => {
  return (
    <div>
      <div className="my-10">
        <h2
          className="text-2xl font-semibold"
          style={{
            fontFamily: 'Copernicus, "Libre Baskerville", Georgia, serif',
          }}
        >
          Ratings
          <span className="italic mx-2">&</span>
          Reviews
        </h2>
      </div>
      <div className="my-16">
        <WriteReview />
      </div>
      <div>
        <div
          className="md:grid md:grid-cols-8 gap-2 xl:px-2"
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: "500",
          }}
        >
          {/* profile */}
          {Array.from({ length: 3 }).map((_, index) => (
            <>
              <div className="md:col-span-2">
                {/* Avatar */}
                <div className="flex md:flex-col md:justify-center items-center md:space-y-2">
                  <ReviewUser />
                </div>
              </div>
              {/* content */}
              <section className="md:col-span-6 xl:pr-6">
                <ReviewContent />
                <div className="bg-gray-300 h-[0.5px] my-5" />
              </section>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
