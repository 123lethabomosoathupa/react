// Import React and necessary components
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

// -----------------------------------------
// HOC (Higher-Order Component) that allows
// a class component to access React Router v6 hooks
// -----------------------------------------
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let params = useParams();     // Get URL parameters (e.g., login, id)
    let navigate = useNavigate(); // Get navigation function
    return <Component {...props} params={params} navigate={navigate} />;
  }
  return ComponentWithRouterProp;
}

class GitHubUser extends Component {
  constructor(props) {
    super(props);

    // Bind event handler
    this.handleClick = this.handleClick.bind(this);
  }

  // Navigate back to the GitHub users page
  handleClick(e) {
    this.props.navigate("/github");
  }

  render() {
    return (
      <div className="container mt-4">

        {/* Display dynamic route data from URL */}
        <h1>User Login: {this.props.params.login}</h1>
        <h2>User Id: {this.props.params.id}</h2>

        {/* Button to navigate back */}
        <Button variant="primary" onClick={this.handleClick}>
          Go to GitHub Users
        </Button>
      </div>
    );
  }
}

// Export wrapped version so class component receives router props
export default withRouter(GitHubUser);
