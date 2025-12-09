// Import core React and required libraries
import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, ListGroup, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class GitHub extends Component {
  constructor() {
    super();
    // Component state holds search results, search term, and loading indicator
    this.state = {
      data: [],         // Stores the list of GitHub users returned from API
      searchTerm: '',   // Stores the current text input
      isLoading: false  // Controls the loading spinner visibility
    };

    // Bind event handlers to `this`
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handles the form submission
  handleSubmit(e) {
    e.preventDefault(); // Prevent page refresh
    this.setState({ isLoading: true }); // Show loading spinner

    // Call GitHub API using search term
    this.getGitHubData(this.state.searchTerm);
  }

  // Updates searchTerm state on input change
  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  // Fetch data from GitHub API based on user search
  getGitHubData(_searchTerm) {
    axios.get("https://api.github.com/search/users?q=" + _searchTerm)
      .then(res => {
        // Update state with response data and stop loading spinner
        this.setState({
          isLoading: false,
          data: res.data.items
        });
        console.log(res.data.items); // Debugging output
      });
  }

  render() {
    // Map through GitHub user list to generate UI items
    const listUsers = this.state.data.map((user) =>
      <ListGroup.Item key={user.id} className="d-flex align-items-center">
        
        {/* Clicking the avatar sends user to GitHubUser detail page */}
        <Link to={`/github/user/${user.login}/${user.id}`}>
          <img
            width={64}
            height={64}
            className="me-3 rounded"
            src={user.avatar_url}
            alt={user.login}
          />
        </Link>

        {/* Display login and id */}
        <div>
          <h5>Login: {user.login}</h5>
          <p className="mb-0">Id: {user.id}</p>
        </div>

      </ListGroup.Item>
    );

    return (
      <div className="container mt-4">

        {/* Search form */}
        <Form onSubmit={this.handleSubmit} className="mb-4">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={this.state.searchTerm}
              placeholder="Enter Search Term"
              onChange={this.handleChange} // update state on typing
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Search
          </Button>
        </Form>

        <h3>GitHub Users Results</h3>

        {/* Loading spinner while fetching */}
        {this.state.isLoading &&
          <div className="d-flex justify-content-center my-4">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        }

        {/* Render list of users */}
        <ListGroup>
          {listUsers}
        </ListGroup>

      </div>
    );
  }
}

export default GitHub;
