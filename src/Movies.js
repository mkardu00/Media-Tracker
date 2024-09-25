import Card from "./Card";

const Movies = () => {
  return (
    <div>
      <h1>My Favorite Movies</h1>
      <div className="card-container">
        <Card
          title="Inception"
          description="A film about a group of people who enter others' dreams to steal or plant ideas."
          author="Christopher Nolan"
        />
        <Card
          title="The Matrix"
          description="A hacker discovers the reality he lives in is a simulated world controlled by machines."
          author="The Wachowskis"
        />
        <Card
          title="The Godfather"
          description="The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son."
          author="Francis Ford Coppola"
        />
        <Card
          title="Interstellar"
          description="A group of explorers travel through a wormhole in space in an attempt to save humanity."
          author="Christopher Nolan"
        />
      </div>
    </div>
  );
};

export default Movies;
