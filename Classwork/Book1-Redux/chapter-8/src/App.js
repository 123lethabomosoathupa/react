// Import core React functionality
import React, { Component } from 'react';

// Import components for GitHub list and GitHub user detail pages
import GitHub from './GitHub';
import GitHubUser from './GitHubUser';

// Import router and navigation tools
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Import React-Bootstrap UI components
import { Nav, Navbar, Container } from 'react-bootstrap';


// Main App component that renders only the Header (which contains routing)
class App extends Component {
  render() {
    return (
      <div>
        {/* Render the Header component which contains the navigation + routes */}
        <Header />
      </div>
    );
  }
}

export default App;


// Header component contains all routing and the top navbar
class Header extends Component {
  render() {
    return (
      // BrowserRouter wraps the entire routing system
      <BrowserRouter>
        <div>

          {/* Navigation Bar from React-Bootstrap */}
          <Navbar bg="light" expand="lg">
            <Container>
              {/* Brand Logo/Title linking back to home */}
              <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>

              {/* Mobile menu toggle */}
              <Navbar.Toggle aria-controls="basic-navbar-nav" />

              {/* Collapsible menu items */}
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {/* Navigation links using React Router */}
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/github">GitHub</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          {/* All application routes */}
          <Routes>

            {/* Dynamic GitHub user page: /github/user/:login/:id */}
            <Route path="/github/user/:login/:id" element={<GitHubUser />} />

            {/* GitHub main page */}
            <Route path="/github" element={<GitHub />} />

            {/* Home page */}
            <Route path="/" element={<Home />} />

            {/* Fallback route for invalid URLs */}
            <Route path="*" element={<NotFound />} />
          </Routes>

        </div>
      </BrowserRouter>
    );
  }
}


// Home page component
class Home extends Component {
  render() {
    return (
      <div className="container mt-4">
        <h1>Home</h1>
        <p>Welcome to the React Routing Example!</p>
      </div>
    );
  }
}


// 404 Not Found page
class NotFound extends Component {
  render() {
    return (
      <div className="container mt-4">
        <h1>404 - Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    );
  }
}
