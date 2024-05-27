// Event class definition
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
    let cartBadge = document.getElementById('cartBadge');
    let cartCount = parseInt(cartBadge.textContent);
    cartBadge.textContent = cartCount + 1;

    // Trigger animation
    let element = document.getElementById('updateCartDisplay');
    element.classList.add('show');
    setTimeout(() => { element.classList.remove('show'); }, 2000);
};

const updateInventory = (item) => {
    let stock = document.getElementById('stock');
    let stockCount = parseInt(stock.textContent);
    stock.textContent = stockCount - 1;

    // Trigger animation
    let element = document.getElementById('inventoryManagement');
    element.classList.add('show');
    setTimeout(() => { element.classList.remove('show'); }, 2000);
};

const calculateCartPricing = (item) => {
    let cartTotal = document.getElementById('cartTotal');
    let currentTotal = parseFloat(cartTotal.textContent);
    cartTotal.textContent = (currentTotal + item.price).toFixed(2);

    // Trigger animation
    let element = document.getElementById('calculatePricing');
    element.classList.add('show');
    setTimeout(() => { element.classList.remove('show'); }, 2000);
};

const notifyUser = (item) => {
    let toast = document.getElementById('toast');
    toast.className = 'toast show';
    setTimeout(function() { toast.className = toast.className.replace('show', ''); }, 2000);

    // Trigger animation
    let element = document.getElementById('userNotification');
    element.classList.add('show');
    setTimeout(() => { element.classList.remove('show'); }, 2000);
};

// Create an Event instance
const cartEvent = new Event();

// Subscribe handlers to the event
cartEvent.subscribe(updateCartDisplay);
cartEvent.subscribe(updateInventory);
cartEvent.subscribe(calculateCartPricing);
cartEvent.subscribe(notifyUser);

document.getElementById('addToCartBtn').addEventListener('click', function() {
    // Fire the event when an item is added to the cart
    const newItem = { id: 1, name: "Laptop", price: 170000 }; // Adjusted the price to match the original example
    cartEvent.fire(newItem);
});
