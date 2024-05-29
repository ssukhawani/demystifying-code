// Helper function to set an item in localStorage with an expiry time
function setItemWithExpiry(key, value, expiryTime) {
    // Get the current time in milliseconds
    const now = Date.now();
    
    // Create an object with the value and the expiry time
    const item = {
      value: value,       // Store the actual value
      expiry: now + expiryTime, // Calculate and store the expiry time
    };
    
    // Save the item to localStorage after converting it to a JSON string
    localStorage.setItem(key, JSON.stringify(item));
}


// Helper function to get an item from localStorage considering expiry time
function getItemWithExpiry(key) {
    // Retrieve the item from localStorage
    const itemStr = localStorage.getItem(key);
    
    // If the item does not exist, return null
    if (!itemStr) {
      return null;
    }
  
    // Parse the JSON string back into an object & get current time in milliseconds
    const item = JSON.parse(itemStr);
    const now = Date.now();
    
    // Check if the item has expired
    if (now > item.expiry) {
      // If the item has expired, remove it from localStorage & return null
      localStorage.removeItem(key);
      return null; 
    }
  
    // If the item has not expired, return the value
    return item.value;
  }