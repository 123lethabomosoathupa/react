// Import React library to enable JSX and component creation
import React from 'react';

// Import the Rating component from the Rating file
import Rating from './Rating';

// Define a functional component called App
function App() {
  // The return statement defines what will be rendered on the screen
  return (
    <div>
      {/* Heading displayed at the top of the page */}
      <h1>React Rating Component</h1>

      {/* Render the Rating component with an initial rating of 1 */}
      <Rating rating='1' />

      {/* Render the Rating component with an initial rating of 2 */}
      <Rating rating='2' />

      {/* Render the Rating component with an initial rating of 3 */}
      <Rating rating='3' />

      {/* Render the Rating component with an initial rating of 4 */}
      <Rating rating='4' />

      {/* Render the Rating component with an initial rating of 5 */}
      <Rating rating='5' />
    </div>
  );
}

// Export the App component so it can be used in other files
export default App;
