import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

/* ------------------------------------------------------------------
   withNavigate:
   A wrapper that injects React Router v6's `useNavigate` hook 
   into a class component. Since hooks cannot be used directly 
   in class components, we inject them as props.
-------------------------------------------------------------------*/
function withNavigate(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

class User extends Component {

  constructor(props){
    super(props);

    // Component state stores UI state and data fetched from Firebase
    this.state = {
      users: [],             // List of users fetched from Firebase
      showDeleteDialog: false, // Boolean controlling delete modal visibility
      selectedUser: {},      // Stores the user selected for deletion
      loading: true,         // Controls loading spinner
      error: null            // Stores error messages (if any)
    };

    // Binding event handlers
    this.add = this.add.bind(this);
    this.openDeleteDialog = this.openDeleteDialog.bind(this);
    this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
    this.delete = this.delete.bind(this);
  }

  /* ------------------------------------------------------------------
     componentDidMount:
     Runs once when the component is first loaded.
     - Checks Firebase initialization
     - Fetches users from Firebase
     - Handles timeouts + error reporting
  -------------------------------------------------------------------*/
  componentDidMount(){
    console.log("=== Firebase Debug Info ===");
    console.log("Firebase app initialized:", firebase.apps.length > 0);

    if (firebase.apps.length > 0) {
      console.log("Database URL:", firebase.app().options.databaseURL);
    }

    /* --------------------------------------------------------------
       Safety timeout:
       Prevents infinite loading in case Firebase hangs or fails.
    ---------------------------------------------------------------*/
    const connectionTimeout = setTimeout(() => {
      console.error("Firebase connection timeout - forcing loading to stop");
      this.setState({
        loading: false,
        error: null,
        users: []
      });
    }, 5000); // 5 seconds timeout

    try {
      const dbRef = firebase.database().ref('/');

      /* --------------------------------------------------------------
         Fetch all users from Firebase (Realtime Database)
         once('value') = fetch snapshot once (no real-time listener)
      ---------------------------------------------------------------*/
      dbRef.once('value')
        .then((snapshot) => {
          clearTimeout(connectionTimeout);
          console.log("Firebase snapshot received!");
          console.log("Snapshot exists:", snapshot.exists());
          console.log("Snapshot value:", snapshot.val());

          let returnArr = [];

          // Convert Firebase object into array of user objects
          if (snapshot.exists()) {
            snapshot.forEach(data => {
              var user = data.val();
              user['key'] = data.key; // Save Firebase key for edit/delete
              returnArr.push(user);
            });
          }

          console.log("Users array length:", returnArr.length);

          // Update component state with users
          this.setState({
            users: returnArr,
            loading: false,
            error: null
          });
        })
        .catch((error) => {
          clearTimeout(connectionTimeout);

          // Handle Firebase errors gracefully
          console.error("Firebase error:", error);
          this.setState({ 
            loading: false,
            error: `Firebase Error: ${error.message}`,
            users: []
          });
        });

    } catch (error) {
      clearTimeout(connectionTimeout);

      // Handles errors during Firebase setup
      console.error("Error setting up Firebase:", error);
      this.setState({ 
        loading: false,
        error: `Setup Error: ${error.message}`,
        users: []
      });
    }
  }

  /* ------------------------------------------------------------------
     componentWillUnmount:
     Clean up Firebase listeners if they were ever attached.
  -------------------------------------------------------------------*/
  componentWillUnmount() {
    try {
      firebase.database().ref('/').off(); // Removes listeners safely
    } catch (error) {
      console.error("Error cleaning up Firebase listener:", error);
    }
  }

  /* ------------------------------------------------------------------
     Navigates to the Add User form
  -------------------------------------------------------------------*/
  add(e) {
    this.props.navigate("/add");
  }

  /* ------------------------------------------------------------------
     Opens delete confirmation modal
     user = the user object you clicked "Remove" on
  -------------------------------------------------------------------*/
  openDeleteDialog(user){
    this.setState({
      showDeleteDialog: true,
      selectedUser: user
    });
  }

  /* ------------------------------------------------------------------
     Closes delete confirmation modal
  -------------------------------------------------------------------*/
  closeDeleteDialog() {
    this.setState({
      showDeleteDialog: false,
      selectedUser: {}
    });
  }

  /* ------------------------------------------------------------------
     Deletes a user from Firebase using its unique key
  -------------------------------------------------------------------*/
  delete(e) {
    firebase.database().ref('/' + this.state.selectedUser.key).remove()
      .then(() => {
        console.log("User deleted successfully");

        // Close modal
        this.closeDeleteDialog();

        // Refresh user list
        this.componentDidMount();
      })
      .catch(error => {
        alert("Could not delete the user.");
        console.error("Delete error:", error);
      });
  }

  /* ------------------------------------------------------------------
     Renders the component UI
     - Shows loading spinner
     - Error message
     - User table
     - Delete modal
  -------------------------------------------------------------------*/
  render() {

    /* ------------------- LOADING UI ------------------- */
    if (this.state.loading) {
      return (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading users...</p>
          <p className="text-muted small">If this takes too long, check your Firebase configuration</p>
        </div>
      );
    }

    /* ------------------- ERROR UI ------------------- */
    if (this.state.error) {
      return (
        <div className="alert alert-danger mt-5" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{this.state.error}</p>
          <hr />
          <p className="mb-0">Please check your Firebase configuration and database rules.</p>
          <Button variant="primary" onClick={() => window.location.reload()} className="mt-3">
            Retry
          </Button>
        </div>
      );
    }

    /* ------------------- USER TABLE ------------------- */
    const listUsers = this.state.users.map((user) =>
      <tr key={user.key}>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>
          {/* Edit button navigates to edit form */}
          <Link to={`/edit/${user.key}`} className="btn btn-sm btn-info">
            Edit
          </Link>
        </td>
        <td>
          {/* Opens the confirmation dialog */}
          <Button variant="danger" size="sm" onClick={() => this.openDeleteDialog(user)}>
            Remove
          </Button>
        </td>
      </tr>
    );

    return (
      <div>
        <h1>User Management</h1>

        {/* Add User button */}
        <Button variant="primary" onClick={this.add} className="mb-3">
          Add User
        </Button>

        {/* Show message if no users exist */}
        {this.state.users.length === 0 ? (
          <div className="alert alert-info" role="alert">
            <p className="mb-0">No users found. Click "Add User" to create your first user.</p>
          </div>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {listUsers}
            </tbody>
          </Table>
        )}

        {/* ------------------- DELETE MODAL ------------------- */}
        <Modal show={this.state.showDeleteDialog} onHide={this.closeDeleteDialog}>
          <Modal.Header closeButton>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete <strong>{this.state.selectedUser.username}</strong>?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeDeleteDialog}>
              Cancel
            </Button>
            <Button variant="danger" onClick={this.delete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withNavigate(User);
