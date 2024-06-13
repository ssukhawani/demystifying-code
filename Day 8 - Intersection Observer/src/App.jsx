import React from "react";
import "./App.css";
import LazyImage from "./components/LazyImage";

const imageList = Array.from(
  { length: 30 },
  (_, index) => `https://robohash.org/${index}`
);

const App = () => {
  return (
    <div className="container">
      <div className="column">
        <div className="sticky-header">
          <h2>Threshold 1.0</h2>
          <p style={{color:'red'}}>Only shows image if target is 100% inside viewport</p>
        </div>
        {imageList.map((src, index) => (
          <div key={index} className="image-container">
            <LazyImage number={index} threshold={1.0} />
          </div>
        ))}
      </div>
      <div className="column">
        <div className="sticky-header">
          <h2>Threshold 0.5</h2>
          <p style={{color:'red'}}>Shows image if target is 50% or more inside viewport</p>
        </div>

        {imageList.map((src, index) => (
          <div key={index} className="image-container">
            <LazyImage number={index} threshold={0.5} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
