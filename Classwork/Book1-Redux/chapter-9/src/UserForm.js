import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import firebase from 'firebase/app';
import 'firebase/database';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

// Wrapper to provide navigate and params to class component
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
    this.id = this.props.params.id;
    this.title = this.id ? 'Edit User' : 'New User';
    this.state = {
      username: '',
      email: '',
      loading: true
    };
    
    console.log("UserForm constructor - ID:", this.id);
    console.log("UserForm constructor - navigate function:", typeof this.props.navigate);
  }

  componentDidMount(){
    if(this.id){
      console.log("Fetching user with ID:", this.id);
      firebase.database().ref('/' + this.id)
        .once('value')
        .then(snapshot => {
          if (snapshot.exists()) {
            console.log("User data:", snapshot.val());
            this.setState({
              username: snapshot.val().username || '',
              email: snapshot.val().email || '',
              loading: false
            });
          } else {
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
      this.setState({ loading: false });
    }
  }

  handleSubmit = (values, { setSubmitting }) => {
    console.log("=== SUBMIT STARTED ===");
    console.log("Form values:", values);
    console.log("Is editing?", !!this.id);
    console.log("Firebase initialized?", firebase.apps.length > 0);
    
    if(this.id){
      // Update existing user
      console.log("Starting update for user:", this.id);
      
      firebase.database().ref('/' + this.id).update({
        username: values.username,
        email: values.email
      })
      .then(() => {
        console.log("✓ Firebase update successful!");
        console.log("About to navigate...");
        setSubmitting(false);
        
        // Try navigation
        try {
          this.props.navigate("/");
          console.log("✓ Navigate called successfully");
        } catch (navError) {
          console.error("✗ Navigation error:", navError);
        }
      })
      .catch(error => {
        console.error("✗ Firebase update error:", error);
        alert("Error updating user: " + error.message);
        setSubmitting(false);
      });
    } else {
      // Add new user
      console.log("Starting add new user");
      
      const newUserData = {
        username: values.username,
        email: values.email
      };
      
      console.log("New user data:", newUserData);
      
      firebase.database().ref('/').push(newUserData)
      .then((ref) => {
        console.log("✓ Firebase push successful! New key:", ref.key);
        console.log("About to navigate...");
        setSubmitting(false);
        
        // Try navigation
        try {
          this.props.navigate("/");
          console.log("✓ Navigate called successfully");
        } catch (navError) {
          console.error("✗ Navigation error:", navError);
        }
      })
      .catch(error => {
        console.error("✗ Firebase push error:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        alert("Error adding user: " + error.message);
        setSubmitting(false);
      });
    }
  }

  render(){
    if (this.state.loading) {
      return <div className="text-center mt-5">Loading...</div>;
    }

    return(
      <div>
        <h1>{this.title}</h1>
        <Formik
          enableReinitialize={true}
          initialValues={{ 
            username: this.state.username, 
            email: this.state.email 
          }}
          validate={values => {
            let errors = {};
            
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            } else if (values.email.length < 10) {
              errors.email = 'Email address too short';
            }
            
            if (!values.username) {
              errors.username = 'Required';
            } else if (values.username.length < 3) {
              errors.username = 'Username too short';
            }
            
            return errors;
          }}
          onSubmit={this.handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
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
              
              <Button 
                type="submit" 
                variant="primary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
              {' '}
              <Button 
                variant="secondary" 
                onClick={() => this.props.navigate("/")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              
              {isSubmitting && (
                <div className="mt-2 text-muted">
                  <small>Processing... Check console for details</small>
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