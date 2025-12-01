import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { Form, Button, Card, ListGroup, Row, Col } from 'react-bootstrap';

class GitHub extends Component {
  constructor(){
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

  getGitHubData(_searchTerm){
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
      <Card key={user.id} className="mb-3">
        <Card.Body>
          <Row>
            <Col xs={2}>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
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
              <Card.Title>Login: {user.login}</Card.Title>
              <Card.Text>Id: {user.id}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );

    return (
      <div className="container mt-4">
        <Form onSubmit={this.handleSubmit} className="mb-4">
          <Row>
            <Col xs={8}>
              <Form.Control
                type="text"
                value={this.state.searchTerm}
                placeholder="Enter Search Term"
                onChange={this.handleChange}
              />
            </Col>
            <Col xs={4}>
              <Button type="submit" variant="primary" className="w-100">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        
        <h3>GitHub Users Results</h3>
        
        {this.state.isLoading &&
          <div className="d-flex justify-content-center">
            <ReactLoading type="spinningBubbles" color="#444" />
          </div>
        }
        
        {listUsers}
      </div>
    );
  }
}

export default GitHub;