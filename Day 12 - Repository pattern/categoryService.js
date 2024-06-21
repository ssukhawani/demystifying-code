import Repository from './repository';

// Endpoint for category service
const CATEGORY_SERVICE_ENDPOINT = 'https://api.example.com/categories/';

// Category Service
class CategoryService extends Repository {
  constructor() {
    // Here we use the endpoint specific to the category service
    super(CATEGORY_SERVICE_ENDPOINT);
  }

  // ..here you can override the Get, Post, Put, Delete methods as well

  // Override the onError method for customized error handling
  async onError(error) {
    // Custom error handling logic specific to Category
    // Perform additional actions or return custom error responses
    console.error('Error occurred in CategoryService:', error);
    throw error;
  }
}

export default CategoryService;
