import { Book } from "epubjs";
import React, { useEffect, useRef, useCallback, useState } from "react";

const Reader = ({ url }) => {
  const viewRef = useRef();

  const [book, setBook] = useState();
  const [rendition, setRendition] = useState();
  const [loading, setLoading] = useState(false);

  const nextPage = useCallback(() => rendition.next(), [rendition]);
  const prevPage = useCallback(() => rendition.prev(), [rendition]);

  const handleKeyPress = useCallback(
    ({ key }) => {
      key && key === "ArrowRight" && nextPage();
      key && key === "ArrowLeft" && prevPage();
    },
    [rendition]
  );

  const onLocationChange = useCallback(
    (loc) => {
      console.log({ loc, book });

      /*
      const startCfi = loc && loc.start;
      const endCfi = loc && loc.end;
      const base = loc && loc.start.slice(8).split("!")[0];
      */

      if (!book) return;

      //const spineItem = book.spine.get(startCfi);
      //const navItem = book.navigation.get(spineItem.href);
      //const chapterName = navItem && navItem.label.trim();

      const locations = book.locations;
      console.log({ locations, loc });
      const currentPage = locations.locationFromCfi(loc.start.cfi);
      const totalPage = locations.total;
      const total = book.locations.total;
      console.log({
        total,
        loc,
        totalPage,
        currentPage,
        locations,
        page: book.locations.locationFromCfi(loc.start.cfi),
      });
    },
    [rendition]
  );

  /* Init Component */
  useEffect(() => {
    setLoading(true);
    const view = viewRef.current;

    console.log({ url, book });

    // if already there is a book. destroy it.
    if (book) {
      book.destroy();
    }

    let book_ = null;
    let rendition_ = null;
    let displayed = null;

    const renderBook = async () => {
      const pSize = 65;
      const color = { color: "black" };

      rendition_ = await book_.renderTo(view, {
        width: '100%', height: '100%', 
        method: "continuous",
        flow: "scrolled",
      });

      rendition_.themes.default({
        p: { "font-size": `${pSize}pt !important`, "line-height": "1.2", color },
        h6: { "font-size": `${pSize + 5}pt !important`,"line-height": "1.2" },
        h5: { "font-size": `${pSize + 10}pt !important`, "line-height": "1.2", color },
        h4: { "font-size": `${pSize + 15}pt !important`, "line-height": "1.2", color },
        h3: { "font-size": `${pSize + 20}pt !important`, "line-height": "1.2", color },
        h2: { "font-size": `${pSize + 25}pt !important`, "line-height": "1.2", color },
        h1: { "font-size": `${pSize + 30}pt !important`, "line-height": "1.2", color },
      });

      console.log({ rendition_ });
      displayed = await rendition_.display();
    };

    const initBook = async () => {
      book_ = new Book(url);

      // Table of Contents
      await book_.loaded.navigation.then(({ toc }) => { console.log({ toc }) });

      await book_.ready.then(() => {
        const stored = localStorage.getItem(book_.key() + "-locations");
        if (stored) {
          return book_.locations.load(stored);
        } else {
          return book_.locations.generate(1024);
        }
      });

      setBook(book_);

      await renderBook();

      const locations = book_.locations;
      //const currentPage = locations.locationFromCfi(startCfi);
      const totalPage = locations.total;

      setRendition(rendition_);

      setLoading(false);

      console.log({ book_, rendition_, displayed, totalPage, locations });
    };

    initBook();
  }, [url]);

  useEffect(() => {
    if (!rendition) return;

    console.log("Location change re rendered.");

    rendition.on("relocated", onLocationChange);
    rendition.on("keyup", handleKeyPress);
  }, [rendition]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {!loading ? (
        <>
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
        </>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
      <div ref={viewRef}></div>
    </div>
  );
};

export default Reader;
