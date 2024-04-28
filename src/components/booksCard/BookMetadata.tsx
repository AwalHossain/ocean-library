import { Star } from "lucide-react";

interface BookMetadataProps {
  meta: {
    title: string | undefined;
    author: string | undefined;
  };
}

const BookMetadata = ({ meta }: BookMetadataProps) => {
  return (
    <div className="mt-5 md:mt-0">
      <h1 className="text-[1.5rem] md:text-[2.5rem] text-[#1e1915] font-semibold uppercase text-center md:text-left">
        {meta?.title}
      </h1>
      <h4
        className="text-[1rem] md:text-[1.3rem] text-[#1e1915] text-center md:text-left"
        style={{
          letterSpacing: "0.1em",
          lineHeight: "2.5rem",
        }}
      >
        {meta.author}
      </h4>
      <div className="flex my-4 justify-center items-center md:justify-start space-x-3">
        <Star size={32} fill="#e87400" stroke="#e87400" />
        <Star size={32} fill="#e87400" stroke="#e87400" />
        <Star size={32} fill="#e87400" stroke="#e87400" />
        <Star size={32} fill="#e87400" stroke="#e87400" />
      </div>
    </div>
  );
};

export default BookMetadata;
