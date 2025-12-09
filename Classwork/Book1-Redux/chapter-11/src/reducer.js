// cartReducer handles the state of the shopping cart
function cartReducer(state, action) {
  // Initial state: when state is undefined (first run)
  if (state === undefined) {
    return {
      totalCost: 0,      // Total cost of all products in the cart
      productCart: []    // Array to store products added to the cart
    };
  }

  // Handle different action types
  switch (action.type) {

    // Add a new product to the cart
    case "addProduct":
      return {
        ...state, // Keep existing state properties
        totalCost: state.totalCost + parseInt(action.productData.productPrice), // Update total cost
        productCart: state.productCart.concat({ // Add new product to cart array
          productName: action.productData.productName,
          productPrice: action.productData.productPrice
        })
      };

    // Delete a product from the cart
    case "deleteProduct":
      // Filter out the product that matches the name of the product to delete
      const updatedArray = state.productCart.filter(product =>
        product.productName !== action.productData.productName
      );

      return {
        ...state, // Keep other state properties
        totalCost: state.totalCost - parseInt(action.productData.productPrice), // Subtract its price
        productCart: updatedArray // Update cart array
      };

    // Default case: return current state if action type is unrecognized
    default:
      return state;
  }
}

export default cartReducer;
