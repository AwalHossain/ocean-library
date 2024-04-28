import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import WriteModal from "./WriteModal";

const WriteReview = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-3">
      <section className="w-[5.6rem] h-[5.6rem]">
        <img
          className="rounded-full"
          src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/users/1442940975i/83582._UX200_CR0,42,200,200_.jpg"
          alt=""
        />
      </section>
      <h4
        className="text-2xl font-semibold"
        style={{
          fontFamily: 'Copernicus, "Libre Baskerville", Georgia, serif',
        }}
      >
        What do
        <span className="italic mx-2">you</span>
        think?
      </h4>

      <Dialog>
        <DialogTrigger asChild>
          <button
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: "500",
            }}
            className="w-[200px] p-3 rounded-full border font-medium bg-[#1e1915] text-white mx-auto"
          >
            Write a review
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <WriteModal />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WriteReview;
