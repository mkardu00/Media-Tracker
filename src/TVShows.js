import Card from "./Card";

const TVShows = () => {
  return (
    <div>
      <h1>My Favorite TV Shows</h1>
      <div className="card-container">
        <Card
          title="The Office"
          description="A mockumentary sitcom depicting the daily lives of office employees working at Dunder Mifflin."
          author="Greg Daniels"
        />
        <Card
          title="Game of Thrones"
          description="Noble families vie for control of the Iron Throne as ancient enemies return to Westeros."
          author="David Benioff & D.B. Weiss"
        />
        <Card
          title="Stranger Things"
          description="A group of kids uncover supernatural mysteries and secret experiments in a small town."
          author="The Duffer Brothers"
        />
        <Card
          title="Breaking Bad"
          description="The story of a chemistry teacher who becomes a meth producer to secure his family's future."
          author="Vince Gilligan"
        />
      </div>
    </div>
  );
};

export default TVShows;
