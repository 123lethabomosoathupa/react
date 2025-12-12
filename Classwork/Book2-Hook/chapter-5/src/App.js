import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import JumbotronComponent from './JumbotronComponent';
import Products from './Products';

function App() {
  return (
    <div>
      <JumbotronComponent>
        Welcome to our product catalog! Browse our amazing selection of products below.
      </JumbotronComponent>
      <Products />
    </div>
  );
}

export default App;