import React, { Component } from 'react';
import User from './User';
import UserForm from './UserForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/edit/:id" element={<UserForm />} />
              <Route path="/add" element={<UserForm />} />
              <Route path="/" element={<User />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

class NotFound extends Component {
  render() {
    return <div className="container mt-4">Not Found</div>
  }
}