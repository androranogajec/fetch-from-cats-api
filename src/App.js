/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cat, setCat] = useState({});
  const [catBuffer, setCatBuffer] = useState([]);
  const [catCounter, setCatCounter] = useState(0);

  console.log(catBuffer);

  useEffect(() => {
    fetchCat("https://api.thecatapi.com/v1/images/search", "GET");
    handleCatCounter();
  }, [catCounter]);

  function handleCatCounter() {
    if (catCounter < 19) {
      setCatCounter(catCounter + 1);
    } else {
      return;
    }
  }

  function bufferACatPicture(cat) {
    const catPicture = cat[0].url;
    setCatBuffer((oldCatPictures) => [...oldCatPictures, catPicture]);
  }

  function isBufferLength() {
    if (catBuffer.length < 10) {
      setCatCounter(0);
    }
  }

  async function fetchCat(url, verb) {
    const response = await fetch(url, {
      method: verb,
      headers: {
        "x-api-key": "88f835a0-2587-4eae-9c7f-cf6a44e58ee0",
      },
    });
    const cat = await response.json();
    bufferACatPicture(cat);
  }

  function isCat(cat) {
    return cat === undefined || null ? true : false;
  }

  function handleCatClick() {
    setCat(catBuffer.shift());
    isBufferLength();
  }

  function DisplayBuffer() {
    return (
      <div className="Loading">{`Your catBuffer has ${catBuffer.length} cats`}</div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <button className="Cat-button" onClick={handleCatClick}>
          CAT
        </button>
        <div className="Cat-container">
          <img className="Cat-img" src={cat} />
        </div>
        <DisplayBuffer />
      </header>
    </div>
  );
}

export default App;
