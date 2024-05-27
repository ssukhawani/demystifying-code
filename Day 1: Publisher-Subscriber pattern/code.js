class Event {
  constructor() {
    // Initialize an array to store event handlers
    this.eventHandlers = [];
  }

  // Method to subscribe event handlers
  subscribe(eventHandler) {
    // Add the event handler to the array
    this.eventHandlers.push(eventHandler);
  }

  // Method to unsubscribe event handlers
  unsubscribe(eventHandler) {
    // Filter out the event handler to be removed
    this.eventHandlers = this.eventHandlers.filter(
      (item) => item !== eventHandler,
    );
  }

  // Method to fire events and execute event handlers
  fire(arg, thisObject) {
    // Determine the execution context (default to window)
    let scope = thisObject || window;

    // Iterate over each event handler
    this.eventHandlers.forEach((handler) => {
      // Call the event handler with the specified execution context and argument
      handler.call(scope, arg);
    });
  }
}


// Event handlers for different components
const updateCartDisplay = (item) => {
  console.log("Cart updated: Item added to cart:", item);
};

const updateInventory = (item) => {
  console.log("Inventory updated: Stock decreased for item:", item);
};

const calculateCartPricing = (item) => {
  console.log("Cart pricing updated for item:", item);
};

const notifyUser = (item) => {
  console.log("User notified: Item added to cart:", item);
};

// Create an Event instance
const cartEvent = new Event();

// Subscribe handlers to the event
cartEvent.subscribe(updateCartDisplay);
cartEvent.subscribe(updateInventory);
cartEvent.subscribe(calculateCartPricing);
cartEvent.subscribe(notifyUser);

// Fire the event when an item is added to the cart
const newItem = { id: 1, name: "Laptop", price: 172000 };
cartEvent.fire(newItem);