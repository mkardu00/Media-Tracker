import React from "react";
import "./Card.css";

const Card = ({
  image,
  title,
  description,
  author,
  onDetailsClick,
  onAddClick,
}) => {
  return (
    <div className="card">
      {image && <img src={image} alt={title} className="card-image" />}
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        {description && <p className="card-description">{description}</p>}
        {author && <p className="card-author">by {author}</p>}
        <div className="card-buttons">
          <button onClick={onDetailsClick} className="details-button">
            Details
          </button>
          {onAddClick && (
            <button onClick={onAddClick} className="add-button">
              ➕ Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
