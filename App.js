var book = ePub();
var rendition;
let pSize = 60;
let mode = "light";
const themes = { light: { color: "black" }, dark: { color: "white" } }

const updateFontSizeText = () => document.getElementById("font-size").innerHTML = pSize;
const updateThemeText = () => document.getElementById("theme").innerHTML = mode;

function removeNewlines(str) {
  //remove line breaks from str
  /*
  str = str.replace(/\s{2,}/g, " ");
  str = str.replace(/\t/g, " ");
  str = str
    .toString()
    .trim()
    .replace(/(\r\n|\n|\r)/g, "");
  */
  str = str.replace(/\s+/g,' ').trim();
  return str;
}

const toggleTheme = () =>
{
  if(mode === "light")
  {
    mode = "dark";
    document.getElementsByTagName("body")[0].style.backgroundColor  = "black"
  }
  else
  {
    mode = "light";
    document.getElementsByTagName("body")[0].style.backgroundColor  = "white"
  }
  updateThemeText();
  refreshStyles();
  rendition.start();
}

const refreshStyles = () => {
  //console.log(`${themes[mode].p} !important`);
  if(!rendition) return;
  const color = themes[mode].color;

  rendition.themes.default({
    p: { "font-size": `${pSize}pt !important`, "line-height": "1.2", color },
    h6: { "font-size": `${pSize + 5}pt !important`,"line-height": "1.2" },
    h5: { "font-size": `${pSize + 10}pt !important`, "line-height": "1.2", color },
    h4: { "font-size": `${pSize + 15}pt !important`, "line-height": "1.2", color },
    h3: { "font-size": `${pSize + 20}pt !important`, "line-height": "1.2", color },
    h2: { "font-size": `${pSize + 25}pt !important`, "line-height": "1.2", color },
    h1: { "font-size": `${pSize + 30}pt !important`, "line-height": "1.2", color },
  });
};

const getPageNumber = async () => 
{
  if(!rendition.currentLocation()) return "";
  let location = this.rendition.currentLocation();
  let cfiString = location.start.cfi;
  console.log({ cfiString })
  //console.log(rendition.currentLocation());
  //return `${loc.start.index}/${loc.start.displayed.total}`;
  return 1;
}

const setPageNumber = async () => 
{
  if(!rendition) return "";
  return document.getElementById("pageNumber").innerHTML = await getPageNumber();
}

const setFontSize = (type) => {
  if (type === "INC") {
    pSize += 5;
  } else {
    pSize -= 5;
  }
  refreshStyles();
  rendition.start();
  updateFontSizeText();
};

var inputElement = document.getElementById("input");

inputElement.addEventListener("change", function (e) {
  var file = e.target.files[0];
  if (window.FileReader) {
    var reader = new FileReader();
    reader.onload = openBook;
    reader.readAsArrayBuffer(file);
  }
});

const openBook = async (e) => 
{
  var bookData;
  var title = document.getElementById("title");
  var next = document.getElementById("next");
  var prev = document.getElementById("prev");

  if(e)
  {
    bookData = e.target.result;
    book.open(bookData, "binary");
  }
  else
  {
    book.open("https://s3.amazonaws.com/moby-dick/OPS/package.opf");
  }

  rendition = book.renderTo("viewer", {
    method: "continuous",
    flow: "scrolled",
    width: "100%",
    height: "100%",
  });


     
  refreshStyles();

  let displayed = await rendition.display(0);

  book.ready.then(function() {
    const stored = localStorage.getItem(book.key() + '-locations');
    console.log('metadata:', book.package.metadata);
    if (stored) {
        return book.locations.load(stored);
    } else {
        return book.locations.generate(1024); // Generates CFI for every X characters (Characters per/page)
    }
  }).then(function(location) { // This promise will take a little while to return (About 20 seconds or so for Moby Dick)
      localStorage.setItem(book.key() + '-locations', book.locations.save());
  });


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
    //progress = book.locations.percentageFromCfi(location.start.cfi);
    //console.log('Progress:', progress); // The % of how far along in the book you are
    const startCfi = location.start.cfi;
    const currentPage = book.locations.locationFromCfi(location.start.cfi);
    const totalPage = book.locations.total;
    console.log({ startCfi, currentPage, totalPage });
  });
  
  const a = await book.locations;
  console.log({a, displayed});
  
  book.spine.hooks.serialize.register((output, section) => {
    section.output = removeNewlines(output);
  });

  next.addEventListener(
    "click",
    function (e) {
      rendition.next();
      setPageNumber();
      e.preventDefault();
    },
    false
  );

  prev.addEventListener(
    "click",
    function (e) {
      rendition.prev();
      setPageNumber();
      e.preventDefault();
    },
    false
  );

  document.addEventListener("keyup", keyListener, false);
}

//openBook();

const init = async () => 
{
  updateFontSizeText();
  updateThemeText();  
}

init();
