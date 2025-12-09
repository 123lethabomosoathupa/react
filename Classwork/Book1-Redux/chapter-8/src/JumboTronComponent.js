import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';

class JumboTronComponent extends Component {
  constructor(props){
    super(props);
    // No state needed — this component only receives props
  }

  render() {
    return (
      <div>
        {/* Outer fluid container creates a full-width jumbotron-style section */}
        <Container fluid className="p-5 mb-4 bg-light rounded-3">

          {/* Inner container centers the content and gives padding */}
          <Container className="py-5">

            {/* Main heading of the jumbotron */}
            <h1 className="display-5 fw-bold">Hello, world!</h1>

            {/* Paragraph displays whatever content is passed as children */}
            <p className="col-md-8 fs-4">
              {this.props.children}
            </p>

            {/* Call-to-action button */}
            <Button variant="primary">Learn more</Button>

          </Container>
        </Container>
      </div>
    );
  }
}

export default JumboTronComponent;
