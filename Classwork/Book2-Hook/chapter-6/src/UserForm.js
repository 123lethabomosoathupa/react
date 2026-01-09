// Import React and the useState hook for state management
import React, { useState } from 'react';

// Import Bootstrap components for styling
import { Form, Button, Alert } from 'react-bootstrap';

// Functional component for the user form
function UserForm() {

  // State to store email input value
  const [email, setEmail] = useState("");

  // State to store password input value
  const [password, setPassword] = useState("");

  // State to store email validation error message
  const [emailError, setEmailError] = useState("");

  // State to store password validation error message
  const [passwordError, setPasswordError] = useState("");

  // Function that runs when the form is submitted
  const handleSubmit = event => {
    // Prevents the page from refreshing
    event.preventDefault();

    // Flag to track if email is valid
    var emailValid = false;

    // Email validation checks
    if (email.length == 0) {
      setEmailError("Email is required");
    }
    else if (email.length < 6) {
      setEmailError("Email should be minimum 6 characters");
    }
    else if (email.indexOf(' ') >= 0) {
      setEmailError("Email cannot contain spaces");
    }
    else {
      // Clear error if email is valid
      setEmailError("");
      emailValid = true;
    }

    // Flag to track if password is valid
    var passwordValid = false;

    // Password validation checks
    if (password.length == 0) {
      setPasswordError("Password is required");
    }
    else if (password.length < 6) {
      setPasswordError("Password should be minimum 6 characters");
    }
    else if (password.indexOf(' ') >= 0) {
      setPasswordError("Password cannot contain spaces");
    }
    else {
      // Clear error if password is valid
      setPasswordError("");
      passwordValid = true;
    }

    // If both email and password are valid
    if (emailValid && passwordValid) {
      // Show alert with entered values
      alert('Email: ' + email + '\nPassword: ' + password);

      // Reset input fields
      setEmail("");
      setPassword("");
    }
  };

  // JSX returned by the component
  return (
    <div>

      {/* Form submission handled by handleSubmit */}
      <Form onSubmit={handleSubmit}>

        {/* Email input field */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email"
            placeholder="Enter email"
            onChange={event => setEmail(event.target.value)} // Update email state
            value={email} // Controlled input
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        {/* Display email error message if it exists */}
        {emailError.length > 0 &&
          <Alert variant="danger">{emailError}</Alert>
        }

        {/* Password input field */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password"
            placeholder="Password"
            onChange={event => setPassword(event.target.value)} // Update password state
            value={password} // Controlled input
          />
        </Form.Group>

        {/* Display password error message if it exists */}
        {passwordError.length > 0 &&
          <Alert variant="danger">{passwordError}</Alert>
        }

        {/* Submit button */}
        <Button variant="primary" type="submit">
          Submit
        </Button>

      </Form>

      {/* Display live values for debugging */}
      Email entered: {email}
      <br />
      Password entered: {password}

    </div>
  );
}

// Export component so it can be used elsewhere
export default UserForm;
