import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

// Wrapper component to use hooks with class component
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let params = useParams();
    let navigate = useNavigate();
    return <Component {...props} params={params} navigate={navigate} />;
  }
  return ComponentWithRouterProp;
}

class GitHubUser extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.navigate("/github");
  }

  render() {
    return (
      <div className="container mt-4">
        <h1>User Login: {this.props.params.login}</h1>
        <h2>User Id: {this.props.params.id}</h2>
        <Button variant="primary" onClick={this.handleClick}>
          Go to GitHub Users
        </Button>
      </div>
    );
  }
}

export default withRouter(GitHubUser);