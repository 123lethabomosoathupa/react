import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, ListGroup, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class GitHub extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      searchTerm: '',
      isLoading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isLoading: true
    });
    this.getGitHubData(this.state.searchTerm);
  }

  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  getGitHubData(_searchTerm) {
    axios.get("https://api.github.com/search/users?q=" + _searchTerm)
      .then(res => {
        this.setState({
          isLoading: false,
          data: res.data.items
        });
        console.log(res.data.items);
      });
  }

  render() {
    const listUsers = this.state.data.map((user) =>
      <ListGroup.Item key={user.id} className="d-flex align-items-center">
        <Link to={`/github/user/${user.login}/${user.id}`}>
          <img
            width={64}
            height={64}
            className="me-3 rounded"
            src={user.avatar_url}
            alt={user.login}
          />
        </Link>
        <div>
          <h5>Login: {user.login}</h5>
          <p className="mb-0">Id: {user.id}</p>
        </div>
      </ListGroup.Item>
    );

    return (
      <div className="container mt-4">
        <Form onSubmit={this.handleSubmit} className="mb-4">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={this.state.searchTerm}
              placeholder="Enter Search Term"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Search
          </Button>
        </Form>

        <h3>GitHub Users Results</h3>

        {this.state.isLoading &&
          <div className="d-flex justify-content-center my-4">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        }

        <ListGroup>
          {listUsers}
        </ListGroup>
      </div>
    );
  }
}

export default GitHub;