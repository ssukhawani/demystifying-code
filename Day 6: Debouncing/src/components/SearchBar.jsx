import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Debounce delay of 1000 milliseconds
  const debouncedSearchTerm = useDebounce(searchTerm, 1000); 

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Simulated API call function
  const fetchSearchResults = (searchTerm) => {
    console.log('Fetching results for:', searchTerm);
    // Perform actual API call here...
  };

  // Trigger the API call when the debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchResults(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <p>Search term: {searchTerm}</p>
      <p>Debounced search term: {debouncedSearchTerm}</p>
    </div>
  );
};

export default SearchBar;
