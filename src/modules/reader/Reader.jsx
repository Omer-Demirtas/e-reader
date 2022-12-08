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
        const initBook = async () =>
        {
            const view = viewRef.current;

            const book = new Book("Carl Sagan - Kozmos__зЭ9х29.epub");
            var rendition = book.renderTo(view, {width: 600, height: 400});
            var displayed = await rendition.display();
            
            console.log({book, rendition, displayed});    
        }

        initBook();
    }, []);

    return (
        <div>
            <div ref={viewRef}></div>
        </div>
    );
}

export default Reader;