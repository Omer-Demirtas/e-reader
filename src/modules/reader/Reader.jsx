import { Book } from "epubjs";
import React, { useEffect, useRef, useCallback, useState} from "react";

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
    console.log({ loc, book});
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
    const total = book.locations.total;
    console.log({
      total,
      startCfi, 
      base,
      totalPage,
      currentPage,
      locations,
      chapterName,
      navItem,
      spineItem,
      page: book.locations.locationFromCfi(loc.start.cfi)
    });
  }, [rendition]);

  /* Init Component */
  useEffect(() => {
    const view = viewRef.current;

    let book_ = null;
    let rendition_ = null;
    let displayed = null;

    const renderBook = async () => {
      rendition_ = await book_.renderTo(view, { width: 600, height: 400 });

      console.log({rendition_});
      displayed = await rendition_.display();
    };

    const initBook = async () => {
      book_ = new Book("Carl Sagan - Kozmos__зЭ9х29.epub");

      // Table of Contents
      await book_.loaded.navigation.then(({ toc }) => {});

      await book_.ready.then(ready => console.log({ready}))

      await renderBook();

      console.log({ rendition_, book_ });

      const locations = book_.locations;
      //const currentPage = locations.locationFromCfi(startCfi);
      const totalPage = locations.total;

      setBook(book_);
      setRendition(rendition_);

      console.log({ book_, rendition_, displayed, totalPage, locations });
    };

    initBook();
  }, [url]);

  useEffect(() => {
    if (!rendition) return;
    
    console.log("Location change re rendered.");

    rendition.on("locationChanged", onLocationChange);
    rendition.on("keyup", handleKeyPress);

  }, [rendition]);

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
