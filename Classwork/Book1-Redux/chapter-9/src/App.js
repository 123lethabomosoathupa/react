import React, { Component } from 'react';
import User from './User';
import UserForm from './UserForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Main application component
class App extends Component {
  render() {
    return (
      // BrowserRouter enables client-side routing in React
      <BrowserRouter>
        {/* Bootstrap container for spacing */}
        <div className="container mt-4">

          {/* Routes replaces Switch in React Router v6 */}
          <Routes>

            {/*
              Route #1: Home page
              - Displays the User component (likely a list of users)
              - Loads when navigating to "/"
            */}
            <Route path="/" element={<User />} />

            {/*
              Route #2: Add new user
              - Opens the UserForm component in "add" mode
              - Loads when navigating to "/add"
            */}
            <Route path="/add" element={<UserForm />} />

            {/*
              Route #3: Edit existing user
              - Also uses UserForm, but receives ':id' as a URL parameter
              - Loads when navigating to URLs like "/edit/1"
            */}
            <Route path="/edit/:id" element={<UserForm />} />

            {/*
              Catch-all route:
              - Matches any unknown URL
              - Displays the NotFound component
            */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

// 404 component displayed for invalid routes
class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>404 - Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
      </div>
    );
  }
}

// Export the App component so it can be used by index.js
export default App;
