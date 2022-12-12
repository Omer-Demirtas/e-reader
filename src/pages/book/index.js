import Reader from "modules/reader/Reader";
import { useParams } from "react-router-dom";
import { useBookStore } from "store/BookStore";

const Book = () => {
  const { bookId } = useParams();
  const getBook = useBookStore(s => s.getBook);
  const book = getBook(bookId);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "pink",
      }}
    >
      <Reader url={book.bookUrl} />
    </div>
  );
};

export default Book;
