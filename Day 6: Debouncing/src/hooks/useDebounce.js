import { useState, useEffect } from 'react';

// This hook will return a debounced version of the input value after the specified delay
const useDebounce = (value, delay) => {
  // This variable will store the debounced version of the input value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Returning a cleanup function that will clear the timer when the component unmounts 
    // or when the value or delay arguments change
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  // Returning the debouncedValue state variable
  return debouncedValue;
};

export default useDebounce;
