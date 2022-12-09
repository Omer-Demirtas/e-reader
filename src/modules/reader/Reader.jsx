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

  const handleKeyPress = useCallback(
    ({ key }) => {
      key && key === "ArrowRight" && nextPage();
      key && key === "ArrowLeft" && prevPage();
    },
    [rendition]
  );

  const onLocationChange = useCallback((loc) => {
    console.log({ loc, book });
    const startCfi = loc && loc.start;
    const endCfi = loc && loc.end;
    const base = loc && loc.start.slice(8).split("!")[0];

    if (!book) return;

    const spineItem = book.spine.get(startCfi);
    const navItem = book.navigation.get(spineItem.href);
    const chapterName = navItem && navItem.label.trim();

    const locations = book.locations;
    const currentPage = locations.locationFromCfi(startCfi);
    const totalPage = locations.total;

    console.log({
      totalPage,
      currentPage,
      locations,
      chapterName,
      navItem,
      spineItem,
    });
  });

  /* Init Component */
  useEffect(() => {
    const view = viewRef.current;

    let book = null;
    let rendition = null;
    let displayed = null;

    const renderBook = async () => {
      rendition = await book.renderTo(view, { width: 600, height: 400 });

      displayed = await rendition.display();
    };

    const initBook = async () => {
      book = new Book("Carl Sagan - Kozmos__зЭ9х29.epub");

      // Table of Contents
      await book.loaded.navigation.then(({ toc }) => {});

      await renderBook();

      const locations = book.locations;
      //const currentPage = locations.locationFromCfi(startCfi);
      const totalPage = locations.total;

      setBook(book);
      setRendition(rendition);

      console.log({ book, rendition, displayed, totalPage, locations });
    };

    initBook();
  }, [url]);

  useEffect(() => {
    if (!book || !rendition) return;

    rendition.on("locationChanged", onLocationChange);
    rendition.on("keyup", handleKeyPress);
  }, [book, rendition]);

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
