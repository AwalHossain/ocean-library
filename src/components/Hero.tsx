import bookImg from "@/assets/hero.svg";

const Hero = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center items-center flex-col-reverse md:flex-row">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="md:pl-2 mb-8">
            <h1 className="text-[36px] hidden md:block font-bold leading-snug tracking-tight secondary-color lg:leading-tight xl:leading-tight dark:text-white">
              Discover New Books for Every Taste
            </h1>
            <p className="py-5 text-[12px] sm:text-[18px] leading-normal secondary-color dark:text-gray-300">
              Explore our vast collection of books, from classic literature to
              the latest bestsellers. Whether you love fiction, non-fiction, or
              poetry, we have something for every book lover.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <a
                href="https://example.com/bookstore"
                target="_blank"
                rel="noopener"
                className="px-8 py-4 text-lg font-medium text-center text-white bg-main rounded-md "
              >
                Explore Now
              </a>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="w-auto lg:w-auto justify-center">
            <h1 className="text-[40px] md:hidden font-bold leading-snug tracking-tight secondary-color lg:leading-tight xl:leading-tight dark:text-white">
              Discover New{" "}
              <span
                style={{
                  fontFamily: "Copernicus, 'Libre Baskerville', Georgia, serif",
                }}
                className="italic font-bold text-main"
              >
                Books
              </span>
              <br />
              For Every
              <span
                style={{
                  fontFamily: "Copernicus, 'Libre Baskerville', Georgia, serif",
                }}
                className="italic font-bold pl-2"
              >
                Taste
              </span>
            </h1>
            <img
              src={bookImg}
              className="w-full h-full object-cover"
              alt="Book Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
