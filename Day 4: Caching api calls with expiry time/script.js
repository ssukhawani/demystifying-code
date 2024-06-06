// Function to cache API responses with an expiry time
const cachedApiCall = (expiryTime) => {
  // Object to store cached responses
  const cache = {};

  // Function to generate a unique key for the cache based on the URL and request configuration
  const generateKey = (path, config) => {
    const key = Object.keys(config)
      .sort((a, b) => a.localeCompare(b))
      .map((k) => `${k}:${config[k].toString()}`)
      .join("&");
    return `${path}?${key}`;
  };

  // Function to make the actual API call
  const makeApiCall = async (path, config) => {
    try {
      let response = await fetch(path, config);
      response = await response.json();
      return response;
    } catch (error) {
      console.log("Error making API call:", error);
      throw error; // rethrow error to handle it in the calling function
    }
  };

  // The function returned by cachedApiCall which handles the caching logic
  return async function(path, config = {}) {
    // Generate the cache key
    const key = generateKey(path, config);
    // Retrieve the cache entry
    let entry = cache[key];

    // Check if the cache entry exists and is not expired
    if (!entry || Date.now() > entry.expiryTime) {
      console.log("Making new API call");
      try {
        // Make the API call and store the response in the cache
        const value = await makeApiCall(path, config);
        cache[key] = { value, expiryTime: Date.now() + expiryTime };
        startTimer(expiryTime); // Start the timer
      } catch (error) {
        console.error("API call failed, returning cached value if available");
        if (entry) {
          return entry.value; // Return cached value if available even on error
        } else {
          throw error; // If no cached value, propagate the error
        }
      }
    } else {
      console.log("Returning cached response");
    }

    // Return the cached response
    return cache[key].value;
  };
};

// Timer function to display the remaining cache time
const startTimer = (expiryTime) => {
  const timerElement = document.getElementById('timer');
  let remainingTime = expiryTime / 1000;

  const updateTimer = () => {
    if (remainingTime > 0) {
      timerElement.textContent = `Cache expires in: ${remainingTime--} seconds`;
      setTimeout(updateTimer, 1000);
    } else {
      timerElement.textContent = 'Cache expired';
    }
  };

  updateTimer();
};

// Example usage
const call = cachedApiCall(10 * 1000);

document.getElementById('fetchDataBtn').addEventListener('click', async () => {
  const statusElement = document.getElementById('status');
  const dataElement = document.getElementById('data');
  statusElement.textContent = 'Fetching data...';
  dataElement.textContent = '';

  try {
    const data = await call('https://fakeresponder.com/?sleep=1000');
    statusElement.textContent = 'Data fetched successfully!';
    dataElement.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    statusElement.textContent = `Error: ${error.message}`;
    statusElement.classList.add('error');
  }
});

document.getElementById('fetchDataBtnCached').addEventListener('click', async () => {
  const statusElement = document.getElementById('status');
  const dataElement = document.getElementById('data');
  statusElement.textContent = 'Fetching cached data...';
  dataElement.textContent = '';

  try {
    const data = await call('https://fakeresponder.com/?sleep=1000');
    statusElement.textContent = 'Data fetched successfully!';
    dataElement.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    statusElement.textContent = `Error: ${error.message}`;
    statusElement.classList.add('error');
  }
});
