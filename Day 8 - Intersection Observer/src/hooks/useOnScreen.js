import { useState, useEffect } from "react";

function useOnScreen(ref, threshold) {
  // State to keep track of whether the element is intersecting with the viewport
  const [isIntersecting, setIntersecting] = useState(false);

  // Creating a new IntersectionObserver instance
  // const observer = new IntersectionObserver(callback, options);
  const observer = new IntersectionObserver(
    // Callback function executed when intersection changes &
    // entry objects is returned by intersection observer api
    ([entry]) => {
      // Update the state with the intersection status
      // (true if intersecting, false if not)
      setIntersecting(entry.isIntersecting);
    },
    {
      // Setting the threshold to 1.0, meaning the callback
      // will be triggered when 100% of the element is visible
      threshold: threshold ?? 1.0,
    }
  );

  useEffect(() => {
    // Observing the referenced element if it exists
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup function to disconnect the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  // Returning the intersection status (true or false)
  return isIntersecting;
}

export default useOnScreen;
