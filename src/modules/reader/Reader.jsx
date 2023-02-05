import { Book } from "epubjs";
import ReaderOptions from "pages/book/component/ReadOptions";
import React, { useEffect, useRef, useCallback, useState } from "react";
import { useReaderStore } from "store/ReaderStore";

const Reader = ({ url, bookByte }) => {
  const viewRef = useRef();

  const styles = useReaderStore(s => s.styles);

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

  useEffect(() => {
    if (!rendition) return;

    rendition.themes.default({
      p: { "font-size": `${styles.fontSize}pt !important`, "line-height": "1.2", color: styles.textColor },
      h6: { "font-size": `${styles.fontSize + 5}pt !important`,"line-height": "1.2" },
      h5: { "font-size": `${styles.fontSize + 10}pt !important`, "line-height": "1.2", color: styles.textColor },
      h4: { "font-size": `${styles.fontSize + 15}pt !important`, "line-height": "1.2", color: styles.textColor },
      h3: { "font-size": `${styles.fontSize + 20}pt !important`, "line-height": "1.2", color: styles.textColor },
      h2: { "font-size": `${styles.fontSize + 25}pt !important`, "line-height": "1.2", color: styles.textColor },
      h1: { "font-size": `${styles.fontSize + 30}pt !important`, "line-height": "1.2", color: styles.textColor },
    });

    rendition.display();
  }, [rendition, styles]);

  /* Init Component */
  useEffect(() => {
    if(!url && !bookByte) return;

    setLoading(true);
    
    const view = viewRef.current;

    // if already there is a book. destroy it.
    if (book) {
      book.destroy();
    }

    let book_ = null;
    let rendition_ = null;
    let displayed = null;

    const renderBook = async () => {

      rendition_ = await book_.renderTo(view, {
        width: '100%', height: '100%', 
        method: "continuous",
        flow: "scrolled",
      });

      rendition_.themes.default({
        p: { "font-size": `${styles.fontSize}pt !important`, "line-height": "1.2", color: styles.textColor },
        h6: { "font-size": `${styles.fontSize + 5}pt !important`,"line-height": "1.2" },
        h5: { "font-size": `${styles.fontSize + 10}pt !important`, "line-height": "1.2", color: styles.textColor },
        h4: { "font-size": `${styles.fontSize + 15}pt !important`, "line-height": "1.2", color: styles.textColor },
        h3: { "font-size": `${styles.fontSize + 20}pt !important`, "line-height": "1.2", color: styles.textColor },
        h2: { "font-size": `${styles.fontSize + 25}pt !important`, "line-height": "1.2", color: styles.textColor },
        h1: { "font-size": `${styles.fontSize + 30}pt !important`, "line-height": "1.2", color: styles.textColor },
      });

      displayed = await rendition_.display();
    };

    const initBook = async () => {
      book_ = new Book();

      if(bookByte)
      {
        book_.open(bookByte, "binary")
      }
      else
      {
        book_.open(url, "binary")
      }

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

    return book_.destroy();
  }, [url]);

  useEffect(() => {
    if (!rendition) return;

    console.log("Location change re rendered.");

    rendition.on("relocated", onLocationChange);
    rendition.on("keyup", handleKeyPress);
  }, [rendition]);

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: styles.backgroundColor }}>
      <ReaderOptions 
        onNextPage={nextPage}
        onPrevPage={prevPage}
      />
      {!loading ? (
        <>
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
