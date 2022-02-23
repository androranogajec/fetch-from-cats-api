/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cat, setCat] = useState({});
  const [catBuffer, setCatBuffer] = useState([])
  const [catEffect, setCatEffect] = useState(false)

  useEffect(() => {
    fetchCat("https://api.thecatapi.com/v1/images/search", "GET");
  }, [catEffect]);

  async function fetchCat(url, verb) {
    const response = await fetch(url, {
      method: verb,
      headers: {
        "x-api-key": "88f835a0-2587-4eae-9c7f-cf6a44e58ee0",
      },
    });
    const cat = await response.json();
    catSetter(cat);
  }

  function isCat(cat) {
    return cat === undefined || null ? true : false;
  }

  function catSetter(cat) {
    if (isCat(cat)) {
      return
    }
    setCat(cat[0]);
  }

  function handleClick(){
     setCatEffect(value => !value)
   
  }
  console.log(cat)
  function Loading(){
    return (
      <div className="Loading">
        Loading...
      </div>
    )
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <button className="Cat-button" onClick={handleClick}>CAT</button>
        <div className="Cat-container">
          <img className="Cat-img" src={cat.url} />
        </div>
        <Loading/>
      </header>
    </div>
  );
}

export default App;
