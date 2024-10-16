import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MediaDetails.css";

const MediaDetails = ({ mediaId, mediaType, onClose }) => {
  const [mediaDetails, setMediaDetails] = useState(null);

  useEffect(() => {
    const fetchMediaDetails = async () => {
      try {
        const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
        const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY;
        let url;

        if (mediaType === "book") {
          url = `https://www.googleapis.com/books/v1/volumes/${mediaId}?key=${googleApiKey}`;
        } else if (mediaType === "movie") {
          url = `http://www.omdbapi.com/?apikey=${omdbApiKey}&i=${mediaId}`;
        }

        const response = await axios.get(url);
        setMediaDetails(
          mediaType === "book" ? response.data.volumeInfo : response.data
        );
      } catch (error) {
        console.error("Error fetching media details:", error);
      }
    };

    if (mediaId) {
      fetchMediaDetails();
    }
  }, [mediaId, mediaType]);

  if (!mediaDetails) {
    return <div>Loading...</div>;
  }
  console.log("DATA ", mediaDetails);
  return (
    <div className="media-details-modal">
      <div className="media-details-content">
        <button onClick={onClose} className="close-button">
          X
        </button>
        <h2>{mediaDetails.title || mediaDetails.Title}</h2>
        {mediaType === "book" && mediaDetails.authors && (
          <p className="media-details-p">
            <strong>Author:</strong> {mediaDetails.authors.join(", ")}
          </p>
        )}
        {mediaType === "movie" && mediaDetails.Director && (
          <p className="media-details-p">
            <strong>Director:</strong> {mediaDetails.Director}
          </p>
        )}
        {mediaDetails.averageRating && (
          <p className="media-details-p">
            <strong>Rating:</strong> {mediaDetails.averageRating} / 5
          </p>
        )}
        {mediaType === "movie" && mediaDetails.imdbRating && (
          <p className="media-details-p">
            <strong>IMDB Rating:</strong> {mediaDetails.imdbRating} / 10
          </p>
        )}
        {mediaDetails.description && (
          <p className="media-details-p">
            <strong>Description:</strong> {mediaDetails.description}
          </p>
        )}
        {mediaDetails.Plot && (
          <p className="media-details-p">
            <strong>Plot:</strong> {mediaDetails.Plot}
          </p>
        )}
        {mediaType === "book" &&
          mediaDetails.imageLinks &&
          mediaDetails.imageLinks.thumbnail && (
            <img
              src={mediaDetails.imageLinks.thumbnail}
              alt={mediaDetails.title}
            />
          )}
        {mediaType === "movie" &&
          mediaDetails.Poster &&
          mediaDetails.Poster !== "N/A" && (
            <img src={mediaDetails.Poster} alt={mediaDetails.Title} />
          )}
      </div>
    </div>
  );
};

export default MediaDetails;
