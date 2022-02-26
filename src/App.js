/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import loading from "./1.gif";
import "./App.css";

function App() {
  const [cat, setCat] = useState(null);
  const [catBuffer, setCatBuffer] = useState([]);
  const [catCounter, setCatCounter] = useState(0);
  console.log(catBuffer, "catBuffer");

  useEffect(() => {
    initCatPicture();
  }, []);

  useEffect(() => {
    bufferCatsPictures();
  }, [catCounter]);

  function isBufferLength() {
    if (catBuffer.length < 1) {
      return true
    }else{
      return false
    }
  }
  async function initCatPicture() {
    const cat = await fetchCat(
      "https://api.thecatapi.com/v1/images/search",
      "GET"
    );
    const catPicture = cat[0].url;
    setCat(catPicture);
  }

  async function bufferCatsPictures() {
    const cat = await fetchCat(
      "https://api.thecatapi.com/v1/images/search",
      "GET"
    );
    const catPicture = cat[0].url;
    setCatBuffer((oldCatPictures) => [...oldCatPictures, catPicture]);

    function bufferCatsCounter() {
      if (catCounter < 9) {
        setCatCounter(catCounter + 1);
      } else {
        return;
      }
    }
    bufferCatsCounter();
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

  
  function handleCatClick() {
   
      setCat(catBuffer.shift());
      if(isBufferLength()){
        setCatCounter(0)
        return 
    
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
      return cat !== null  || undefined ? true : false;
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
