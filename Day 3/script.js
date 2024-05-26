function fetchWithTimeout(url, timeout) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const signal = controller.signal;

    const timer = setTimeout(() => {
      controller.abort();
      reject(new Error('Request timed out'));
    }, timeout);

    fetch(url, { signal })
      .then(response => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch(err => {
        clearTimeout(timer);
        if (err.name === 'AbortError') {
          reject(new Error('Request was aborted'));
        } else {
          reject(err);
        }
      });
  });
}

document.getElementById('fetchDataBtnLong').addEventListener('click', () => {
  const statusElement = document.getElementById('status');
  statusElement.textContent = 'Fetching data with long timeout...';

  fetchWithTimeout('https://fakeresponder.com/?sleep=10000', 5000)
    .then(response => response.json())
    .then(data => {
      statusElement.textContent = 'Data fetched successfully!';
      statusElement.classList.remove('error');
      console.log('Data:', data);
    })
    .catch(error => {
      statusElement.textContent = `Error: ${error.message}`;
      statusElement.classList.add('error');
      console.error('Error:', error);
    });
});

document.getElementById('fetchDataBtnShort').addEventListener('click', () => {
  const statusElement = document.getElementById('status');
  statusElement.textContent = 'Fetching data with short timeout...';

  fetchWithTimeout('https://fakeresponder.com', 3000)
    .then(response => response.json())
    .then(data => {
      setTimeout(()=>{
        statusElement.textContent = 'Data fetched successfully!';
      }, 1000)
      statusElement.classList.remove('error');
      console.log('Data:', data);
    })
    .catch(error => {
      statusElement.textContent = `Error: ${error.message}`;
      statusElement.classList.add('error');
      console.error('Error:', error);
    });
});
