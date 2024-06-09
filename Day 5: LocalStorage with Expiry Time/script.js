// Helper function to set item in localStorage with expiry time

function setItemWithExpiry(key, value, expiryTime) {
    const now = Date.now();
    const item = {
      value: value,
      expiry: now + expiryTime,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
  
  // Helper function to get item from localStorage considering expiry time
  function getItemWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
  
    const item = JSON.parse(itemStr);
    const now = Date.now();
  
    if (now > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
  
    return item.value;
  }
  
  // Function to show sale banner
  function showSaleBanner() {
    const saleBanner = document.getElementById('sale-banner');
    saleBanner.classList.remove('hidden');
  }
  
  // Function to hide sale banner
  function hideSaleBanner() {
    const saleBanner = document.getElementById('sale-banner');
    saleBanner.classList.add('hidden');
  }


  // Timer function to display the remaining cache time
  const startTimer = (expiryTime) => {
    const timerElement = document.getElementById('timer');
    let remainingTime = expiryTime / 1000;

    const updateTimer = () => {
      if (remainingTime >= 0) {
        timerElement.textContent = `Sale expires in: ${remainingTime--} seconds`;
        setTimeout(updateTimer, 1000);
      } else {
        timerElement.textContent = 'Sale expired';
      }
    };

    updateTimer();
  };
  
  // Check if the sale banner should be shown
  const saleKey = 'saleBannerDisplayed';
  const saleDuration = 15000; // 1 day in milliseconds
  
  // this should happen only one time whenever there is a sale starts
  setItemWithExpiry(saleKey, 'true', saleDuration);
  showSaleBanner();
  // Start the timer
  startTimer(saleDuration); 

  // This interval is just for demo purpose to demonstrate when user revisit page 
  setInterval(()=>{
    if (!getItemWithExpiry(saleKey)) {
      hideSaleBanner();
    }
  },1000)
  