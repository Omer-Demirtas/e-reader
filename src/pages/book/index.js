import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBookStore } from "store/BookStore";
import Reader from "modules/reader/Reader";
import { useReaderStore } from "store/ReaderStore";

const Book = () => {
  const { bookId } = useParams();
  const getBook = useBookStore((s) => s.getBook);
  const url = useReaderStore((s) => s.url);
  const bookByte = useReaderStore((s) => s.bookByte);

  const book = getBook(bookId);

  useEffect(() => {
    if (!book) return;

    const getEpub = async () => {};

    getEpub();
  }, [book]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Reader url={url} bookByte={bookByte} />
    </div>
  );
};

export default Book;
