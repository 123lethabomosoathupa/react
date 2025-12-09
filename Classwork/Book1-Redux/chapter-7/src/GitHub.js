// Import React and Component for creating a class-based component
import React, { Component } from 'react';
// Import axios for making HTTP requests to the GitHub API
import axios from 'axios';
// Import a loading spinner component
import ReactLoading from 'react-loading';
// Import Bootstrap form and layout components for styling
import { Form, Button, Card, ListGroup, Row, Col } from 'react-bootstrap';

// Define the GitHub class component
class GitHub extends Component {
  constructor(){
    super(); // Call the parent constructor
    // Set the initial component state
    this.state = {
      data: [],       // Will store the list of GitHub users returned by the API
      searchTerm: '', // Text entered into the search input
      isLoading: false // Whether the request is currently loading
    };

    // Bind methods so "this" refers to the component instance
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handles the form submission
  handleSubmit(e) {
    e.preventDefault(); // Prevent page refresh
    this.setState({
      isLoading: true // Show loading spinner
    });
    // Fetch GitHub data using the current search term
    this.getGitHubData(this.state.searchTerm);
  }

  // Handles input value changes
  handleChange(e) {
    // Update state as the user types
    this.setState({ searchTerm: e.target.value });
  }

  // Fetch data from the GitHub API based on the entered search term
  getGitHubData(_searchTerm){
    axios.get("https://api.github.com/search/users?q=" + _searchTerm)
      .then(res => {
        // Update state with results and stop loading spinner
        this.setState({
          isLoading: false,
          data: res.data.items // GitHub returns results in "items"
        });
        console.log(res.data.items); // Log results for debugging
      });
  }

  // Render the UI
  render() {
    // Map the list of GitHub users to Bootstrap cards
    const listUsers = this.state.data.map((user) =>
      <Card key={user.id} className="mb-3">
        <Card.Body>
          <Row>
            <Col xs={2}>
              {/* Link to the user's GitHub profile */}
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                {/* Display the user's avatar image */}
                <img
                  width={64}
                  height={64}
                  src={user.avatar_url}
                  alt={user.login}
                  className="rounded"
                />
              </a>
            </Col>
            <Col xs={10}>
              {/* Show user's login name */}
              <Card.Title>Login: {user.login}</Card.Title>
              {/* Show user's unique ID */}
              <Card.Text>Id: {user.id}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );

    return (
      // Wrapper container with some margin on top
      <div className="container mt-4">

        {/* Search form at the top */}
        <Form onSubmit={this.handleSubmit} className="mb-4">
          <Row>
            <Col xs={8}>
              {/* Input for entering GitHub search keywords */}
              <Form.Control
                type="text"
                value={this.state.searchTerm}
                placeholder="Enter Search Term"
                onChange={this.handleChange}
              />
            </Col>
            <Col xs={4}>
              {/* Search button */}
              <Button type="submit" variant="primary" className="w-100">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        
        {/* Title for results section */}
        <h3>GitHub Users Results</h3>
        
        {/* Display loading spinner while fetching data */}
        {this.state.isLoading &&
          <div className="d-flex justify-content-center">
            <ReactLoading type="spinningBubbles" color="#444" />
          </div>
        }
        
        {/* Render list of users (or nothing if empty) */}
        {listUsers}
      </div>
    );
  }
}

// Export the GitHub component so it can be used elsewhere
export default GitHub;
