import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';

class Product extends Component {
    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.data.imageUrl} />

                    <Card.Body>
                        <Card.Title>{this.props.data.productName}</Card.Title>

                        {this.props.data.releasedDate}

                        <Rating
                            rating={this.props.data.rating}
                            numOfReviews={this.props.data.numOfReviews}
                        />

                        <p><strong>Views:</strong> {this.props.data.numOfViews}</p>
                        <p><strong>Reviews:</strong>{this.props.data.numOfReviews}</p>
                        <Card.Text>
                            {this.props.data.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Product;
