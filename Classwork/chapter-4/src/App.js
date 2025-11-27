// Import React so we can use JSX
import React from 'react';

// Import the Products component so we can display the list of products
import Products from './Products';

function App() {

    return (
        // Main container for the application
        <div className="App">

            {/* Render the Products component */}
            <Products />

        </div>
    );
}

// Export the App component so it can be used in index.js
export default App;
