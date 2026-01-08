// Import React library to enable JSX
import React from 'react';

// Define a functional component called Products
function Products() {

  // Create an array of product names
  const products = [
    "Learning React",
    "Pro React",
    "Beginning React"
  ];
  
  // Use the map() method to convert each product into a list item (<li>)
  // Each list item must have a unique key for React's rendering optimization
  const listProducts = products.map((product) =>
    <li key={product.toString()}>{product}</li>
  );

  // Return the JSX that will be displayed on the page
  return (
    <div>
      {/* Heading for the Products section */}
      <h2>Products</h2>

      {/* Unordered list that displays all products */}
      <ul>{listProducts}</ul>
    </div>
  );
}

// Export the Products component so it can be used in other files
export default Products;
