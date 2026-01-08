// Import React and the useState hook to manage component state
import React, { useState } from 'react';

// Import filled and outlined star icons from react-icons
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

// Define a functional component called Rating
// Receives props: rating (initial value) and numOfReviews
function Rating(props) {

  // Create a state variable called 'rating' and a setter 'setRating'
  // Initialize it with the value from props.rating
  const [rating, setRating] = useState(props.rating);

  // Return the JSX that renders stars and the number of reviews
  return (
    // Apply inline styles to the container
    <div style={styles.starStyle}>

      {/* Display the current rating */}
      <h1>Rating: {rating}</h1>

      {/* Star 1: filled if rating >= 1, otherwise outlined */}
      {rating >= 1 ? (
        <IoIosStar onClick={() => setRating(1)} />
      ) : (
        <IoIosStarOutline onClick={() => setRating(1)} />
      )}

      {/* Star 2 */}
      {rating >= 2 ? (
        <IoIosStar onClick={() => setRating(2)} />
      ) : (
        <IoIosStarOutline onClick={() => setRating(2)} />
      )}

      {/* Star 3 */}
      {rating >= 3 ? (
        <IoIosStar onClick={() => setRating(3)} />
      ) : (
        <IoIosStarOutline onClick={() => setRating(3)} />
      )}

      {/* Star 4 */}
      {rating >= 4 ? (
        <IoIosStar onClick={() => setRating(4)} />
      ) : (
        <IoIosStarOutline onClick={() => setRating(4)} />
      )}

      {/* Star 5 */}
      {rating >= 5 ? (
        <IoIosStar onClick={() => setRating(5)} />
      ) : (
        <IoIosStarOutline onClick={() => setRating(5)} />
      )}

      {/* Display the number of reviews passed from props */}
      <span> {props.numOfReviews}</span>
    </div>
  );
}

// Define inline styles for the component
const styles = {
  starStyle: {
    color: 'orange' // Set the color of stars
  }
};

// Export the Rating component for use in other components
export default Rating;
