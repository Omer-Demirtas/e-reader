var book = ePub();
var rendition;
let pSize = 60;

const updateFontSizeText = () => document.getElementById("font-size").innerHTML = pSize;

const setFontSize = () => {
  rendition.themes.default({
    p: { "font-size": `${pSize}pt !important`, "line-height": "1.2" },
    h6: { "font-size": `${pSize + 5}pt !important`, "line-height": "1.2" },
    h5: { "font-size": `${pSize + 10}pt !important`, "line-height": "1.2" },
    h4: { "font-size": `${pSize + 15}pt !important`, "line-height": "1.2" },
    h3: { "font-size": `${pSize + 20}pt !important`, "line-height": "1.2" },
    h2: { "font-size": `${pSize + 25}pt !important`, "line-height": "1.2" },
    h1: { "font-size": `${pSize + 30}pt !important`, "line-height": "1.2" },
  });
};

const fontSize = (type) => 
{
    if(type === "INC")
    {
        pSize+=5;
    }
    else
    {
        pSize-=5;
    }
    console.log({book, rendition});
    setFontSize();
    rendition.start();
    updateFontSizeText();
}

var inputElement = document.getElementById("input");

inputElement.addEventListener("change", function (e) {
  var file = e.target.files[0];
  if (window.FileReader) {
    var reader = new FileReader();
    reader.onload = openBook;
    reader.readAsArrayBuffer(file);
  }
});

function openBook(e) {
  //var bookData = e.target.result;
  var title = document.getElementById("title");
  var next = document.getElementById("next");
  var prev = document.getElementById("prev");

  //book.open(bookData, "binary");
  book.open("https://s3.amazonaws.com/moby-dick/OPS/package.opf");
  

  rendition = book.renderTo("viewer", {
    method: "continuous",
    flow: "scrolled",
    width: "100%",
    height: "100%",
  });

  /*
     book.renderTo("viewer", {
      width: "100%",
      height: "100%",
      method: "continuous",
      manager: "continuous"
    });
  */

  setFontSize();

  rendition.display(4);

  var keyListener = function (e) {
    // Left Key
    if ((e.keyCode || e.which) == 37) {
      rendition.prev();
    }

    // Right Key
    if ((e.keyCode || e.which) == 39) {
      rendition.next();
    }
  };

  rendition.on("keyup", keyListener);
  rendition.on("relocated", function (location) {
    console.log({location});
  });

  next.addEventListener(
    "click",
    function (e) {
      rendition.next();
      e.preventDefault();
    },
    false
  );

  prev.addEventListener(
    "click",
    function (e) {
      rendition.prev();
      e.preventDefault();
    },
    false
  );

  document.addEventListener("keyup", keyListener, false);
}

openBook();
updateFontSizeText();
