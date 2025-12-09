import React, { Component } from "react";
import AddProduct from './AddProduct';
import { Table } from 'react-bootstrap';

class Cart extends Component {
  render() {
    return (
      <div className="container mt-4">
        {/* Page Title */}
        <h2>Shopping Cart</h2>
        
        {/* AddProduct Component
            - Receives 'addProduct' prop to add new products to Redux store */}
        <AddProduct addProduct={this.props.onAddProduct} />
        
        {/* Table to display products in the cart */}
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through productCart array from Redux state */}
            {this.props.productCart.map(productData => (
              <tr key={productData.productName}>
                <td>{productData.productName}</td>
                <td>${productData.productPrice}</td>

                {/* Remove button dispatches onDeleteProduct action */}
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
        
        {/* Display total cost of products in the cart */}
        <h4>Total Amount: ${this.props.totalCost}</h4>
      </div>
    );
  }
}

export default Cart;
