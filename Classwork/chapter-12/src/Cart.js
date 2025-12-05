import React, { Component } from "react";
import AddProduct from './AddProduct';
import { Table } from 'react-bootstrap';

class Cart extends Component {
  render() {
    return (
      <div className="container mt-4">
        <h2>Shopping Cart</h2>
        
        <AddProduct addProduct={this.props.onAddProduct} />
        
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.productCart.map(productData => (
              <tr key={productData.productName}>
                <td>{productData.productName}</td>
                <td>${productData.productPrice}</td>
                <td>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => this.props.onDeleteProduct(productData)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        <h4>Total Amount: ${this.props.totalCost}</h4>
      </div>
    );
  }
}

export default Cart;