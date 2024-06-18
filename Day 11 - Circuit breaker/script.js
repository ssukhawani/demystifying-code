class CircuitBreaker {
    constructor(service, failureThreshold = 3, timeout = 3000) {
      this.service = service; // The service we want to protect
      this.failureThreshold = failureThreshold; // Number of failures allowed before opening the circuit
      this.timeout = timeout; // Timeout period before moving to HALF-OPEN state
  
      this.state = 'CLOSED'; // Initial state of the circuit
      this.failureCount = 0; // Count of failures
      this.nextAttempt = Date.now(); // Timestamp for next allowed attempt in OPEN state
    }
  
    async callService(request) {
      if (this.state === 'OPEN') {
        if (Date.now() > this.nextAttempt) {
          this.state = 'HALF'; // Transition to HALF-OPEN state
          this.updateStatusIndicator();
        } else {
          throw new Error('Service is currently unavailable. Please try again later.');
        }
      }
  
      try {
        const response = await this.service(request);
        this.reset(); // On successful call, reset the circuit
        return response;
      } catch (error) {
        this.failureCount++; // On failure, increment the failure count
        if (this.failureCount >= this.failureThreshold) {
          this.trip(); // Open the circuit if failure threshold is reached
        }
        throw error;
      }
    }
  
    trip() {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
      this.failureCount = 0; // Reset failure count
      this.updateStatusIndicator();
      console.log('Circuit is OPEN. Service calls are paused.');
    }
  
    reset() {
      this.state = 'CLOSED';
      this.failureCount = 0; // Reset failure count
      this.updateStatusIndicator();
      console.log('Circuit is CLOSED. Service calls are resumed.');
    }
  
    updateStatusIndicator() {
      const statusIndicator = document.getElementById('status-indicator');
      const statusText = document.getElementById('status');
      statusText.textContent = `Status: ${this.state} ${this.state === 'OPEN' ? "_/ _":"___"}`;
      statusIndicator.className = this.state.toLowerCase();
    }
  }
  

// Mock Service Function
const mockService = async (request) => {
  // Simulate a service call with 60% chance of failure
  if (Math.random() > 0.6) {
    return `Success! (${request})`;
  } else {
    throw new Error("Service failed!");
  }
};

// Instantiate Circuit Breaker with mock service
const circuitBreaker = new CircuitBreaker(mockService);

const simulateServiceCalls = async () => {
  try {
    // Attempt to call the service
    const response = await circuitBreaker.callService(`Request ${i + 1}`);
    logResult(response);
  } catch (error) {
    logResult(error.message);
  }
};

let i = 0;
const testFunctions = () => {
  let interval = setInterval(()=>{
    simulateServiceCalls()
      i++
      if(i == 30) {
          clearInterval(interval)
      }
  },1000)
}

// Add event listener to button for interactive demo
document
  .getElementById("call-service-btn")
  .addEventListener("click", testFunctions);

// Logs the result of service calls to the UI.
const logResult = (message) => {
  const resultDiv = document.getElementById("result");
  const p = document.createElement("p");
  p.textContent = message;
  resultDiv.appendChild(p);
};
