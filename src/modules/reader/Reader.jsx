import { Book } from "epubjs";
import React, { useEffect, useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";

const Reader = ({ url }) => {
  const viewRef = useRef();

  const [book, setBook] = useState();
  const [rendition, setRendition] = useState();

  const nextPage = useCallback(() => rendition.next(), [rendition]);
  const prevPage = useCallback(() => rendition.prev(), [rendition]);

  const handleKeyPress = useCallback(({ key }) => {
    key && key === "ArrowRight" && nextPage();
    key && key === "ArrowLeft" && prevPage();
  }, [rendition]);

  const onLocationChange = () => {}

  /* Init Component */
  useEffect(() => {
    const view = viewRef.current;

    let book = null;
    let rendition = null;
    let displayed = null;

    const renderBook = async () => {
      rendition = await book.renderTo(view, { width: 600, height: 400 });

      rendition.on("locationChanged", onLocationChange);
      rendition.on("keyup", handleKeyPress || handleKeyPress);

      displayed = await rendition.display();

      setBook(book);
      setRendition(rendition);
    };

    const initBook = async () => {
      book = new Book("Carl Sagan - Kozmos__зЭ9х29.epub");

      // Table of Contents
      book.loaded.navigation.then(({ toc }) => {});

      await renderBook();

      setBook(book);
      setRendition(rendition);

      console.log({ book, rendition, displayed });
    };

    initBook();
  }, [url]);

  useEffect(() => {}, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "70px",
        }}
      >
        <button onClick={prevPage}>{"<"}</button>
        <button onClick={nextPage}>{">"}</button>
      </div>
      <div ref={viewRef}></div>
    </div>
  );
};

export default Reader;
