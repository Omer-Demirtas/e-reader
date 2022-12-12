import Reader from "modules/reader/Reader";
import { useParams } from "react-router-dom";

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

const Book = () => {
  const { bookId } = useParams();

  console.log({ bookId, b: BOOK_NAMES.find((b) => b.id === Number(bookId)) });

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "pink",
      }}
    >
      <Reader url={`../${BOOK_NAMES.find((b) => b.id === Number(bookId)).url || ""}`} />
    </div>
  );
};

export default Book;
