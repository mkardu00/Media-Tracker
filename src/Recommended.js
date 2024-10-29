import React, { useState } from "react";
import Card from "./Card";
import "./Recommended.css";
import MediaDetails from "./MediaDetails";

const Recommended = ({ recommendedMedia, mediaType }) => {
  const [selectedMediaId, setSelectedMediaId] = useState(null);

  const handleMediaClick = (mediaId) => {
    setSelectedMediaId(mediaId);
  };

  const handleCloseDetails = () => {
    setSelectedMediaId(null);
  };

  return (
    <div>
      <h2>
        Recommended{" "}
        {mediaType === "book"
          ? "Books"
          : mediaType === "game"
          ? "Games"
          : "Movies"}
      </h2>
      <div className="card-container">
        {recommendedMedia.map((media, index) => {
          const { volumeInfo, id } = media;
          console.log("Media ", media);

          if (mediaType === "book" && volumeInfo.imageLinks) {
            return (
              <Card
                key={index}
                image={volumeInfo.imageLinks.smallThumbnail}
                title={volumeInfo.title}
                author={volumeInfo.authors.join(", ")}
                onDetailsClick={() => handleMediaClick(id)}
              />
            );
          }

          if (mediaType === "game") {
            return (
              <Card
                key={index}
                image={media.background_image && media.background_image}
                title={media.title}
                author={
                  media.developers &&
                  media.developers.map((dev) => dev.name).join(", ")
                }
                onDetailsClick={() => handleMediaClick(id)}
              />
            );
          }

          if (mediaType === "movie") {
            return (
              <Card
                key={index}
                image={media.Poster && media.Poster !== "N/A" && media.Poster}
                title={media.Title}
                author={media.Director}
                onDetailsClick={() => handleMediaClick(media.imdbID)}
              />
            );
          }

          return null;
        })}
      </div>
      {selectedMediaId && (
        <MediaDetails
          mediaId={selectedMediaId}
          mediaType={mediaType}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default Recommended;
