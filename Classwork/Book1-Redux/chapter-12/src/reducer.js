// Redux reducer to manage the shopping cart state
function cartReducer(state, action) {
  // Initial state: when state is undefined (first run)
  if (state === undefined) {
    return {
      totalCost: 0,      // Total cost of all products in the cart
      productCart: []    // Array of products added to the cart
    };
  }

  // Handle different action types
  switch (action.type) {

    // Add a product to the cart
    case "addProduct":
      return {
        ...state, // Keep existing state properties
        totalCost: state.totalCost + parseInt(action.productData.productPrice), // Update total cost
        productCart: state.productCart.concat({ // Add the new product
          productName: action.productData.productName,
          productPrice: action.productData.productPrice
        })
      };

    // Delete a product from the cart
    case "deleteProduct":
      // Remove the product from the cart array by filtering
      const updatedArray = state.productCart.filter(
        product => product.productName !== action.productData.productName
      );

      return {
        ...state, // Keep other state properties
        totalCost: state.totalCost - parseInt(action.productData.productPrice), // Update total cost
        productCart: updatedArray // Update the cart array
      };

    // Default: return current state if action type is unrecognized
    default:
      return state;
  }
}

export default cartReducer;
