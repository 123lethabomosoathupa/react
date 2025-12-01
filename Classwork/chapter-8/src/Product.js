// Import React and Component to create a class-based component
import React, { Component } from 'react';

// Import Card component from React Bootstrap for styled card layout
import Card from 'react-bootstrap/Card';

// Import Rating component to display product rating
import Rating from './Rating';

class Product extends Component {
    render() {
        return (
            <div>
                {/* Bootstrap Card container with a fixed width */}
                <Card style={{ width: '18rem' }}>

                    {/* Product image at the top of the card */}
                    <Card.Img 
                        variant="top" 
                        src={this.props.data.imageUrl} 
                    />

                    {/* Card body contains product details */}
                    <Card.Body>

                        {/* Product name as card title */}
                        <Card.Title>{this.props.data.productName}</Card.Title>

                        {/* Release date of the product */}
                        {this.props.data.releasedDate}

                        {/* Display the product rating using the Rating component */}
                        <Rating
                            rating={this.props.data.rating}
                            numOfReviews={this.props.data.numOfReviews}
                        />

                        {/* Display additional product details */}
                        <p><strong>Views:</strong> {this.props.data.numOfViews}</p>
                        <p><strong>Reviews:</strong> {this.props.data.numOfReviews}</p>

                        {/* Product description */}
                        <Card.Text>
                            {this.props.data.description}
                        </Card.Text>

                    </Card.Body>
                </Card>
            </div>
        );
    }
}

// Export Product component to be used in other parts of the app
export default Product;
