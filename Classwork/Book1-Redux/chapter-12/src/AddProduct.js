import React, { Component } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';

class AddProduct extends Component {
  // Component state to store form input values
  state = {
    productName: '',  // Name of the product
    productPrice: 0   // Price of the product
  };

  // Handler for changes in the product name input
  productNameChangedHandler = (event) => {
    this.setState({ productName: event.target.value });
  };

  // Handler for changes in the product price input
  productPriceChangedHandler = (event) => {
    this.setState({ productPrice: event.target.value });
  };

  // Handle form submission
  handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Only submit if product name exists and price > 0
    if (this.state.productName && this.state.productPrice > 0) {
      // Call the addProduct function passed as a prop
      this.props.addProduct(this.state.productName, this.state.productPrice);

      // Clear form fields after successful submission
      this.setState({ productName: '', productPrice: 0 });
    }
  };

  render() {
    return (
      <div className="container mt-4">
        {/* Product Form */}
        <Form onSubmit={this.handleSubmit}>
          <Row>
            {/* Product Name Input */}
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Product Name"
                  onChange={this.productNameChangedHandler}
                  value={this.state.productName}
                />
              </Form.Group>
            </Col>

            {/* Product Price Input */}
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Product Price"
                  onChange={this.productPriceChangedHandler}
                  value={this.state.productPrice}
                />
              </Form.Group>
            </Col>

            {/* Submit Button */}
            <Col md={4}>
              <Button 
                variant="primary" 
                type="submit"
                className="w-100">
                Add Product
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default AddProduct;
