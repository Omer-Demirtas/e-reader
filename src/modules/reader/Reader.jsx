import Epub from "epubjs";
import React, { useEffect, useRef, useCallback, useState } from "react";
import { useReaderStore } from "store/ReaderStore";

const Reader = ({ bookByte }) => {
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

  /*
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
  */

  /* Init Component */
  useEffect(() => {
    if(!bookByte) return;
    if(book) book.destroy();

    setLoading(true);
    
    const view = viewRef.current;

    let book_ = null;
    let rendition_ = null;
    let displayed = null;

    const initBook = async () => {
      //book_ = Epub(ebookUrl, epubOptions);
      //book_ = new Epub();

      book_ = Epub();
      book_.open(bookByte);

      rendition_ = book_.renderTo(view, {
        width: "100%",
        height: 600
      });

      rendition_.display();
      
      setBook(book_);
      setLoading(false);
      setRendition(rendition_);

      /*
      await book_.open(bookByte);

      const a = await getBookContents();

      rendition_ = book_.renderTo(view, {
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

      displayed = rendition_.display();

      //const locations = book_.locations;
      //const currentPage = locations.locationFromCfi(startCfi);
      //const totalPage = locations.total;

      setBook(book_);
      setLoading(false);
      setRendition(rendition_);

      console.log({ book_, rendition_, displayed });
      */
    };

    initBook();

    return book_.destroy();
  }, [bookByte]);

  /*
  useEffect(() => {
    if (!rendition) return;

    console.log("Location change re rendered.");

    rendition.on("relocated", onLocationChange);
    rendition.on("keyup", handleKeyPress);
  }, [rendition]);
  */

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: styles.backgroundColor }}>
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
