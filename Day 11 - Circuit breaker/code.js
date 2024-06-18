class CircuitBreaker {
    constructor(service, failureThreshold = 3, timeout = 3000) {
      this.service = service; // The service we want to protect
      this.failureThreshold = failureThreshold; // Number of failures allowed
      this.timeout = timeout; // Timeout period to keep calls blocked
  
      
      this.state = 'CLOSED'; // Initial state of the circuit
      this.failureCount = 0; // Count of failures
      this.nextAttempt = Date.now(); // Timestamp for next allowed attempt in OPEN state
    }
  
    async callService(request) {
      if (this.state === 'OPEN') {
        // If the state is OPEN the check next attempt time passed or not
        if (Date.now() > this.nextAttempt) {
          // if time is passed then make state to HALF_OPEN else throw error
          this.state = 'HALF';
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
      console.log('Circuit is OPEN. Service calls are paused.');
    }
  
    reset() {
      this.state = 'CLOSED';
      this.failureCount = 0; // Reset failure count
      console.log('Circuit is CLOSED. Service calls are resumed.');
    }
  }
  