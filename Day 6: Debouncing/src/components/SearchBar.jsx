import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // Debounce delay of 1000 milliseconds
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [requests, setRequests] = useState([]);
  const [debouncedRequest, setDebouncedRequest] = useState([]);


  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setRequests((prevRequests) => [...prevRequests, e.target.value]);
  };

  // Simulated API call function
  const fetchSearchResults = (searchTerm) => {
    console.log("Fetching results for:", searchTerm);
    setDebouncedRequest((prevRequests) => [...prevRequests, searchTerm]);
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
      <div style={{ display: "flex", gap: "100px" }}>
        <div>
          <p>Without debounce: {searchTerm}</p>
          <ul>
            <li
              style={{
                listStyleType: "none",
              }}
            >
              {requests.map((request, index) => (
                <p key={index}>Api request for {request}</p>
              ))}
            </li>
          </ul>
        </div>
        <div>
          <p>With debounce: {debouncedSearchTerm}</p>
          <ul>
            <li
              style={{
                listStyleType: "none",
              }}
            >
              {debouncedRequest.map((request, index) => (
                <p key={index}>Api request for {request}</p>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
