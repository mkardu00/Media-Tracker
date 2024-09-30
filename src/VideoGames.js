import Card from "./Card";

import React, { useState, useEffect } from "react";
import witcherImg from "./assets/witcher.png";
import zeldaImg from "./assets/zelda.png";
import rdr2 from "./assets/rdr2.png";
import darkSoulsImg from "./assets/darkSouls.png";
import VideoGamesTabs from "./VideoGamesTabs";

const videoGamesData = [
  {
    image: witcherImg,
    title: "The Witcher 3: Wild Hunt",
    description:
      "An episodic RPG video game where you play as Geralt of Rivia, a monster hunter in a fantasy world.",
    author: "CD Projekt Red",
  },
  {
    image: zeldaImg,
    title: "The Legend of Zelda: Breath of the Wild",
    description:
      "An open-world adventure game where you explore the vast kingdom of Hyrule to defeat evil.",
    author: "Nintendo",
  },
  {
    image: rdr2,
    title: "Red Dead Redemption 2",
    description:
      "An action-adventure game set in the American frontier, following the life of an outlaw.",

    author: "Rockstar Games",
  },
  {
    image: darkSoulsImg,
    title: "Dark Souls",
    description:
      "A challenging action RPG set in a dark fantasy world filled with deadly enemies and secrets.",
    author: "FromSoftware",
  },
];

const VideoGames = () => {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGameIndex((prevIndex) =>
        prevIndex === videoGamesData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentGame = videoGamesData[currentGameIndex];
  return (
    <div>
      <div className="carousel-container">
        <div className="carousel">
          <Card
            image={currentGame.image}
            title={currentGame.title}
            description={currentGame.description}
            author={currentGame.author}
          />
        </div>
        <div className="carousel-controls">
          {videoGamesData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentGameIndex(index)}
              className={index === currentGameIndex ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <VideoGamesTabs />
    </div>
  );
};

export default VideoGames;
