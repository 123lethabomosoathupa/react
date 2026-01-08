// Import React and the useState hook for managing component state
import React, { useState } from 'react';

// Import filled and empty star icons from react-icons
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

// Define a functional component called Rating
function Rating(props) {

  // Create a state variable called rating
  // Initialize it with the rating value received from props
  const [rating, setRating] = useState(props.rating);

  // Return the JSX that displays the rating stars
  return (
    // Apply inline styling to the star container
    <div style={styles.starStyle}>

      {/* Display the current rating value */}
      <h1>Rating: {rating}</h1>

      {/* Star 1 */}
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

      {/* Display the number of reviews */}
      <span> {props.numOfReviews}</span>
    </div>
  );
}

// Define inline styles for the component
const styles = {
  starStyle: {
    color: 'orange' // Set star color to orange
  }
};

// Export the Rating component so it can be reused
export default Rating;
