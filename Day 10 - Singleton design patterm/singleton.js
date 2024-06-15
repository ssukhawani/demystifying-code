class Singleton {
  constructor() {
    // Check if an instance already exists
    if (Singleton.instance) {
      // If an instance already exists, return the existing instance
      return Singleton.instance;
    }

    // If no instance exists, initialize this instance
    this.name = "I am the instance";
    
    // And make singleton instance refer to this object
    Singleton.instance = this;
  }
}


// Example usage:
document.getElementById('get-instance-btn').addEventListener('click', () => {
  try {
    // Attempt to get two instances of the Singleton class
    const instance1 = new Singleton();
    const instance2 = new Singleton();

    // Display the instances in the result div
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
      <p>Instance 1: ${instance1.name}</p>
      <p>Instance 2: ${instance2.name}</p>
      <p>Are both instances the same? ${instance1 === instance2}</p>
    `;
  } catch (error) {
    console.error(error.message);
  }
});
