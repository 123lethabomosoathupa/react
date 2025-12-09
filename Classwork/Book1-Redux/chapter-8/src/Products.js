// Import React and Component for creating a class-based component
import React, { Component } from 'react';

// Import the Product component to display individual products
import Product from './Product';

class Products extends Component {

    constructor(props) {
        super(props);

        // Initialize products array by calling getProducts()
        this.products = this.getProducts();
    }

    /*
        getProducts():
        - Returns an array of product objects
        - Each product contains: imageUrl, productName, releasedDate, description, rating, numOfReviews, numOfViews
    */
    getProducts() {
        return [
            {
                imageUrl: "http://loremflickr.com/150/150?random=1",
                productName: "Product 1",
                releasedDate: "May 31, 2016",
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Aenean porttitor, tellus laoreet venenatis facilisis, enim ex faucibus nulla, id
rutrum ligula purus sit amet mauris.`,
                rating: 4,
                numOfReviews: 2,
                numOfViews: 150
            },
            {
                imageUrl: "http://loremflickr.com/150/150?random=2",
                productName: "Product 2",
                releasedDate: "October 31, 2016",
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Aenean porttitor, tellus laoreet venenatis facilisis, enim ex faucibus nulla, id
rutrum ligula purus sit amet mauris.`,
                rating: 2,
                numOfReviews: 12,
                numOfViews: 380
            },
            {
                imageUrl: "http://loremflickr.com/150/150?random=3",
                productName: "Product 3",
                releasedDate: "July 30, 2016",
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Aenean porttitor, tellus laoreet venenatis facilisis, enim ex faucibus nulla, id
rutrum ligula purus sit amet mauris.`,
                rating: 5,
                numOfReviews: 2,
                numOfViews: 90
            }
        ];
    }

    render() {
        // Map over products array and create a Product component for each product
        // Each Product receives its data via props
        const listProducts = this.products.map((product) =>
            <Product key={product.productName} data={product} />
        );

        return (
            // Outer container to center the product list
            <div style={{ display: "flex", justifyContent: "center" }}>

                {/* 
                    Product list displayed using a flexbox layout
                    - listStyle: none → removes default bullets
                    - padding: 0 → removes default padding
                    - display: flex → arranges products horizontally
                    - gap: 20px → spacing between products
                    - justifyContent: center → center align
                    - flexWrap: wrap → wraps products to next line if needed
                */}
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        display: "flex",
                        gap: "20px",
                        justifyContent: "center",
                        flexWrap: "wrap"
                    }}
                >
                    {listProducts}
                </ul>
            </div>
        );
    }
}

// Export the Products component to be used in App.js
export default Products;
