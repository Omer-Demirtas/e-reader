import React from "react";
import { useReaderStore } from "store/ReaderStore";

const ReaderOptions = ({ onPrevPage, onNextPage }) => {
  const styles = useReaderStore(s => s.styles);

  const increaseFontSize = useReaderStore(s => s.increaseFontSize);
  const decreaseFontSize = useReaderStore(s => s.decreaseFontSize);
  const setTextColor = useReaderStore(s => s.setTextColor);
  const setBackgroundColor = useReaderStore(s => s.setBackgroundColor);

  return (
    <div
      style={{
        paddingLeft: "10px",
        display: "flex",
        justifyContent: "space-between",
        paddingRight: "10px",
        height: 24,
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <button onClick={onPrevPage}>{"<"}</button>
        <span>Page</span>
        <button onClick={onNextPage}>{">"}</button>

        <button onClick={decreaseFontSize}>{"-"}</button>
        <span>{styles.fontSize}</span>
        <button onClick={increaseFontSize}>{"+"}</button>


        <span>Background Color : </span>
        <select value={styles.backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)}>
          <option value="#ff0000">Red</option>
          <option value="#00ff00">Green</option>
          <option value="#0000ff">Blue</option>
          <option value="#000000">Black</option>
          <option value="#ffffff">White</option>
        </select>

        <span>Text Color : </span>
        <select value={styles.textColor} onChange={(e) => setTextColor(e.target.value)}>
          <option value="#ff0000">Red</option>
          <option value="#00ff00">Green</option>
          <option value="#0000ff">Blue</option>
          <option value="#000000">Black</option>
          <option value="#ffffff">White</option>
        </select>
      </div>
      <div></div>
    </div>
  );
};

export default ReaderOptions;

const Item = () => {
  return <div style={{ width: "33.33%" }}>ASDADASDSD</div>;
};
