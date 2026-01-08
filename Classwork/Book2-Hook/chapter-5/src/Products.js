// Import React library to enable JSX
import React from 'react';

// Import the Product component to render individual product details
import Product from './Product';

// Define a functional component called Products
function Products() {

  // Function that returns an array of product objects
  const getProducts = () => {
    return [
      {
        imageUrl: "http://loremflickr.com/150/150?random=1", // Product image
        productName: "Product 1",                            // Name of the product
        releasedDate: "May 31, 2016",                        // Release date
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porttitor, tellus laoreet venenatis facilisis, enim ex faucibus nulla, id rutrum ligula purus sit amet mauris.",
        rating: 4,                                           // Rating value
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

  // Store the returned product list
  const products = getProducts();
  
  // Map each product object to a Product component
  // Key helps React optimize rendering of lists
  const listProducts = products.map((product) =>
    <Product key={product.productName} data={product} />
  );

  // Return JSX with conditional rendering:
  // If there are products, display them; otherwise, show a message
  return (
    <div>
      {listProducts.length > 0 ? (
        <ul>{listProducts}</ul>
      ) : (
        <ul>No Products to display</ul>
      )}
    </div>
  );
}

// Export the Products component so it can be reused
export default Products;
