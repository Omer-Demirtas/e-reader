import { useNavigate } from "react-router-dom";
import { useBookStore } from "store/BookStore";
import Book from "./components/Book";

const Library = () => {
  const navigate = useNavigate();
  const books = useBookStore(s => s.books);

  const navigateTo = (path) => navigate(`/book/${path}`); 

  return (
    <div>
      <h1>Your Books</h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        {books.map((b) => (
          <Book onClick={navigateTo} key={b.id} book={b} />
        ))}
      </div>

    </div>
  );
};

export default Library;
