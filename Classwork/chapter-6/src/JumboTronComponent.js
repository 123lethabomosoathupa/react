import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';

class JumboTronComponent extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Container fluid className="p-5 mb-4 bg-light rounded-3">
          <Container className="py-5">
            <h1 className="display-5 fw-bold">Hello, world!</h1>
            <p className="col-md-8 fs-4">{this.props.children}</p>
            <Button variant="primary">Learn more</Button>
          </Container>
        </Container>
      </div>
    );
  }
}

export default JumboTronComponent;