// Import React library to enable JSX
import React from 'react';

// Import the Rating component to display product ratings
import Rating from './Rating';

// Import modern layout components from react-bootstrap
import { Stack, Image } from 'react-bootstrap';

// Define a functional component called Product
const Product = (props) => {
  return (
    <div>
      {/* Stack replaces the old Media component */}
      <Stack direction="horizontal" gap={3}>

        {/* Product image */}
        <Image
          width={64}
          height={64}
          className="me-3"
          src={props.data.imageUrl}
          alt={props.data.productName}
        />

        {/* Product details */}
        <div>
          <h5>{props.data.productName}</h5>

          {props.data.releasedDate}

          <Rating
            rating={props.data.rating}
            numOfReviews={props.data.numOfReviews}
          />

          <p>{props.data.description}</p>
        </div>

      </Stack>
    </div>
  );
};

// Export the Product component
export default Product;
