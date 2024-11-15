import React, { useState } from "react";
import Card from "./Card";
import "./Recommended.css";
import MediaDetails from "./MediaDetails";

const Recommended = ({ recommendedMedia, mediaType, handleAddMedia }) => {
  const [selectedMediaId, setSelectedMediaId] = useState(null);

  const handleMediaClick = (mediaId) => {
    setSelectedMediaId(mediaId);
  };

  const handleCloseDetails = () => {
    setSelectedMediaId(null);
  };

  return (
    <div className="recommended-container">
      <h2 className="recommended-title">
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

          if (mediaType === "book" && volumeInfo && volumeInfo.imageLinks) {
            return (
              <Card
                key={index}
                image={volumeInfo.imageLinks.smallThumbnail}
                title={volumeInfo.title}
                author={volumeInfo.authors?.join(", ")}
                onDetailsClick={() => handleMediaClick(id)}
                onAddClick={() => handleAddMedia(media)}
              />
            );
          }

          if (mediaType === "game") {
            return (
              <Card
                key={index}
                image={media.background_image}
                title={media.name}
                author={media.developer}
                onDetailsClick={() => handleMediaClick(id)}
                onAddClick={() => handleAddMedia(media)}
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
                onAddClick={() => handleAddMedia(media)}
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
