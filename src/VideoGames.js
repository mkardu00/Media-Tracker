import Card from "./Card";

const VideoGames = () => {
  return (
    <div>
      <h1>My Favorite Video Games</h1>
      <div className="card-container">
        <Card
          title="The Witcher 3: Wild Hunt"
          description="An episodic RPG video game where you play as Geralt of Rivia, a monster hunter in a fantasy world."
          author="CD Projekt Red"
        />
        <Card
          title="The Legend of Zelda: Breath of the Wild"
          description="An open-world adventure game where you explore the vast kingdom of Hyrule to defeat evil."
          author="Nintendo"
        />
        <Card
          title="Red Dead Redemption 2"
          description="An action-adventure game set in the American frontier, following the life of an outlaw."
          author="Rockstar Games"
        />
        <Card
          title="Dark Souls"
          description="A challenging action RPG set in a dark fantasy world filled with deadly enemies and secrets."
          author="FromSoftware"
        />
      </div>
    </div>
  );
};

export default VideoGames;
