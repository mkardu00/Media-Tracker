import React, { useState, useEffect } from "react";
import Card from "./Card";
import BooksTabs from "./BooksTabs";
import harryPotterImg from "./assets/harry-potter.png";
import tlotrImg from "./assets/tlotr.png";
import img1984 from "./assets/1984.png";
import mockingbirfImg from "./assets/mockingbird.png";

import "./Books.css";

const booksData = [
  {
    image: harryPotterImg,
    title: "Harry Potter and the Philosopher's Stone",
    description:
      "The first book in the series about a young wizard, Harry Potter, who discovers his magical past and future.",
    author: "J.K. Rowling",
  },
  {
    image: tlotrImg,
    title: "The Lord of the Rings",
    description:
      "An epic fantasy novel following the quest to destroy a powerful ring and defeat dark forces.",
    author: "J.R.R. Tolkien",
  },
  {
    image: img1984,
    title: "1984",
    description:
      "A dystopian novel about a totalitarian regime that uses surveillance to control citizens.",
    author: "George Orwell",
  },
  {
    image: mockingbirfImg,
    title: "To Kill a Mockingbird",
    description:
      "A novel set in the American South about racial injustice and moral growth.",
    author: "Harper Lee",
  },
];

const Books = () => {
  const [currentBookIndex, setCurrentBookIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBookIndex((prevIndex) =>
        prevIndex === booksData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentBook = booksData[currentBookIndex];

  return (
    <div>
      <div className="carousel-container">
        <div className="carousel">
          <Card
            image={currentBook.image}
            title={currentBook.title}
            description={currentBook.description}
            author={currentBook.author}
          />
        </div>
        <div className="carousel-controls">
          {booksData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBookIndex(index)}
              className={index === currentBookIndex ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <BooksTabs />
    </div>
  );
};

export default Books;
