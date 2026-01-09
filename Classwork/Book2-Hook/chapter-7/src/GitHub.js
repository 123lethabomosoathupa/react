// Import React and required hooks for state management and side effects
import React, { useEffect, useState } from 'react';

// Import axios for making HTTP requests
import axios from 'axios';

// Import loading spinner component
import ReactLoading from 'react-loading';

// Import Bootstrap components for UI layout
import { Card, ListGroup } from 'react-bootstrap'; // Changed from Media

// GitHub functional component
function GitHub() {
  // State to store fetched GitHub user data
  const [data, setData] = useState([]);

  // State to store the search input value
  const [searchTerm, setSearchTerm] = useState("");

  // State to control loading spinner visibility
  const [isLoading, setIsLoading] = useState(false);

  // useEffect runs once when the component mounts
  useEffect(() => {
    getData();
  }, []); // Empty dependency array ensures this runs only once

  // Function to fetch data from GitHub API
  const getData = async () => {
    // Send GET request to GitHub search users API
    const res = await axios.get(
      `https://api.github.com/search/users?q=${searchTerm || 'greg'}`
    );

    // Update state with fetched users
    setData(res.data.items);

    // Stop loading spinner
    setIsLoading(false);
  };

  // Handle form submission
  const handleSubmit = event => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Show loading spinner
    setIsLoading(true);

    // Fetch users based on search term
    getData();
  };

  // Map over users data to create list items
  const listUsers = data.map((user) => (
    <ListGroup.Item key={user.id} className="d-flex align-items-center">
      {/* Link to the user's GitHub profile */}
      <a href={user.html_url} target="_blank" rel="noopener noreferrer">
        <img
          width={64}
          height={64}
          className="me-3 rounded"
          src={user.avatar_url}
          alt={user.login}
        />
      </a>

      {/* User details */}
      <div>
        <h5 className="mb-1">Login: {user.login}</h5>
        <p className="mb-0">Id: {user.id}</p>
      </div>
    </ListGroup.Item>
  ));

  // Component UI
  return (
    <div className="container mt-4">
      {/* Search form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          {/* Search input field */}
          <input
            type="text"
            className="form-control"
            placeholder="Search GitHub users..."
            onChange={event => setSearchTerm(event.target.value)}
            value={searchTerm}
          />

          {/* Submit button */}
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      {/* Section heading */}
      <h3>GitHub Users Results</h3>

      {/* Loading spinner shown while data is being fetched */}
      {isLoading && (
        <div className="d-flex justify-content-center my-4">
          <ReactLoading type="spinningBubbles" color="#444" />
        </div>
      )}

      {/* Display list of users */}
      <ListGroup>
        {listUsers}
      </ListGroup>
    </div>
  );
}

// Export the GitHub component for use in other files
export default GitHub;
