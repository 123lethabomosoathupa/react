import { useState, useEffect } from 'react';
import axios from 'axios';

const useAPI = endpoint => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(endpoint);
      setData(response.data);
    };
    getData();
  }, [endpoint]); // Add endpoint to dependency array

  return data;
};

export default useAPI;