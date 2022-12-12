import axios from "utils/Api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Book from "./components/Book";

const Library = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const mapBooks = (books) => books.map(b => {
      const final = {};
      Object.keys(b.fields).forEach(f => final[f] = Object.values(b.fields[f])[0]);
      return final;
  });
    const getBooks = async () => 
    {
      const books = await axios.get("book");
      setBooks(mapBooks(books.data.documents));
    }

    getBooks();
  }, []);

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
