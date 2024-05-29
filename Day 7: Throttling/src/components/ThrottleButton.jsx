import React from 'react';
import useThrottle from '../hooks/useThrottle';

const ThrottleButton = () => {
  // Function to log the current time
  const logTime = () => {
    console.log('Button clicked at:', new Date().toLocaleTimeString());
  };

  // Throttle the logTime function with a 3-second delay
  const throttledLogTime = useThrottle(logTime, 3000);

  return (
    <div>
      <button onClick={throttledLogTime}>Click Me</button>
      <p>Click the button multiple times rapidly and check the console to see the throttled output.</p>
    </div>
  );
};

export default ThrottleButton;
