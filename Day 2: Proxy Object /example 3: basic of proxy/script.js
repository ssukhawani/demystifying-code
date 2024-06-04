function logHandler(target, prop, args) {
  console.log(`API ${prop.toUpperCase()} Request: ${args[0]}`);

  // Intercept the API request and return the promise
  const responsePromise = target[prop](...args);

  // Wait for the response promise to resolve
  responsePromise
    .then((response) => {
      // Log the response status code
      console.log(
        `API ${prop.toUpperCase()} Response Status: ${response.status}`
      );

      // Log the response data
      response
        .json()
        .then((data) => {
          console.log(`API ${prop.toUpperCase()} Response Data:`, data);
        })
        .catch((error) => {
          console.error("Error parsing JSON:", error);
        });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  // Return the response promise
  return responsePromise;
}

// Example usage of the Proxy with logHandler
const apiProxy = new Proxy(window, {
  get(target, prop) {
    // Check if the property starts with 'fetch' (indicating a fetch API call)
    if (prop.startsWith("fetch")) {
      return function (...args) {
        // Intercept the fetch call and log the request and response
        return logHandler(target, prop, args);
      };
    }
    // If the property is not a fetch API call, return the default behavior
    return Reflect.get(...arguments);
  },
});

// Making a fetch request to demonstrate the proxy logging
document.getElementById("fetchDataBtn").addEventListener("click", function () {
  try {
    // Trigger the API request using the proxy
    apiProxy.fetch("https://jsonplaceholder.typicode.com/posts/1");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
