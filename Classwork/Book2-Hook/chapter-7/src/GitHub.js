import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { Media, Form, Button, Container, Row, Col } from 'react-bootstrap';

function GitHub() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const res = await axios.get(`https://api.github.com/search/users?q=${searchTerm}`);
    setData(res.data.items);
    setIsLoading(false);
  }

  const handleSubmit = event => {
    event.preventDefault();
    setIsLoading(true);
    getData();
  }

  const listUsers = data.map((user) =>
    <Media key={user.id} className="mb-3 p-3 border rounded">
      <a href={user.html_url} target="_blank" rel="noopener noreferrer">
        <img
          width={64}
          height={64}
          className="mr-3 rounded"
          src={user.avatar_url}
          alt={user.login}
        />
      </a>
      <Media.Body>
        <h5>Login: {user.login}</h5>
        <p className="mb-0">Id: {user.id}</p>
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

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <h2 className="text-center mb-4">GitHub User Search</h2>
          
          <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter GitHub username..."
                onChange={event => setSearchTerm(event.target.value)}
                value={searchTerm}
                size="lg"
              />
            </Form.Group>
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 mt-2"
              size="lg"
            >
              Search
            </Button>
          </Form>

          {isLoading && (
            <div className="d-flex justify-content-center my-5">
              <ReactLoading type="spinningBubbles" color="#0d6efd" />
            </div>
          )}

          {!isLoading && data.length > 0 && (
            <>
              <h3 className="mb-3">Search Results ({data.length})</h3>
              {listUsers}
            </>
          )}

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

export default GitHub;