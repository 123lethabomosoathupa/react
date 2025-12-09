import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class UserForm extends Component {
  constructor(props){
    super(props);
    // No local state needed — Formik manages form state
  }

  render(){
    return(
      <div>
        <h1>Any place in your app!</h1>

        {/* Formik wrapper handles form state, validation, and submission */}
        <Formik
          // Initial form field values
          initialValues={{ email: '', password: '' }}

          // Custom validation logic (runs on every change/blur)
          validate={values => {
            let errors = {};

            // Email validation rules
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            } else if (values.email.length < 10) {
              errors.email = 'Email address too short';
            }

            // Password validation rules
            if (!values.password) {
              errors.password = 'Required';
            } else if (values.password.length < 8) {
              errors.password = 'Password too short';
            }

            return errors; // Formik receives this object
          }}

          // What happens when the form is submitted
          onSubmit={(values, { setSubmitting }) => {
            // Simulate network delay
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2)); // Show form values
              setSubmitting(false); // Re-enable button
            }, 400);
          }}
        >
          {/* Render props pattern: gives access to isSubmitting, etc. */}
          {({ isSubmitting }) => (
            <Form>
              
              {/* Email input field */}
              <Field type="email" name="email" />

              {/* Email validation error */}
              <span style={{ color:"red", fontWeight: "bold" }}>
                <ErrorMessage name="email" component="div" />
              </span>

              {/* Password input field */}
              <Field type="password" name="password" />

              {/* Password validation error */}
              <span style={{ color:"red", fontWeight: "bold" }}>
                <ErrorMessage name="password" component="div" />
              </span>

              {/* Submit button disabled while submitting */}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>

            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default UserForm;
