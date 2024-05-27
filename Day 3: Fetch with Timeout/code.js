



function fetchWithTimeout(url, timeout) {
    // return a new promise
    return new Promise((resolve, reject) => {
      // Create an AbortController instance
      const controller = new AbortController();
      const signal = controller.signal;
  
      // Set up a timeout to reject the promise and abort the fetch
      const timer = setTimeout(() => {
        controller.abort();
        reject(new Error('Request timed out'));
      }, timeout);
  
      // Perform the fetch with the signal from the AbortController
      fetch(url, { signal })
        .then(response => {
          // Clear the timeout on success
          clearTimeout(timer); 
          resolve(response);
        })
        .catch(err => {
          // Clear the timeout on error
          clearTimeout(timer); 
          if (err.name === 'AbortError') {
            reject(new Error('Request was aborted'));
          } else {
            reject(err);
          }
        });
    });
  }
  