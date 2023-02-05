import Epub from "epubjs";
import ReaderOptions from "pages/book/component/ReadOptions";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReaderStore } from "store/ReaderStore";

const EpubReader = ({ bookByte }) => {
  const ref = useRef();
  const currentCFI = useRef();

  const styles = useReaderStore(s => s.styles);

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

  const onLocationChange = useCallback(
    (loc) => {
      console.log({ loc, book });

      if (!book) return;

      //const spineItem = book.spine.get(startCfi);
      //const navItem = book.navigation.get(spineItem.href);
      //const chapterName = navItem && navItem.label.trim();

      currentCFI.current = loc.start.cfi;
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
    if(!bookByte) return;
    if(book) book.destroy();
    console.log("MAIN");

    var book_ = null;
    var rendition_ = null;
    book_ = new Epub();
    book_.open(bookByte);

    const view = ref.current;

    rendition_ = book_.renderTo(view, {
      width: '100%', 
      height: '100%', 
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

    rendition_.display(currentCFI.current);

    setBook(book_);
    setRendition(rendition_);
  }, [bookByte]);

  useEffect(() => {
    if (!rendition) return;

    console.log("Location change re rendered.");

    rendition.on("relocated", onLocationChange);
    rendition.on("keyup", handleKeyPress);
  }, [rendition]);

  /** Viewer Option Changed */
  useEffect(() => {
    let mounted = true;
    if (!book) return;

    const node = ref.current;
    if (!node) return;
    node.innerHTML = "";

    book.ready.then(function () {
      if (!mounted) return;
      if (book.spine) {
        const loc = book.rendition?.location?.start?.cfi;

        // if (book.rendition) book.rendition.destroy();

        const rendition_ = book.renderTo(node, {
          width: '100%', 
          height: '100%', 
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

        setRendition(rendition_);

        console.log({ loc });
        if (loc) {
          rendition_.display(loc);
        } else {
          rendition_.display();
        }
      }
    });

    
    return () => {
      mounted = false;
    };
  }, [styles]);

  console.log({currentCFI: currentCFI.current});

  return (
    <div style={{ backgroundColor: styles.backgroundColor,  width: "100%", height: "100%" }}>
      <ReaderOptions 
        onNextPage={nextPage}
        onPrevPage={prevPage}
      />
      <div ref={ref}></div>
    </div>
  );
};

export default EpubReader;
