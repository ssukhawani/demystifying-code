import React, { useRef } from "react";
import useOnScreen from "../hooks/useOnScreen";

const LazyImage = ({ number, threshold }) => {
  const ref = useRef();
  const isVisible = useOnScreen(ref, threshold);

  return (
    <div ref={ref} className="box">
      {number}
      {isVisible ? " visible" : " Not visible"}
      <img
        src={
          isVisible
            ? `https://robohash.org/${number}`
            : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif"
        }
        alt={isVisible ? " visible" : " Not visible"}
      />
    </div>
  );
};

export default LazyImage;
