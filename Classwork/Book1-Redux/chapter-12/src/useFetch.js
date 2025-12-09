import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch data from a given URL
 * @param {string} url - The API endpoint to fetch data from
 * @returns {Array} data - The fetched data as an array
 */
const useFetch = (url) => {
  // State to store fetched data
  const [data, setData] = useState([]);

  // useEffect runs whenever the URL changes
  useEffect(() => {
    // Fetch data from the API
    fetch(url)
      .then(response => response.json()) // Parse JSON response
      .then(data => setData(data));      // Store data in state
  }, [url]); // Re-run effect when URL changes

  // Return the fetched data
  return data;
};

export default useFetch;
