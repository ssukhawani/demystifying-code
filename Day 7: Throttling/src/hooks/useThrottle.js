import { useRef, useCallback } from 'react';

// Custom hook to throttle a function call
const useThrottle = (callback, delay) => {
  // Store the timestamp of the last function call
  const lastCall = useRef(0);

  // useRef is used to persist a value across renders without causing re-renders.
  // useCallback is used to memoize the throttled function so that it does not change on every render.
  return useCallback((...args) => {
    const now = new Date().getTime();
    // If the current function call and last function call has difference < delay then don't do anything
    if (now - lastCall.current < delay) {
      return;
    }
    // else call the throttled function & update last call timestamp
    lastCall.current = now;
    callback(...args);
  }, [callback, delay]);
};

export default useThrottle;
