import React from "react";

const ReaderOptions = ({ onPrevPage, onNextPage }) =>
{
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "#fff",
        paddingLeft: "10px",
        display: "flex",
        justifyContent: "space-between",
        paddingRight: "10px",
        height: 24,
        width: "100%",
      }}
    >
      <div
        style={{
            display: "flex",
            justifyContent: "space-between",
            
        }}
      >
        <button onClick={onPrevPage}>{"<"}</button>
        <span>Page</span>
        <button onClick={onNextPage}>{">"}</button>
      </div>
      <div>

      </div>
    </div>
  );
};

export default ReaderOptions;

const Item = () => {
  return(<div style={{ width: "33.33%" }}>ASDADASDSD</div>);
};
