// Import React and hooks for state and side effects
import React, { useState, useEffect } from 'react';

// Import axios for making HTTP requests
import axios from 'axios';

// Import a loading spinner component
import ReactLoading from 'react-loading';

// Import Bootstrap components for layout and styling
import { Media, Form, Button, Container, Row, Col } from 'react-bootstrap';

// Define a functional component called GitHub
function GitHub() {

  // State to store GitHub users retrieved from API
  const [data, setData] = useState([]);

  // State to store the search input value
  const [searchTerm, setSearchTerm] = useState("");

  // State to track whether data is loading
  const [isLoading, setIsLoading] = useState(false);

  // useEffect runs when component mounts (empty dependency array [])
  // Calls getData once at the start
  useEffect(() => {
    getData();
  }, []);

  // Function to fetch data from GitHub API
  const getData = async () => {
    try {
      // Make GET request to GitHub users search API
      const res = await axios.get(`https://api.github.com/search/users?q=${searchTerm}`);
      
      // Store the array of user objects in state
      setData(res.data.items);

      // Stop loading spinner
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  // Function to handle form submission
  const handleSubmit = event => {
    event.preventDefault(); // Prevent page reload
    setIsLoading(true);     // Show loading spinner
    getData();              // Fetch users based on searchTerm
  };

  // Map each user object to a Media component for display
  const listUsers = data.map((user) =>
    <Media key={user.id} className="mb-3 p-3 border rounded">
      {/* User avatar linking to their GitHub profile */}
      <a href={user.html_url} target="_blank" rel="noopener noreferrer">
        <img
          width={64}
          height={64}
          className="mr-3 rounded"
          src={user.avatar_url}
          alt={user.login}
        />
      </a>

      {/* Media body contains user information */}
      <Media.Body>
        <h5>Login: {user.login}</h5>
        <p className="mb-0">Id: {user.id}</p>

        {/* Link to view the GitHub profile */}
        <a 
          href={user.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-decoration-none"
        >
          View Profile →
        </a>
      </Media.Body>
    </Media>
  );

  // JSX returned to render the component
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          {/* Page heading */}
          <h2 className="text-center mb-4">GitHub User Search</h2>
          
          {/* Search form */}
          <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group>
              {/* Input field */}
              <Form.Control
                type="text"
                placeholder="Enter GitHub username..."
                onChange={event => setSearchTerm(event.target.value)} // Update searchTerm state
                value={searchTerm}
                size="lg"
              />
            </Form.Group>

            {/* Submit button */}
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 mt-2"
              size="lg"
            >
              Search
            </Button>
          </Form>

          {/* Loading spinner while fetching data */}
          {isLoading && (
            <div className="d-flex justify-content-center my-5">
              <ReactLoading type="spinningBubbles" color="#0d6efd" />
            </div>
          )}

          {/* Show results if not loading and data exists */}
          {!isLoading && data.length > 0 && (
            <>
              <h3 className="mb-3">Search Results ({data.length})</h3>
              {listUsers}
            </>
          )}

          {/* Show message if no users found */}
          {!isLoading && data.length === 0 && searchTerm && (
            <div className="alert alert-info">
              No users found. Try a different search term.
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

// Export the GitHub component so it can be used in App.js
export default GitHub;
