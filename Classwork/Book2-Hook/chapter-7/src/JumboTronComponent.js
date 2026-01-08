// Import React and Component class for creating a class-based component
import React, { Component } from 'react';

// Import Bootstrap components for layout and styling
import { Container, Button } from 'react-bootstrap';

// Define a class-based component called JumboTronComponent
class JumboTronComponent extends Component {

  // Constructor method (optional here since we are not using state)
  constructor(props){
    super(props); // Call the parent class constructor to initialize props
  }

  // Render method returns the JSX to display
  render() {
    return (
      <div>
        {/* Outer container with Bootstrap styling */}
        <Container fluid className="p-5 mb-4 bg-light rounded-3">
          
          {/* Inner container to align content */}
          <Container className="py-5">
            
            {/* Main heading */}
            <h1 className="display-5 fw-bold">Hello, world!</h1>

            {/* Paragraph text passed as children from parent component */}
            <p className="col-md-8 fs-4">{this.props.children}</p>

            {/* A Bootstrap button */}
            <Button variant="primary">Learn more</Button>
          </Container>
        </Container>
      </div>
    );
  }
}

// Export the component so it can be used in other files
export default JumboTronComponent;
