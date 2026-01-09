import React, { useReducer, useContext, useState, createContext } from 'react';
// useReducer → manages complex state logic
// useContext → consumes context values
// useState → manages local component state
// createContext → creates a shared state container

// Generate a simple unique ID for each todo
const generateId = () => {
  // Uses current time + random number to avoid duplicate IDs
  return Date.now() + Math.random();
};

// Initial state for the todo list
const todosInitialState = { 
  todos: [
    { id: 1, text: "finishing writing hooks chapter" },
    { id: 2, text: "play with kids" },
    { id: 3, text: "read bible" }
  ]
};

// Create a Context to share todos state and dispatch globally
export const TodosContext = createContext();

// Reducer function that handles all todo actions
function todosReducer(state, action) { 
  switch(action.type) { 

    // Add a new todo
    case 'add':
      // Create a new todo object
      const newToDo = { id: generateId(), text: action.payload };
      // Add the new todo to the existing list
      const addedToDos = [...state.todos, newToDo];
      // Return updated state
      return { ...state, todos: addedToDos };

    // Delete an existing todo
    case 'delete':
      // Remove the todo that matches the given ID
      const filteredTodoState = state.todos.filter(
        todo => todo.id !== action.payload.id
      );
      // Return updated state
      return { ...state, todos: filteredTodoState };

    // Edit an existing todo
    case 'edit': 
      // Create updated todo object
      const updatedToDo = { ...action.payload };
      // Find index of todo being edited
      const updatedToDoIndex = state.todos.findIndex(
        t => t.id === action.payload.id
      );
      // Replace the old todo with the updated one
      const updatedToDos = [
        ...state.todos.slice(0, updatedToDoIndex),
        updatedToDo,
        ...state.todos.slice(updatedToDoIndex + 1)
      ];
      // Return updated state
      return { ...state, todos: updatedToDos };

    // Default case returns the initial state
    default:
      return todosInitialState;
  }
}

// Component that displays and manages the todo list
function ToDoList() {

  // Get state and dispatch from Context
  const { state, dispatch } = useContext(TodosContext); 

  // Local state for input text
  const [todoText, setTodoText] = useState(""); 

  // Tracks whether user is editing or adding
  const [editMode, setEditMode] = useState(false); 

  // Stores the todo currently being edited
  const [editTodo, setEditTodo] = useState(null); 

  // Button label changes based on mode
  const buttonTitle = editMode ? "Edit" : "Add";

  // Handles form submission
  const handleSubmit = event => {
    event.preventDefault();

    if (editMode) { 
      // Dispatch edit action
      dispatch({
        type: 'edit',
        payload: { ...editTodo, text: todoText }
      });
      // Reset edit mode
      setEditMode(false);
      setEditTodo(null);
    } else {
      // Dispatch add action
      dispatch({ type: 'add', payload: todoText });
    }

    // Clear input field
    setTodoText("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My ToDo List</h2>

      {/* Input and button container */}
      <div style={styles.formContainer} onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Enter To Do"
          onChange={event => setTodoText(event.target.value)}
          value={todoText}
          style={styles.input}
          required
        />

        <button 
          onClick={handleSubmit}
          style={styles.addButton}
        >
          {buttonTitle}
        </button> 
      </div>

      {/* Todo table */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}> 
            <th style={styles.th}>To Do</th>
            <th style={styles.thSmall}>Edit</th>
            <th style={styles.thSmall}>Delete</th>
          </tr>
        </thead>

        <tbody>
          {state.todos.map(todo => (
            <tr key={todo.id} style={styles.row}> 

              {/* Todo text */}
              <td style={styles.td}>{todo.text}</td>

              {/* Edit button */}
              <td style={styles.td}>
                <button 
                  style={styles.linkButton}
                  onClick={() => {
                    // Populate input with existing text
                    setTodoText(todo.text);
                    // Enable edit mode
                    setEditMode(true);
                    // Store todo being edited
                    setEditTodo(todo);
                  }}
                >
                  Edit
                </button>
              </td>

              {/* Delete button */}
              <td style={styles.td}>
                <button 
                  style={styles.linkButton}
                  onClick={() =>
                    dispatch({ type: 'delete', payload: todo })
                  }
                >
                  Delete
                </button>
              </td>

            </tr>
          ))} 
        </tbody>
      </table> 
    </div>
  );
}

// Main App component
function App() {

  // useReducer manages todo state and actions
  const [state, dispatch] = useReducer(
    todosReducer,
    todosInitialState
  );

  return (
    // Provide state and dispatch to all child components
    <TodosContext.Provider value={{ state, dispatch }}> 
      <ToDoList />
    </TodosContext.Provider> 
  );
}

// Inline styles object
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  title: {
    marginBottom: '20px',
    color: '#333'
  },
  formContainer: {
    marginBottom: '30px',
    display: 'flex',
    gap: '10px'
  },
  input: {
    flex: 1,
    padding: '10px 15px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    outline: 'none'
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #ddd'
  },
  headerRow: {
    backgroundColor: '#f8f9fa'
  },
  th: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
    fontWeight: '600'
  },
  thSmall: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
    fontWeight: '600',
    width: '100px'
  },
  row: {
    borderBottom: '1px solid #ddd'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #eee'
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '14px',
    padding: '0'
  }
};

export default App;
