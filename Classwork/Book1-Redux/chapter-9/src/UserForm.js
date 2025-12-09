import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import firebase from 'firebase/app';
import 'firebase/database';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

/* ------------------------------------------------------------------
   withRouter - A wrapper to inject React Router v6 hooks into
   a class-based component.

   - navigate → for programmatic navigation
   - params → to access route parameters like :id
-------------------------------------------------------------------*/
function withRouter(Component) {
  return props => {
    const navigate = useNavigate();
    const params = useParams();
    return <Component {...props} navigate={navigate} params={params} />;
  };
}

class UserForm extends Component {

  constructor(props){
    super(props);

    // Extract user ID from route params
    this.id = this.props.params.id;

    // Determine whether we are editing or adding a new user
    this.title = this.id ? 'Edit User' : 'New User';

    // Component state holds form values and loading state
    this.state = {
      username: '',
      email: '',
      loading: true
    };

    // Debug logging
    console.log("UserForm constructor - ID:", this.id);
    console.log("UserForm constructor - navigate function:", typeof this.props.navigate);
  }

  /* ------------------------------------------------------------------
     componentDidMount:
     - If editing (ID exists), fetch user data from Firebase
     - If adding new, simply stop loading
  -------------------------------------------------------------------*/
  componentDidMount(){
    if(this.id){
      console.log("Fetching user with ID:", this.id);

      // Fetch user data from Firebase
      firebase.database().ref('/' + this.id)
        .once('value')
        .then(snapshot => {
          if (snapshot.exists()) {
            console.log("User data:", snapshot.val());

            // Pre-fill form with existing user data
            this.setState({
              username: snapshot.val().username || '',
              email: snapshot.val().email || '',
              loading: false
            });
          } else {
            // If user does not exist, show an error and navigate home
            console.log("User not found");
            alert("User not found");
            this.props.navigate("/");
          }
        })
        .catch(error => {
          console.error("Error fetching user:", error);
          this.setState({ loading: false });
        });

    } else {
      // Adding new user → no need to fetch data
      this.setState({ loading: false });
    }
  }

  /* ------------------------------------------------------------------
     handleSubmit:
     Handles both creating and updating users in Firebase.

     - values: Form values from Formik
     - setSubmitting: tells Formik when submission is done
  -------------------------------------------------------------------*/
  handleSubmit = (values, { setSubmitting }) => {

    console.log("=== SUBMIT STARTED ===");
    console.log("Form values:", values);
    console.log("Is editing?", !!this.id);
    console.log("Firebase initialized?", firebase.apps.length > 0);

    /* ------------------------------
       CASE 1: Editing an existing user
    ------------------------------ */
    if(this.id){
      console.log("Starting update for user:", this.id);

      firebase.database().ref('/' + this.id).update({
        username: values.username,
        email: values.email
      })
      .then(() => {
        console.log("✓ Firebase update successful!");
        setSubmitting(false);

        // Navigate back home after saving
        this.props.navigate("/");
      })
      .catch(error => {
        console.error("✗ Firebase update error:", error);
        alert("Error updating user: " + error.message);
        setSubmitting(false);
      });

    } else {
      /* ------------------------------
         CASE 2: Adding a new user
      ------------------------------ */
      console.log("Starting add new user");

      const newUserData = {
        username: values.username,
        email: values.email
      };

      firebase.database().ref('/').push(newUserData)
      .then((ref) => {
        console.log("✓ Firebase push successful! New key:", ref.key);
        setSubmitting(false);

        // Navigate back home after adding
        this.props.navigate("/");
      })
      .catch(error => {
        console.error("✗ Firebase push error:", error);
        alert("Error adding user: " + error.message);
        setSubmitting(false);
      });
    }
  }

  /* ------------------------------------------------------------------
     render():
     - Shows loading screen
     - Displays Formik form with validation
     - Renders Bootstrap-styled form fields
  -------------------------------------------------------------------*/
  render(){

    // Simple loading message while fetching data
    if (this.state.loading) {
      return <div className="text-center mt-5">Loading...</div>;
    }

    return(
      <div>
        <h1>{this.title}</h1>

        {/* Formik handles form state, validation, and submission */}
        <Formik
          enableReinitialize={true} // Allows form to update when state changes
          initialValues={{ 
            username: this.state.username, 
            email: this.state.email 
          }}

          /* ------------------------------
             Validation logic
          ------------------------------ */
          validate={values => {
            let errors = {};

            // EMAIL validation
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            } else if (values.email.length < 10) {
              errors.email = 'Email address too short';
            }

            // USERNAME validation
            if (!values.username) {
              errors.username = 'Required';
            } else if (values.username.length < 3) {
              errors.username = 'Username too short';
            }

            return errors;
          }}

          // On form submit → call handleSubmit
          onSubmit={this.handleSubmit}
        >

          {/* Formik render props */}
          {({ isSubmitting, errors, touched }) => (
            <Form>

              {/* Username field */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username:</label>
                <Field 
                  type="text"
                  name="username"
                  className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
                  placeholder="Enter username (min 3 characters)"
                />
                <ErrorMessage name="username">
                  {msg => <div className="text-danger mt-1">{msg}</div>}
                </ErrorMessage>
              </div>

              {/* Email field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <Field 
                  type="email"
                  name="email"
                  className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                  placeholder="Enter email (min 10 characters)"
                />
                <ErrorMessage name="email">
                  {msg => <div className="text-danger mt-1">{msg}</div>}
                </ErrorMessage>
              </div>

              {/* Submit button */}
              <Button 
                type="submit" 
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>

              {/* Cancel button */}
              {' '}
              <Button 
                variant="secondary"
                onClick={() => this.props.navigate("/")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              {/* Inline message during submission */}
              {isSubmitting && (
                <div className="mt-2 text-muted">
                  <small>Processing... Check console for details.</small>
                </div>
              )}

            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withRouter(UserForm);
