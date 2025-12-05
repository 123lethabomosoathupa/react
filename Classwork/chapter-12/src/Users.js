import React from 'react';
import useFetch from './useFetch';

const Users = () => {
  const users = useFetch("https://jsonplaceholder.typicode.com/users");
  
  return (
    <div className="mb-4">
      <h3>Users</h3>
      <ul>
        {users.map(el => (
          <li key={el.id}>{el.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
