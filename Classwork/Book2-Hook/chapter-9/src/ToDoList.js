import React, { useContext, useState, useEffect } from 'react'; // Import React hooks
import { TodosContext } from './App'; // Import TodosContext to access global state
import { Table, Form, Button } from 'react-bootstrap'; // Import Bootstrap UI components
import useAPI from './useAPI'; // Custom hook for fetching data from API
import axios from 'axios'; // Axios for HTTP requests
import { v4 as uuidv4 } from 'uuid'; // UUID generator for unique todo IDs

function ToDoList() {
  // Access global todos state and dispatch function from context
  const { state, dispatch } = useContext(TodosContext); 

  // Local state for the input text
  const [todoText, setTodoText] = useState(""); 

  // State to track whether we are editing or adding a todo
  const [editMode, setEditMode] = useState(false); 

  // State to store the todo currently being edited
  const [editTodo, setEditTodo] = useState(null); 

  // Button label changes based on edit mode
  const buttonTitle = editMode ? "Edit" : "Add";

  // API endpoint for todos
  const endpoint = "http://localhost:3000/todos/";
  
  // Fetch saved todos from the API using custom hook
  const savedTodos = useAPI(endpoint);
  
  // Load fetched todos into global state when API data changes
  useEffect(() => {
    if (savedTodos && savedTodos.length > 0) {
      dispatch({ type: "get", payload: savedTodos });
    }
  }, [savedTodos, dispatch]); // Re-run when savedTodos or dispatch changes

  // Handle form submission for adding or editing todos
  const handleSubmit = async event => {
    event.preventDefault(); // Prevent page reload on form submit

    if (editMode) { 
      // Update existing todo on the server
      await axios.patch(endpoint + editTodo.id, { text: todoText });

      // Update todo in global state
      dispatch({ type: 'edit', payload: { ...editTodo, text: todoText } });

      // Exit edit mode and clear selected todo
      setEditMode(false);
      setEditTodo(null);
    } else {
      // Create a new todo object
      const newToDo = { id: uuidv4(), text: todoText };

      // Save new todo to the server
      await axios.post(endpoint, newToDo);

      // Add new todo to global state
      dispatch({ type: 'add', payload: newToDo });
    } 

    // Clear input field after submit
    setTodoText("");
  };
  
  return (
    <div>
      {/* Form for adding/editing todos */}
      <Form onSubmit={handleSubmit}>
        <Form.Group> 
          <Form.Control 
            type="text" 
            placeholder="Enter To Do" 
            onChange={event => setTodoText(event.target.value)} // Update input state
            value={todoText} // Controlled input value
          />
        </Form.Group> 
        <Button variant="primary" type="submit">
          {buttonTitle}
        </Button> 
      </Form>

      {/* Table to display todos */}
      <Table striped bordered hover>
        <thead>
          <tr> 
            <th>To Do</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {state.todos.map(todo => (
            <tr key={todo.id}> 
              {/* Display todo text */}
              <td>{todo.text}</td>

              {/* Edit button */}
              <td onClick={() => {
                setTodoText(todo.text); // Populate input with selected todo
                setEditMode(true); // Enable edit mode
                setEditTodo(todo); // Store todo being edited
              }}> 
                <Button variant="link">Edit</Button> 
              </td>

              {/* Delete button */}
              <td onClick={async () => { 
                // Delete todo from the server
                await axios.delete(endpoint + todo.id);

                // Remove todo from global state
                dispatch({ type: 'delete', payload: todo });
              }}>
                <Button variant="link">Delete</Button>
              </td>
            </tr>
          ))} 
        </tbody>
      </Table> 
    </div>
  );
}

export default ToDoList; // Export ToDoList component
