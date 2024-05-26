const logsContainer = document.getElementById('logsContainer');

// Function to log API requests and responses
function logHandler(target, prop, args) {
  const logEntry = document.createElement('div');
  logEntry.classList.add('log-entry');
  logEntry.innerHTML = `<span>API ${prop.toUpperCase()} Request:</span> ${args[0]}`;

  logsContainer.appendChild(logEntry);

  // Intercept the API request and return the promise
  const responsePromise = target[prop](...args);

  // Wait for the response promise to resolve
  responsePromise.then(response => {
    // Log the response status code
    const logEntryStatus = document.createElement('div');
    logEntryStatus.classList.add('log-entry');
    logEntryStatus.textContent = `API ${prop.toUpperCase()} Response Status: ${response.status}`;
    logsContainer.appendChild(logEntryStatus);

    // Log the response data
    response.json().then(data => {
      const logEntryResponse = document.createElement('div');
      logEntryResponse.classList.add('log-entry');
      logEntryResponse.innerHTML = `<span>API ${prop.toUpperCase()} Response Data:</span> ${JSON.stringify(data)}`;
      logsContainer.appendChild(logEntryResponse);
    }).catch(error => {
      console.error('Error parsing JSON:', error);
    });
  }).catch(error => {
    console.error('Error fetching data:', error);
  });

  // Return the response promise
  return responsePromise;
}


// Proxy object to log API requests and responses
const apiProxy = new Proxy(window, {
  // Intercept property access on the window object
  get(target, prop) {
    // Check if the property starts with 'fetch' (indicating a fetch API call)
    if (prop.startsWith('fetch')) {
      return function(...args) {
        // Intercept the fetch call and log the request and response
        return logHandler(target, prop, args);
      };
    }
    // If the property is not a fetch API call, return the default behavior
    return Reflect.get(...arguments);
  }
});


// Button event listener to trigger API request
document.getElementById('fetchDataBtn').addEventListener('click', function() {
  try {
    // Trigger the API request using the proxy
    apiProxy.fetch('https://jsonplaceholder.typicode.com/posts/1');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
