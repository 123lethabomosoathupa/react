import React, { Component } from 'react';
import User from './User';
import UserForm from './UserForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<User />} />
            <Route path="/add" element={<UserForm />} />
            <Route path="/edit/:id" element={<UserForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

class NotFound extends Component {
  render(){
    return (
      <div>
        <h1>404 - Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
      </div>
    );
  }
}

export default App;