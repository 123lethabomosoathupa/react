import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Wrapper to provide navigate function to class component
function withNavigate(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      showDeleteDialog: false,
      selectedUser: {},
      loading: true,
      error: null
    };
    this.add = this.add.bind(this);
    this.openDeleteDialog = this.openDeleteDialog.bind(this);
    this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount(){
    console.log("=== Firebase Debug Info ===");
    console.log("Firebase app initialized:", firebase.apps.length > 0);
    
    if (firebase.apps.length > 0) {
      console.log("Database URL:", firebase.app().options.databaseURL);
    }
    
    // Set a timeout to stop loading if no response after 5 seconds
    const connectionTimeout = setTimeout(() => {
      console.error("Firebase connection timeout - forcing loading to stop");
      this.setState({
        loading: false,
        error: null,
        users: []
      });
    }, 5000);
    
    try {
      const dbRef = firebase.database().ref('/');
      
      dbRef.once('value')
        .then((snapshot) => {
          clearTimeout(connectionTimeout);
          console.log("Firebase snapshot received!");
          console.log("Snapshot exists:", snapshot.exists());
          console.log("Snapshot value:", snapshot.val());
          
          let returnArr = [];
          
          if (snapshot.exists()) {
            snapshot.forEach(data => {
              var user = data.val();
              user['key'] = data.key;
              returnArr.push(user);
            });
          }
          
          console.log("Users array length:", returnArr.length);
          this.setState({
            users: returnArr,
            loading: false,
            error: null
          });
        })
        .catch((error) => {
          clearTimeout(connectionTimeout);
          console.error("Firebase error:", error);
          console.error("Error code:", error.code);
          console.error("Error message:", error.message);
          this.setState({ 
            loading: false,
            error: `Firebase Error: ${error.message}`,
            users: []
          });
        });
    } catch (error) {
      clearTimeout(connectionTimeout);
      console.error("Error setting up Firebase:", error);
      this.setState({ 
        loading: false,
        error: `Setup Error: ${error.message}`,
        users: []
      });
    }
  }

  componentWillUnmount() {
    try {
      firebase.database().ref('/').off();
    } catch (error) {
      console.error("Error cleaning up Firebase listener:", error);
    }
  }

  add(e) {
    this.props.navigate("/add");
  }

  openDeleteDialog(user){
    this.setState({
      showDeleteDialog: true,
      selectedUser: user
    });
  }

  closeDeleteDialog() {
    this.setState({
      showDeleteDialog: false,
      selectedUser: {}
    });
  }

  delete(e) {
    firebase.database().ref('/' + this.state.selectedUser.key).remove()
      .then(() => {
        console.log("User deleted successfully");
        this.closeDeleteDialog();
        // Refresh the list
        this.componentDidMount();
      })
      .catch(error => {
        alert("Could not delete the user.");
        console.error("Delete error:", error);
      });
  }

  render() {
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

    const listUsers = this.state.users.map((user) =>
      <tr key={user.key}>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>
          <Link to={`/edit/${user.key}`} className="btn btn-sm btn-info">
            Edit
          </Link>
        </td>
        <td>
          <Button variant="danger" size="sm" onClick={() => this.openDeleteDialog(user)}>
            Remove
          </Button>
        </td>
      </tr>
    );

    return (
      <div>
        <h1>User Management</h1>
        <Button variant="primary" onClick={this.add} className="mb-3">Add User</Button>
        
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