import Book from "./components/Book";

const BOOK_NAMES = [
  {
    id: 1,
    name: "Carl Sagan Kozmos",
    url: "Carl Sagan - Kozmos__зЭ9х29.epub",
  },
  {
    id: 2,
    name: "Eski Bahce Tezer Ozlu",
    url: "Eski Bahce - Tezer Ozlu.epub",
  },
];

const Library = () => {
  return (
    <div>
      <h1>Your Books</h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        {BOOK_NAMES.map((b) => (
          <Book key={b.id} book={b} />
        ))}
      </div>

    </div>
  );
};

export default Library;
