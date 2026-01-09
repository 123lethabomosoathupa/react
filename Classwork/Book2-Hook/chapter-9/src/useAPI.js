import { useState, useEffect } from 'react'; // Import React hooks for state and side effects
import axios from 'axios'; // Import axios for making HTTP requests

// Custom hook to fetch data from a given API endpoint
const useAPI = endpoint => {
  // State to store fetched data
  const [data, setData] = useState([]);

  // useEffect runs when the component mounts or when endpoint changes
  useEffect(() => {
    // Async function to fetch data from the API
    const getData = async () => {
      const response = await axios.get(endpoint); // Send GET request to endpoint
      setData(response.data); // Update state with response data
    };

    getData(); // Call the async function
  }, [endpoint]); // Re-run effect if endpoint value changes

  // Return fetched data to the component using this hook
  return data;
};

export default useAPI; // Export the custom hook
