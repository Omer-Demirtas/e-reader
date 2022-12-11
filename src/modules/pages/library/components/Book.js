const Book = ({ book }) => {
  return (
    <button style={{ padding: 0, margin: 0 }} onClick={() => {}}>
      <div
        style={{
          backgroundColor: "pink",
          height: "300px",
          width: "300px",
          padding: "1rem",
        }}
      >
        <h3>{book.name}</h3>
      </div>
    </button>
  );
};

export default Book;
