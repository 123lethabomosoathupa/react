// Import React and Component class for creating a class-based component
import React, { Component } from 'react';
// Import Container and Button components from react-bootstrap for layout and styling
import { Container, Button } from 'react-bootstrap';

// Define the JumboTronComponent class
class JumboTronComponent extends Component {
  // Constructor receives props from parent
  constructor(props){
    super(props); // Pass props to the parent class (Component)
  }

  // Render method determines what is displayed on the screen
  render() {
    return (
      // Wrapper div for the whole jumbotron section
      <div>
        {/* Outer container: full width, padding, margin, light background, rounded edges */}
        <Container fluid className="p-5 mb-4 bg-light rounded-3">
          
          {/* Inner container: adds vertical padding */}
          <Container className="py-5">
            
            {/* Main headline text */}
            <h1 className="display-5 fw-bold">Hello, world!</h1>
            
            {/* Paragraph showing the content passed from the parent via props.children */}
            <p className="col-md-8 fs-4">{this.props.children}</p>
            
            {/* Bootstrap button with primary styling */}
            <Button variant="primary">Learn more</Button>
          
          </Container>
        </Container>
      </div>
    );
  }
}

// Export the component so it can be used in other files
export default JumboTronComponent;
