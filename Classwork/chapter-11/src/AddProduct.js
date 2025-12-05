import React, { Component } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';

class AddProduct extends Component {
  state = {
    productName: '',
    productPrice: 0
  };

  productNameChangedHandler = (event) => {
    this.setState({ productName: event.target.value });
  };

  productPriceChangedHandler = (event) => {
    this.setState({ productPrice: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.productName && this.state.productPrice > 0) {
      this.props.addProduct(this.state.productName, this.state.productPrice);
      // Clear form after adding
      this.setState({ productName: '', productPrice: 0 });
    }
  };

  render() {
    return (
      <div className="container mt-4">
        <Form onSubmit={this.handleSubmit}>
          <Row>
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