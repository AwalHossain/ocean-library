import { Star } from "lucide-react";
import ReactQuill from "react-quill";

interface ReviewContentProps {
  review: {
    userId?: {
      email: string;
      name: string;
    };
    rating: number;
    description: string;
  };
}

const ReviewContent = ({ review }: ReviewContentProps) => {
  return (
    <>
      <section className="flex justify-between items-center mt-3">
        <div className="flex my-4">
          {Array.from({ length: Number(review.rating) }).map((_, index) => (
            <Star key={index} size={20} fill="#e87400" stroke="#e87400" />
          ))}

          <Star size={20} />
        </div>
        <div className="text-xs">
          <span>February 13, 2020</span>
        </div>
      </section>
      <section>
        <div className="Formatted text-[14px]">
          {review?.description ? (
            <ReactQuill
              value={review?.description}
              readOnly={true}
              theme="bubble"
              modules={{ toolbar: false }}
            />
          ) : (
            "review not yet "
          )}
        </div>
      </section>
    </>
  );
};

export default ReviewContent;
