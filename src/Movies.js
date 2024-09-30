import Card from "./Card";

import React, { useState, useEffect } from "react";
import inceptionImg from "./assets/inception.png";
import matrixImg from "./assets/matrix.png";
import godfatherImg from "./assets/godfather.png";
import interstellarImg from "./assets/interstellar.png";
import MoviesTabs from "./MoviesTabs";

const moviesData = [
  {
    image: inceptionImg,
    title: "Inception",
    description:
      "A film about a group of people who enter others' dreams to steal or plant ideas.",
    author: "Christopher Nolan",
  },
  {
    image: matrixImg,
    title: "The Matrix",
    description:
      "A hacker discovers the reality he lives in is a simulated world controlled by machines.",
    author: "The Wachowskis",
  },
  {
    image: godfatherImg,
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son.",
    author: "Francis Ford Coppola",
  },
  {
    image: interstellarImg,
    title: "Interstellar",
    description:
      "A group of explorers travel through a wormhole in space in an attempt to save humanity.",
    author: "Christopher Nolan",
  },
];
const Movies = () => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovieIndex((prevIndex) =>
        prevIndex === moviesData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentMovie = moviesData[currentMovieIndex];
  return (
    <div>
      <div className="carousel-container">
        <div className="carousel">
          <Card
            image={currentMovie.image}
            title={currentMovie.title}
            description={currentMovie.description}
            author={currentMovie.author}
          />
        </div>
        <div className="carousel-controls">
          {moviesData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentMovieIndex(index)}
              className={index === currentMovieIndex ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <MoviesTabs />
    </div>
  );
};

export default Movies;
