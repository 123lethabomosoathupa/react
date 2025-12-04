import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { useParams, useNavigate } from 'react-router-dom';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.params.id;
    this.title = 'New User';
    this.state = {
      username: '',
      email: ''
    };
    if (this.id) {
      this.title = 'Edit User';
    }
  }

  componentDidMount() {
    if (this.id) {
      firebase.database().ref('/' + this.id)
        .on('value', snapshot => {
          this.setState({
            username: snapshot.val().username,
            email: snapshot.val().email
          });
        });
    }
  }

  render() {
    return (
      <div className="container mt-4">
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
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              if (this.id) {
                firebase.database().ref('/' + this.id).update({
                  username: values.username,
                  email: values.email
                }).then(() => this.props.navigate("/"));
              } else {
                firebase.database().ref('/').push({
                  username: values.username,
                  email: values.email
                }).then(() => this.props.navigate("/"));
              }
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <Field type="text" name="username" className="form-control" />
                <span style={{ color: "red", fontWeight: "bold" }}>
                  <ErrorMessage name="username" component="div" />
                </span>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="email" name="email" className="form-control" />
                <span style={{ color: "red", fontWeight: "bold" }}>
                  <ErrorMessage name="email" component="div" />
                </span>
              </div>

              <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

// Wrapper to use hooks with class component
function UserFormWithRouter(props) {
  const params = useParams();
  const navigate = useNavigate();
  return <UserForm {...props} params={params} navigate={navigate} />;
}

export default UserFormWithRouter;