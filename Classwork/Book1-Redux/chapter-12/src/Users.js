import React from 'react';
import useFetch from './useFetch';

/**
 * Users component
 * Fetches and displays a list of users from an API
 */
const Users = () => {
  // Use custom hook to fetch users data
  const users = useFetch("https://jsonplaceholder.typicode.com/users");
  
  return (
    <div className="mb-4">
      {/* Component title */}
      <h3>Users</h3>
      
      {/* Display fetched users in a list */}
      <ul>
        {users.map(el => (
          <li key={el.id}>{el.name}</li> // Use unique 'id' as key
        ))}
      </ul>
    </div>
  );
};

export default Users;
