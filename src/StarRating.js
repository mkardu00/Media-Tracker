import React from "react";

const StarRating = ({ rating, onRatingChange }) => {
  const handleStarClick = (newRating) => {
    onRatingChange(newRating);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index + 1)}
          style={{
            cursor: "pointer",
            color: index < rating ? "#f39c12" : "#ccc",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
