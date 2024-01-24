import { useState } from "react";
import "./App.css";
import Sphere from "./Sphere";

function App() {
  const [listItems, setListItems] = useState([
    {
      listItem: "",
    },
  ]);

  const [randomizedList, setRandomizedList] = useState("");

  const addListItem = () => {
    setListItems([...listItems, { listItem: "" }]);
  };

  const removeListItem = (index) => {
    const existingData = [...listItems];
    const filteredData = existingData.filter((x, i) => i !== index);
    setListItems(filteredData);
  };

  const handleListItemChange = (index, e) => {
    const newListItems = [...listItems];
    newListItems[index][e.target.name] = e.target.value;
    setListItems(newListItems);
  };

  const randomizeListItems = () => {
    const shuffledList = [...listItems]
      .map((item) => item.listItem)
      .sort(() => Math.random() - 0.5);
    setRandomizedList(shuffledList.join(", "));
  };

  return (
    <>
      <Sphere />
      {/* <div className="dice-container">
        <div className="dice">
          <div className="front">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="back">
            <span></span>
          </div>
          <div className="right">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="left">
            <span></span>
            <span></span>
          </div>
          <div className="top">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="bottom">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div className="w-1/3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Random inputs
        </label>
        {listItems.map((value, index) => (
          <div className="listItem-container" key={index}>
            <input
              className="listItem-input"
              name="listItem"
              onChange={(e) => handleListItemChange(index, e)}
              value={value.listItem}
              type="text"
              placeholder="enter"
              autoComplete="off"
            />
            {index ? (
              <button
                onClick={() => removeListItem(index)}
                className="listItem-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.5 5.5a.5.5 0 0 1 1 0v8a.5.5 0 0 1-1 0v-8zm3-5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm1.5 0a.5.5 0 0 0-1 0v3a.5.5 0 0 0 1 0v-3zm9 0a.5.5 0 0 1 1 0v3a.5.5 0 0 1-1 0v-3zM4 5.5a.5.5 0 0 1 1 0v8a.5.5 0 0 1-1 0v-8zm6-5a.5.5 0 0 0-1 0v3a.5.5 0 0 0 1 0v-3z" />
                </svg>
                Remove
              </button>
            ) : null}
          </div>
        ))}
        <button onClick={addListItem} className="add-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3H4a.5.5 0 0 1 0-1h3V4A.5.5 0 0 1 8 4z" />
          </svg>
          Add a list item
        </button>
        <button onClick={randomizeListItems} className="randomize-button">
          Randomize
        </button>
        <div className="output-container">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-4">
            Randomized List
          </label>
          <div className="randomized-list">{randomizedList}</div>
        </div>
      </div> */}
    </>
  );
}

export default App;
