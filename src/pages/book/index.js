import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBookStore } from "store/BookStore";
import { getStorage, ref, getDownloadURL } from "firebase/storage"; //access the storage database
import Reader from "modules/reader/Reader";
import axios from "utils/Api";
import { useReaderStore } from "store/ReaderStore";

const Book = () => {
  const { bookId } = useParams();
  const getBook = useBookStore((s) => s.getBook);
  const url = useReaderStore((s) => s.url);
  const bookByte = useReaderStore((s) => s.bookByte);

  const book = getBook(bookId);

  useEffect(() => {
    if (!book) return;

    const getEpub = async () => {
      console.log("Getting books");

      /*
      storage.ref("FjZZXB6XEAAGlFI.jpg")
      .getDownloadURL()
        .then((url) => {
          console.log({ url });
          //setUrl(url);
        })
        */
      /*
      const storage = getStorage();
      getDownloadURL(ref(storage, 'Charles Darwin - Türlerin Kökeni__Р0бУ7Р.epub'))
      .then( async (url) => {
        console.log({ downloadUrl : url})

        const a = await axios.get(url);

        console.log({ a });
      });
      */
    };

    getEpub();
  }, [book]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "pink",
      }}
    >
      <Reader url={url} bookByte={bookByte} />
    </div>
  );
};

export default Book;
