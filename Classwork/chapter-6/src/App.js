// Import React and the Component class so we can create a class-based component
import React, { Component } from 'react';
// Import the UserForm component so it can be rendered inside this component
import UserForm from './UserForm';

// Define the App component as a class
class App extends Component {
  // The render method controls what appears on the screen
  render() {
    return (
      // Parent wrapper div for the whole app
      <div>
        {/* Render the UserForm component inside the App */}
        <UserForm />
      </div>
    );
  }
}

// Export the App component so other files can import and use it
export default App;
