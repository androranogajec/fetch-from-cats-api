/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import loading from "./1.gif";
import "./App.css";

function App() {
  const [cat, setCat] = useState(null);
  const [catBuffer, setCatBuffer] = useState([]);
  const [catCounter, setCatCounter] = useState(0);
  console.log("catBuffer", catBuffer, "catCounter", catCounter);
  useEffect(() => {
    initCatPicture();
  }, []);

  useEffect(() => {
    bufferCatPictures();
  }, [catCounter]);

  async function initCatPicture() {
    const cat = await fetchCat(
      "https://api.thecatapi.com/v1/images/search",
      "GET"
    );
    const catPicture = cat[0].url;
    setCat(catPicture);
  }

  function bufferCatPicturesCounter() {
    if (catCounter < 9) {
      setCatCounter(catCounter + 1);
    } else {
      return;
    }
  }

  function bufferCatSetter(catPicture) {
    setCatBuffer((oldCatPictures) => [...oldCatPictures, catPicture]);
  }

  async function bufferCatPictures() {
    const cat = await fetchCat(
      "https://api.thecatapi.com/v1/images/search",
      "GET"
    );
    const catPicture = cat[0].url;
    bufferCatSetter(catPicture); 
    bufferCatPicturesCounter();
  }

  async function fetchCat(url, verb) {
    const response = await fetch(url, {
      method: verb,
      headers: {
        "x-api-key": "88f835a0-2587-4eae-9c7f-cf6a44e58ee0",
      },
    });
    const cat = await response.json();
    return cat;
  }

  function isBufferLengthZero() {
    return catBuffer.length === 0 ? true : false;
  }

  function setCatFromBufferOrSetInitCat() {
    setCat(catBuffer.shift());
    if (isBufferLengthZero()) {
      initCatPicture();
    }
  }

  function handleCatClick() {
    setCatFromBufferOrSetInitCat();
    if (isBufferLengthZero() && catCounter === 9) {
      setCatCounter(0);
     
    }
    
  }

  function DisplayBuffer() {
    return (
      <div className="Loading">{`Your catBuffer has ${catBuffer.length} cats`}</div>
    );
  }

  function Loading() {
    return <img className="Cat-Loading" src={loading} />;
  }

  function Cat() {
    if (isCat(cat)) {
      return <img className="Cat-img" src={cat} />;
    } else {
      return <Loading />;
    }
    function isCat(cat) {
      return cat !== null || undefined ? true : false;
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <button className="Cat-button" onClick={handleCatClick}>
          CAT
        </button>
        <div className="Cat-container">
          <Cat />
        </div>
        <DisplayBuffer />
      </header>
    </div>
  );
}

export default App;
