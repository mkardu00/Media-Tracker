import Card from "./Card";
import React, { useState, useEffect } from "react";
import strangerThingsImg from "./assets/strangerThings.png";
import officeImg from "./assets/office.png";
import breakingBadImg from "./assets/breakingBad.png";
import gotImg from "./assets/got.png";
import TVShowsTab from "./TVShowsTab";

const showsData = [
  {
    image: officeImg,
    title: "The Office",
    description:
      "A mockumentary sitcom depicting the daily lives of office employees working at Dunder Mifflin.",
    author: "Greg Daniels",
  },
  {
    image: gotImg,
    title: "Game of Thrones",
    description:
      "Noble families vie for control of the Iron Throne as ancient enemies return to Westeros.",
    author: "David Benioff & D.B. Weiss",
  },
  {
    image: strangerThingsImg,
    title: "Stranger Things",
    description:
      "A group of kids uncover supernatural mysteries and secret experiments in a small town.",
    author: "The Duffer Brothers",
  },
  {
    image: breakingBadImg,
    title: "Breaking Bad",
    description:
      "The story of a chemistry teacher who becomes a meth producer to secure his family's future.",
    author: "Vince Gilligan",
  },
];
const TVShows = () => {
  const [currentShowIndex, setCurrentShowIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShowIndex((prevIndex) =>
        prevIndex === showsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentShow = showsData[currentShowIndex];
  return (
    <div>
      <div className="carousel-container">
        <div className="carousel">
          <Card
            image={currentShow.image}
            title={currentShow.title}
            description={currentShow.description}
            author={currentShow.author}
          />
        </div>
        <div className="carousel-controls">
          {showsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentShowIndex(index)}
              className={index === currentShowIndex ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <TVShowsTab />
    </div>
  );
};
export default TVShows;
