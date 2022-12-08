import { Book } from "epubjs";
import React, { useEffect, useRef } from "react";
import { useState } from "react";

const Reader = () => 
{
    const viewRef = useRef();

    const [book, setBook] = useState();
    const [rendition, setRendition] = useState();

    /* Init Component */
    useEffect(() => {
        const view = viewRef.current;

        let book = null;
        let rendition = null;
        let displayed = null;

        const renderBook = async () => 
        {
            rendition = await book.renderTo(view, {width: 600, height: 400});
            displayed = await rendition.display();
        }

        const initBook = async () =>
        {
            book = new Book("Carl Sagan - Kozmos__зЭ9х29.epub");
            
            // Table of Contents
            book.loaded.navigation.then(({ toc }) => { });

            await renderBook();

            setBook(book);
            setRendition(rendition);

            console.log({book, rendition, displayed});    
        }

        initBook();
    }, []);

    const nextPaeg = () => rendition.next();
    const prevPaeg = () => rendition.prev();

    return (    
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", width: "70px" }}>
                <button onClick={prevPaeg}>{"<"}</button>
                <button onClick={nextPaeg}>{">"}</button>
            </div>
            <div ref={viewRef}></div>
        </div>
    );
}

export default Reader;