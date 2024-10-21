import React from "react";
import "./Card.css";

const Card = ({ image, title, description, author, onDetailsClick }) => {
  return (
    <div className="card">
      {image && <img src={image} alt={title} className="card-image" />}
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <p className="card-author">by {author}</p>
      </div>
      <button onClick={onDetailsClick} className="details-button">
        Details
      </button>
    </div>
  );
};

export default Card;
