import axios from "utils/Api";
import React, { useEffect} from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { Routes } from "Routes";
import { useBookStore } from "store/BookStore";

function App() {
  const setBooks = useBookStore(s => s.addAllBooks);
  const books = useBookStore(s => s.books);

  useEffect(() => {
    const mapBooks = (books) => books.map(b => {
      const final = {};
      Object.keys(b.fields).forEach(f => final[f] = Object.values(b.fields[f])[0]);
      return final;
  });
    const getBooks = async () => 
    {
    }

    getBooks();
  }, []);

  console.log({ books });
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

const Router = () => {
  return useRoutes(Routes);
};

export default App;
