// Import React library to enable JSX
import React from 'react';

// Import the Product component to display individual products
import Product from './Product';

// Define a functional component called Products
function Products() {

  // Function that returns an array of product objects
  const getProducts = () => {
    return [
      {
        imageUrl: "http://loremflickr.com/150/150?random=1", // Product image
        productName: "Product 1",                            // Product name
        releasedDate: "May 31, 2016",                         // Release date
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porttitor, tellus laoreet venenatis facilisis, enim ex faucibus nulla, id rutrum ligula purus sit amet mauris.",
        rating: 4,                                           // Product rating
        numOfReviews: 2                                      // Number of reviews
      },
      {
        imageUrl: "http://loremflickr.com/150/150?random=2",
        productName: "Product 2",
        releasedDate: "October 31, 2016",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porttitor, tellus laoreet venenatis facilisis, enim ex faucibus nulla, id rutrum ligula purus sit amet mauris.",
        rating: 2,
        numOfReviews: 12
      },
      {
        imageUrl: "http://loremflickr.com/150/150?random=3",
        productName: "Product 3",
        releasedDate: "July 30, 2016",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porttitor, tellus laoreet venenatis facilisis, enim ex faucibus nulla, id rutrum ligula purus sit amet mauris.",
        rating: 5,
        numOfReviews: 2
      }
    ];
  };

  // Store the returned product list in a variable
  const products = getProducts();
  
  // Use map() to convert each product object into a Product component
  // The key helps React efficiently update the list
  const listProducts = products.map((product) =>
    <Product key={product.productName} data={product} />
  );

  // Return the JSX that renders the product list
  return (
    <div>
      {/* Display all Product components */}
      <ul>{listProducts}</ul>
    </div>
  );
}

// Export the Products component so it can be used elsewhere
export default Products;
