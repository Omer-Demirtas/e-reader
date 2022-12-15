import Reader from "modules/reader/Reader";
import { useNavigate } from "react-router-dom";
import { useBookStore } from "store/BookStore";
import { useReaderStore } from "store/ReaderStore";
import Book from "./components/Book";

const Library = () => {
  const navigate = useNavigate();
  const books = useBookStore((s) => s.books);
  const setBookByte = useReaderStore((s) => s.setBookByte);
  const setUrl = useReaderStore((s) => s.setUrl);

  const navigateTo = (path) => navigate(`/book/${path}`);

  const openFileDialog = () => document.getElementById("file-input").click();

  const handleOpenFile = (e) => {
    var file = e.target.files[0];

    console.log({ file });

    if (window.FileReader) {
      var reader = new FileReader();
      reader.onload = (e) => {
        setBookByte(e.target.result);
        navigateTo(1);
      }
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input
        onChange={handleOpenFile}
        id="file-input"
        type="file"
        style={{ display: "none" }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <h1>Your Books</h1>
        <button onClick={openFileDialog} style={{ height: "50px" }}>
          Load your book
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        {books.map((b) => (
          <Book onClick={() =>  {}} key={b.id} book={b} />
        ))}
      </div>
    </div>
  );
};

export default Library;
