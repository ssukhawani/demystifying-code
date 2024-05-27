// Simulating user subscription status
const user = {
    isSubscribed: false
  };
  
  // Proxy object to check subscription status before accessing premium content
  const premiumContentProxy = new Proxy(user, {
    get(target, prop) {
      if (prop === 'isSubscribed' && !target[prop]) {
        alert('You need a valid subscription to access premium content!');
        return false;
      }
      return Reflect.get(...arguments);
    }
  });
  
  // Accessing premium content
  document.getElementById('premiumButton').addEventListener('click', function() {
    if (premiumContentProxy.isSubscribed) {
      alert('Accessing premium content...');
      // Code to display premium content
    }
  });
  