import EpubReader from "modules/EpubReader";
import Reader from "modules/reader/Reader";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useBookStore } from "store/BookStore";
import { useReaderStore } from "store/ReaderStore";

const Book = () => {
  const { bookId } = useParams();
  const getBook = useBookStore((s) => s.getBook);
  const url = useReaderStore((s) => s.url);
  const bookByte = useReaderStore((s) => s.bookByte);

  const ref = useRef();

  useEffect(() => {
    var book_ = null;
    var rendition_ = null
    /*
    book_ = new Epub();
    book_.open(bookByte);

    const view = ref.current;

    rendition_ = book_.renderTo(view, {
      width: "100%",
      height: 600
    });

    rendition_.display();
    */
  }, [bookByte]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <EpubReader bookByte={bookByte} />
    </div>
  );
};

export default Book;
