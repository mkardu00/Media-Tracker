import React from "react";
import BooksTabs from "./BooksTabs";
import "./Books.css";

const Books = () => {
  return (
    <div>
      <div className="search-section">
        <BooksTabs />
      </div>
    </div>
  );
};

export default Books;
