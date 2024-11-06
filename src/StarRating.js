import React, { useState } from "react";

const StarRating = ({ mediaId, initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (newRating) => {
    setRating(newRating);
    onRatingChange(mediaId, newRating);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleStarClick(star)}
          style={{
            color: star <= rating ? "gold" : "gray",
            cursor: "pointer",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
