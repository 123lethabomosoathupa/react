import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import useFetch from './useFetch'; // Custom hook to fetch data
import Users from './Users';       // Component to display users

const App = () => {
  // URLs for fetching data
  const postsUrl = "https://jsonplaceholder.typicode.com/posts";
  const todosUrl = "https://jsonplaceholder.typicode.com/todos";
  
  // State to store which URL is currently requested
  const [requested, setRequested] = useState(postsUrl);

  // Fetch data using custom hook based on the current requested URL
  const data = useFetch(requested);
  
  return (
    <div className="container mt-4">
      {/* Display Users component */}
      <Users />
      
      {/* Buttons to switch between posts and todos */}
      <Button 
        variant="link" 
        onClick={() => setRequested(postsUrl)}>
        Posts
      </Button>
      <Button 
        variant="link" 
        onClick={() => setRequested(todosUrl)}>
        Todos
      </Button>

      {/* Show the currently requested URL */}
      <br />
      <p>Requested: {requested}</p>
      
      {/* Render fetched data */}
      <ul>
        {data.map(el => (
          <li key={el.id}>{el.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
