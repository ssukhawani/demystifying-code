// helper function to create a key from the input
const generateKey = (path, config) => {
  const key = Object.keys(config)
    .sort((a, b) => a.localeCompare(b))
    .map((k) => `${k}:${config[k].toString()}`)
    .join("&");
  return `${path}?${key}`;
};

// helper function to make api call
const makeApiCall = async (path, config) => {
  try {
    let response = await fetch(path, config);
    response = await response.json();
    return response;
  } catch (e) {
    console.log("error " + e);
  }
  return null;
};

// Function to cache API responses with an expiry time
const cachedApiCall = (expiryTime) => {
  // Object to store cached responses
  const cache = {};

  // The function returned by cachedApiCall which handles the caching logic
  return async function (path, config = {}) {
    // Generate the cache key
    const key = generateKey(path, config);

    // Retrieve the cache entry
    let entry = cache[key];
    
    // Check if the cache entry exists and is not expired
    if (!entry || Date.now() > entry.expiryTime) {
        console.log("\nMaking new API call");
        console.log("key : "+key)
        
        try {
        // Make the API call and store the response in the cache
        const value = await makeApiCall(path, config);
        cache[key] = { value, expiryTime: Date.now() + expiryTime };
      } catch (error) {
        console.error("\nAPI call failed, returning cached value if available");
        if (entry) {
          // Return cached value if available even on error
          return entry.value;
        } else {
          // If no cached value, propagate the error
          throw error;
        }
      }
    } else {
      // Return the cached response
      console.log("\nReturning Cached API Response");
      console.log("key : "+key)
    }

    return cache[key].value;
  };
};

// Example usage
const call = cachedApiCall(3100);

// First call - an API call will be made and its response will be cached
call("https://jsonplaceholder.typicode.com/todos/1")
  .then((data) => console.log("First call data:", data))
  .catch((error) => console.error("First call error:", error));

// Cached response will be returned - it will be quick
setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1")
    .then((data) => console.log("Second call data (from cache):", data))
    .catch((error) => console.error("Second call error:", error));
}, 3000);

// A fresh API call is made - as time for cached entry is expired
setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1")
    .then((data) => console.log("Third call data (new call):", data))
    .catch((error) => console.error("Third call error:", error));
}, 4000);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1,
    }),
  })
    .then((data) => console.log("Fourth call data (new call):", data))
    .catch((error) => console.error("Third call error:", error));
}, 5000);
