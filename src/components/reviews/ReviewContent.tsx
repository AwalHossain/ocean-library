import { Star } from "lucide-react";

const ReviewContent = () => {
  return (
    <>
      <section className="flex justify-between items-center mt-3">
        <div className="flex my-4">
          <Star size={20} fill="#e87400" stroke="#e87400" />
          <Star size={20} fill="#e87400" stroke="#e87400" />
          <Star size={20} fill="#e87400" stroke="#e87400" />
          <Star size={20} />
        </div>
        <div className="text-xs">
          <span>February 13, 2020</span>
        </div>
      </section>
      <section>
        <span className="Formatted text-[14px]">
          Hell House stands alone, ominous and waiting. After thirty years, four
          more dare to enter what has been labeled the Mount Everest of haunted
          houses. Make it five, cause I'm going with them.
          <br />
          <br />
          My little quip is not meant to take anything away from this book. I'll
          walk into any haunted house, as long as there's a person ahead of me
          and a guy out front taking tickets.
          <br />
          <br />
          Was this a scary book tough? Yes and no. I can't say it was Matheson's
          purpose either. The writing is often more heady than you'd expect in a
          horror novel that has a similar classic feel to The Haunting of Hill
          House (possibly an influence for Matheson), while also being a bridge
          to more modern day horror. No doubt many haunted house books have been
          written since, but here the predictable, meaningless scares, and
          hollow apparitions are avoided. There are apparitions, but their
          significance is kept hidden from the reader until necessary for a last
          reveal. The finale is what I liked most. When Hell House gets going
          it's nearly a nonstop race to the ending.
        </span>
      </section>
    </>
  );
};

export default ReviewContent;
