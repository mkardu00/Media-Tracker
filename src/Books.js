import Card from "./Card";
import BooksTabs from "./BooksTabs";
import harryPotterImg from "./assets/harry-potter.png";
import "./Tabs.css";
const Books = () => {
  return (
    <div>
      <h1>My Favorite Books</h1>
      <div className="card-container">
        <Card
          image={harryPotterImg}
          title="Harry Potter and the Philosopher's Stone"
          description="The first book in the series about a young wizard, Harry Potter, who discovers his magical past and future."
          author="J.K. Rowling"
        />
        <Card
          title="The Lord of the Rings"
          description="An epic fantasy novel following the quest to destroy a powerful ring and defeat dark forces."
          author="J.R.R. Tolkien"
        />
        <Card
          title="1984"
          description="A dystopian novel about a totalitarian regime that uses surveillance to control citizens."
          author="George Orwell"
        />
        <Card
          title="To Kill a Mockingbird"
          description="A novel set in the American South about racial injustice and moral growth."
          author="Harper Lee"
        />
      </div>
      <BooksTabs></BooksTabs>
    </div>
  );
};

export default Books;
