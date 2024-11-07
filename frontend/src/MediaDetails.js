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
        const rawgApiKey = process.env.REACT_APP_RAWG_API_KEY;
        let url;

        if (mediaType === "book") {
          url = `https://www.googleapis.com/books/v1/volumes/${mediaId}?key=${googleApiKey}`;
        } else if (mediaType === "movie") {
          url = `http://www.omdbapi.com/?apikey=${omdbApiKey}&i=${mediaId}`;
        } else if (mediaType === "game") {
          url = `https://api.rawg.io/api/games/${mediaId}?key=${rawgApiKey}`;
        }

        const response = await axios.get(url);
        if (mediaType === "book") {
          setMediaDetails(response.data.volumeInfo);
        } else if (mediaType === "movie") {
          setMediaDetails(response.data);
        } else if (mediaType === "game") {
          setMediaDetails(response.data);
        }
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

  return (
    <div className="media-details-modal">
      <div className="media-details-content">
        <button onClick={onClose} className="close-button">
          X
        </button>
        <h2>{mediaDetails.title || mediaDetails.name || mediaDetails.Title}</h2>

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

        {mediaType === "game" && mediaDetails.developers && (
          <p className="media-details-p">
            <strong>Developers:</strong>{" "}
            {mediaDetails.developers.map((dev) => dev.name).join(", ")}
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

        {mediaType === "movie" && mediaDetails.Plot && (
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

        {mediaType === "game" && mediaDetails.background_image && (
          <img src={mediaDetails.background_image} alt={mediaDetails.name} />
        )}

        {mediaType === "game" && mediaDetails.released && (
          <p className="media-details-p">
            <strong>Release Date:</strong> {mediaDetails.released}
          </p>
        )}

        {mediaType === "game" && mediaDetails.rating && (
          <p className="media-details-p">
            <strong>Rating:</strong> {mediaDetails.rating} / 5
          </p>
        )}
      </div>
    </div>
  );
};

export default MediaDetails;
