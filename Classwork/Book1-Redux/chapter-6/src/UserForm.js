// Import React and Component to create a class-based component
import React, { Component } from 'react';
// Import Formik helpers: Formik wrapper, Form, Field inputs, and error messages
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Define the UserForm component
class UserForm extends Component {

  // Constructor receives props if needed
  constructor(props){
    super(props); // Pass props to the parent class
  }

  // Render method defines what appears on the page
  render(){
    return(
      // Wrapper div for the entire form section
      <div>
        {/* Simple heading at the top */}
        <h1>Any place in your app!</h1>

        {/* Formik component that manages form state, validation, and submission */}
        <Formik
          // Initial values for form fields (email and password)
          initialValues={{ email: '', password: '' }}

          // Function to validate form input values
          validate={values => {
            let errors = {}; // Object to store any validation errors
            
            // Email validation
            if (!values.email) {
              // If email field is empty → error
              errors.email = 'Required';
            } else if (
              // RegEx test for valid email format
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            else if (values.email.length < 10) {
              // Custom rule: email must be at least 10 characters long
              errors.email = 'Email address too short';
            }

            // Password validation
            if (!values.password) {
              // If password is empty → error
              errors.password = 'Required';
            }
            else if (values.password.length < 8) {
              // Password must be at least 8 characters
              errors.password = 'Password too short';
            }

            // Return all accumulated errors back to Formik
            return errors;
          }}

          // Handle form submission
          onSubmit={(values, { setSubmitting }) => {
            // Simulate a short delay like a server request
            setTimeout(() => {
              // Show form data in an alert box (formatted as JSON)
              alert(JSON.stringify(values, null, 2));
              // Re-enable the submit button
              setSubmitting(false);
            }, 400);
          }}
        >

          {/* Formik uses a render prop to provide form helpers like isSubmitting */}
          {({ isSubmitting }) => (
            
            // Form component replaces the normal HTML <form>
            <Form>

              {/* Email input field connected to Formik */}
              <Field type="email" name="email" />

              {/* Display email validation errors */}
              <span style={{ color:"red", fontWeight: "bold" }}>
                <ErrorMessage name="email" component="div" />
              </span>

              {/* Password input field connected to Formik */}
              <Field type="password" name="password" />

              {/* Display password validation errors */}
              <span style={{ color:"red", fontWeight: "bold" }}>
                <ErrorMessage name="password" component="div" />
              </span>

              {/* Submit button; disabled while the form is submitting */}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>

            </Form>
          )}

        </Formik>
      </div>
    )
  }
}

// Export the component for use in other files
export default UserForm;
