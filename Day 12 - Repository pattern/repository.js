import axios from 'axios';

// Generic Repository Class
class Repository {
  constructor(endpoint) {
    // The API endpoint for the services
    this.endpoint = endpoint; 
  }

  // Perform GET request
  async get(id) {
    const url = id ? `${this.endpoint}${id}` : `${this.endpoint}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return this.onError(error);
    }
  }

  // Perform POST request
  async post(data) {
    try {
      const response = await axios.post(this.endpoint, data);
      return response.data;
    } catch (error) {
      return this.onError(error);
    }
  }

  // Perform PUT request
  async put(id, data) {
    const url = `${this.endpoint}${id}`;
    try {
      const response = await axios.put(url, data);
      return response.data;
    } catch (error) {
      return this.onError(error);
    }
  }

  // Perform DELETE request
  async delete(id) {
    const url = `${this.endpoint}${id}`;
    try {
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      return this.onError(error);
    }
  }

  // ....you can add other methods as well here

  // Default error handling method
  // Override this method in child classes for custom error handling
  onError(error) {
    throw error;
  }
}

export default Repository;
