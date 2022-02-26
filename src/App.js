/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cat, setCat] = useState({});
  const [catBuffer, setCatBuffer] = useState([]);
  const [catCounter, setCatCounter] = useState(0);
  console.log(catBuffer, "catBuffer");

  useEffect(() => {
    initCatPicture()
  }, []);

  useEffect(() => {
    bufferCatsPictures();
  }, [catCounter]);



  function isBufferLength() {
    if (catBuffer.length < 2) {
      setCatCounter(0);
    }
  }
  async function initCatPicture(){
    const cat = await fetchCat(
      "https://api.thecatapi.com/v1/images/search",
      "GET"
    );
    const catPicture = cat[0].url;
    setCat(catPicture)
  }
  async function bufferCatsPictures() {
    const cat = await fetchCat(
      "https://api.thecatapi.com/v1/images/search",
      "GET"
    );
    const catPicture = cat[0].url;
    setCatBuffer((oldCatPictures) => [...oldCatPictures, catPicture]);

    //fetch cats till get to 20
    function bufferCatsCounter() {
      if (catCounter < 9) {
        setCatCounter(catCounter + 1);
      } else {
        return;
      }
    }
    bufferCatsCounter()
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

  function isCat(cat) {
    return cat === undefined || null ? true : false;
  }

  function handleCatClick() {
   
   if(catBuffer.length < 2){
     return 
   }else{
    setCat(catBuffer.shift());
    isBufferLength()
   }
    
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
          <img className="Cat-img" src={cat} alt="cat"/>
        </div>
        <DisplayBuffer />
      </header>
    </div>
  );
}

export default App;
