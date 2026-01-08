import React, { useReducer, useContext, useState, createContext } from 'react';

// Generate a simple unique ID
const generateId = () => {
  return Date.now() + Math.random();
};

// Initial state for todos
const todosInitialState = { 
  todos: [
    { id: 1, text: "finishing writing hooks chapter" },
    { id: 2, text: "play with kids" },
    { id: 3, text: "read bible" }
  ]
};

// Create context
export const TodosContext = createContext();

// Reducer function
function todosReducer(state, action) { 
  switch(action.type) { 
    case 'add':
      const newToDo = { id: generateId(), text: action.payload };
      const addedToDos = [...state.todos, newToDo];
      return { ...state, todos: addedToDos };
      
    case 'delete':
      const filteredTodoState = state.todos.filter(todo => todo.id !== action.payload.id);
      return { ...state, todos: filteredTodoState };
      
    case 'edit': 
      const updatedToDo = { ...action.payload };
      const updatedToDoIndex = state.todos.findIndex(t => t.id === action.payload.id);
      const updatedToDos = [
        ...state.todos.slice(0, updatedToDoIndex),
        updatedToDo,
        ...state.todos.slice(updatedToDoIndex + 1)
      ];
      return { ...state, todos: updatedToDos };
      
    default:
      return todosInitialState;
  }
}

// ToDoList Component
function ToDoList() {
  const { state, dispatch } = useContext(TodosContext); 
  const [todoText, setTodoText] = useState(""); 
  const [editMode, setEditMode] = useState(false); 
  const [editTodo, setEditTodo] = useState(null); 
  const buttonTitle = editMode ? "Edit" : "Add";

  const handleSubmit = event => {
    event.preventDefault();
    if (editMode) { 
      dispatch({ type: 'edit', payload: { ...editTodo, text: todoText } });
      setEditMode(false);
      setEditTodo(null);
    } else {
      dispatch({ type: 'add', payload: todoText });
    } 
    setTodoText("");
  };
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My ToDo List</h2>
      
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
              <td style={styles.td}>{todo.text}</td>
              <td style={styles.td}>
                <button 
                  style={styles.linkButton}
                  onClick={() => {
                    setTodoText(todo.text);
                    setEditMode(true);
                    setEditTodo(todo);
                  }}
                >
                  Edit
                </button>
              </td>
              <td style={styles.td}>
                <button 
                  style={styles.linkButton}
                  onClick={() => dispatch({ type: 'delete', payload: todo })}
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

// Main App Component
function App() {
  const [state, dispatch] = useReducer(todosReducer, todosInitialState);
  
  return (
    <TodosContext.Provider value={{ state, dispatch }}> 
      <ToDoList />
    </TodosContext.Provider> 
  );
}

// Styles
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