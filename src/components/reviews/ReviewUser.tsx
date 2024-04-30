interface ReviewUserProps {
  user:
    | {
        name: string;
        email: string;
      }
    | undefined;
}
function ReviewUser({ ReviewUser }: ReviewUserProps) {
  return (
    <>
      {" "}
      <section className="w-[3.6rem] h-[3.6rem]">
        <div></div>
        <img
          className="rounded-full"
          src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/users/1442940975i/83582._UX200_CR0,42,200,200_.jpg"
          alt=""
        />
      </section>
      <p className="font-semibold text-[1.1rem] ml-2">{`Lucinda Berry`}</p>
    </>
  );
}

export default ReviewUser;
