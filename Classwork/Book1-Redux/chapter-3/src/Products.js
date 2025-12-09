// Import React and Component to create a class-based component
import React, { Component } from 'react';

class Products extends Component {

    render() {

        // An array of product names
        const products = ["Learning React", "Pro React", "Beginning React"];

        /*
            Convert the array of strings into <li> elements.
            - products.map(...) loops through each item in the array
            - For each product, we return an <li> element
            - key={...} is required by React to help track list items efficiently
        */
        const listProducts = products.map((product) =>
            <li key={product.toString()}>{product}</li>
        );

        return (
            <div>
                {/* Display the list inside an unordered list */}
                <ul>{listProducts}</ul>
            </div>
        );
    }
}

// Export the component so it can be used in App.js
export default Products;
