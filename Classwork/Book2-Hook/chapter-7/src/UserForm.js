// Import React and Component class for class-based component
import React, { Component } from 'react';

// Import Formik components for building and validating forms
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Define a class-based component called UserForm
class UserForm extends Component {

  // Constructor (optional here since no state is used)
  constructor(props){
    super(props);
  }

  // Render method returns the JSX for the form
  render(){
    return(
      <div>
        {/* Heading for the form */}
        <h1>Any place in your app!</h1>

        {/* Formik component handles form state, validation, and submission */}
        <Formik
          // Initial values for the form fields
          initialValues={{ email: '', password: '' }}

          // Validation function to check form input
          validate={values => {
            let errors = {};

            // Email validations
            if (!values.email) {
              errors.email = 'Required'; // Field is empty
            } else if (
              // Check if email matches regex pattern
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address'; // Invalid format
            } else if (values.email.length < 10) {
              errors.email = 'Email address too short'; // Too short
            }

            // Password validations
            if (!values.password) {
              errors.password = 'Required'; // Field is empty
            } else if (values.password.length < 8) {
              errors.password = 'Password too short'; // Too short
            }

            return errors; // Return any validation errors
          }}

          // Function called when form is submitted
          onSubmit={(values, { setSubmitting }) => {
            // Simulate an async submission
            setTimeout(() => {
              // Show form values in an alert
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false); // Stop submitting state
            }, 400);
          }}
        >
          {/* Render prop provides form state and helpers */}
          {({ isSubmitting }) => (
            <Form>
              {/* Email input field */}
              <Field type="email" name="email" />
              {/* Display validation error for email */}
              <span style={{ color:"red", fontWeight: "bold" }}>
                <ErrorMessage name="email" component="div" />
              </span>

              {/* Password input field */}
              <Field type="password" name="password" />
              {/* Display validation error for password */}
              <span style={{ color:"red", fontWeight: "bold" }}>
                <ErrorMessage name="password" component="div" />
              </span>

              {/* Submit button */}
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

// Export the component so it can be used in other files
export default UserForm;
