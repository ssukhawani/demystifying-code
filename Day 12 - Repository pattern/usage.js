import CategoryService from './categoryService';

const categoryService = new CategoryService();

// Example Usage
const exampleUsage = async () => {
  try {
    // Fetch all categories
    const categories = await categoryService.get();
    console.log('Fetched categories:', categories);

    // Fetch a single category by ID
    const category = await categoryService.get(1);
    console.log('Fetched category:', category);

    // Create a new category
    const newCategory = await categoryService.post({ name: 'New Category' });
    console.log('Created category:', newCategory);

    // Update an existing category
    const updatedCategory = await categoryService.put(1, { name: 'Updated Category' });
    console.log('Updated category:', updatedCategory);

    // Delete a category
    const deletedCategory = await categoryService.delete(1);
    console.log('Deleted category:', deletedCategory);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
