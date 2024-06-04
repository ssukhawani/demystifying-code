// The target object that we want to proxy
const person = { name: "John Doe", age: 30, occupation: "Developer" };

// The handler object contains methods to intercept operations 
// on the person object
const handler = {
  // The get method intercepts property access on the person object
  get(target, prop) {
    console.log(`Accessing property: ${prop}`);
    // Return the value of the property from the person object
    return target[prop];
  },

  // The set method intercepts property assignment on the person object
  set(target, prop, value) {
    console.log(`Updating property: ${prop} to ${value}`);
    // Set the property value on the person object
    target[prop] = value;
    // Indicate that the assignment was successful
    return true;
  },
};

// Create a Proxy object that wraps the person object with the handler
const personalAssistant = new Proxy(person, handler);

// Accessing a property (triggers the get method)
console.log(personalAssistant.name); 
// Output: Accessing property: name
// John Doe

// Setting a property (triggers the set method)
personalAssistant.age = 31; 
// Output: Updating property: age to 31

// Accessing the updated property
console.log(personalAssistant.age); 
// Output: Accessing property: age
// 31

/*
  Explanation:
  1. `person`: The target object representing a person with some personal information.
  
  2. `handler`: The handler object defines methods to intercept operations on the person object.
     - The `get` method logs and returns the value of the accessed property.
     - The `set` method logs and updates the value of the property being set.
  
  3. `personalAssistant`: The Proxy object that wraps the `person` object with the `handler`.
  
  4. When accessing properties like `personalAssistant.name`, the `get` method is triggered, logging the access and returning the value.
  5. When setting properties like `personalAssistant.age`, the `set` method is triggered, logging the update and changing the value on the target object.
  */
