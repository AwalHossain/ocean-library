import { Star } from "lucide-react";
import React, { useState } from "react";

interface StarRatingProps {
  initialRating?: number;
  onChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  initialRating = 0,
  onChange,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (ratingValue: number) => {
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (ratingValue: number) => {
    setRating(ratingValue);
    if (onChange) {
      onChange(ratingValue);
    }
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          size={28}
          fill={value <= (hoverRating || rating) ? "#e87400" : "none"}
          stroke={value <= (hoverRating || rating) ? "#e87400" : "#333"}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(value)}
          style={{ cursor: "pointer" }}
        />
      ))}
    </div>
  );
};

export default StarRating;
