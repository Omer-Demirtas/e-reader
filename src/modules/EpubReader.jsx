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
      if (!book) return;

      //const spineItem = book.spine.get(startCfi);
      //const navItem = book.navigation.get(spineItem.href);
      //const chapterName = navItem && navItem.label.trim();

      currentCFI.current = loc.start;

      /*
      const locations = book.locations;
      const currentPage = locations.locationFromCfi(loc.start.cfi);
      const totalPage = locations.total;
      const total = book.locations.total;
      */
      console.log({
        cfi: loc.start,
        currenct: currentCFI.current,
        loc
      });
    },
    [rendition]
  );

  useEffect(() => {
    if(!bookByte) return;
    if(book) book.destroy();
    if (rendition) rendition.destroy();

    console.log("MAIN");

    var book_ = null;
    var rendition_ = null;

    const init = async () =>
    {
      book_ = new Epub({ fixedLayout: true });
  
      await book_.open(bookByte);
  
      const view = ref.current;
  
      rendition_ = book_.renderTo(view, {
        flow: "scrolled-doc",
        width: "100%",
        fullsize: true
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
    }

    init();
  }, [bookByte, styles]);

  /** Viewer Option Changed 
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

        console.log({ loc, cfi: currentCFI.current });

        rendition_.display(loc);
      }
    });

    
    return () => {
      mounted = false;
    };
  }, [styles]);
*/
  

  useEffect(() => {
    if(!rendition) return;

    document.addEventListener('keyup', handleKeyPress, false);
    rendition.on('keyup', handleKeyPress);
    rendition.on('locationChanged', onLocationChange);

    return () => {
      document.removeEventListener('keyup', handleKeyPress, false);
      rendition.off('keyup', handleKeyPress);
      rendition.off('locationChanged', onLocationChange);
    };
  }, [rendition]);


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
