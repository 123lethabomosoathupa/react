import { connect } from "react-redux";
import Cart from "./Cart";

/*
  mapStateToProps:
  Maps the Redux store state to component props.
  This allows the Cart component to access the current state values.
*/
function mapStateToProps(state) {
  return {
    totalCost: state.totalCost,       // Total cost of all products in the cart
    productCart: state.productCart    // Array of products currently in the cart
  };
}

/*
  mapDispatchToProps:
  Maps dispatch actions to component props.
  This allows the Cart component to dispatch actions to update the Redux store.
*/
function mapDispatchToProps(dispatch) {
  return {
    // Action to add a product to the cart
    onAddProduct: (productName, productPrice) => dispatch({
      type: "addProduct",
      productData: {
        productName: productName,
        productPrice: productPrice
      }
    }),

    // Action to delete a product from the cart
    onDeleteProduct: (productData) => dispatch({
      type: "deleteProduct",
      productData: productData
    })
  };
}

/*
  Connect the Cart component to Redux store:
  - mapStateToProps allows it to access the store state
  - mapDispatchToProps allows it to dispatch actions
*/
const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

// Export the connected component
export default connectedComponent;
