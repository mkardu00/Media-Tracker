import React from "react";
import "./Card.css"; // Za stilizaciju (objasnit ću u nastavku)

const Card = ({ title, description, author, image }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
      <p className="card-author">
        <strong>Autor:</strong> {author}
      </p>
    </div>
  );
};

export default Card;
