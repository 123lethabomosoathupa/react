// Import React and Component so we can create a class-based component
import React, { Component } from 'react';

class Products extends Component {

    render() {

        // An array of product names
        const products = ["Learning React", "Pro React", "Beginning React"];

        // Convert each product in the array into an <li> element
        // The map() function loops through the array and returns a new array of list items
        // Each list item gets a unique key (React uses this for efficient rendering)
        const listProducts = products.map((product) =>
            <li key={product.toString()}>{product}</li>
        );

        return (
            <div>
                {/* Render the list of product <li> items inside a <ul> */}
                <ul>{listProducts}</ul>
            </div>
        );
    }
}

// Export the component so it can be used in App.js
export default Products;
