import React, { useReducer } from 'react'; // Import React and the useReducer hook for state management
import ToDoList from './ToDoList'; // Import the ToDoList component

// Initial state for the todos reducer
const todosInitialState = { 
  todos: [] // Start with an empty todos array
};

// Create a Context to share state and dispatch across components
export const TodosContext = React.createContext();

function App() {
  // useReducer hook to manage todos state using the todosReducer function
  const [state, dispatch] = useReducer(todosReducer, todosInitialState);
  
  return (
    // Provide state and dispatch to all child components via Context
    <TodosContext.Provider value={{ state, dispatch }}> 
      {/* Render the ToDoList component */}
      <ToDoList />
    </TodosContext.Provider> 
  );
}

// Reducer function to handle all todo-related actions
function todosReducer(state, action) { 
  switch(action.type) { 

    case 'get': 
      // Replace the current todos with the fetched todos
      return { ...state, todos: action.payload };
      
    case 'add': 
      // Add a new todo to the existing todos array
      const addedToDos = [...state.todos, action.payload];
      return { ...state, todos: addedToDos };
      
    case 'delete':
      // Remove a todo by filtering out the matching id
      const filteredTodoState = state.todos.filter(
        todo => todo.id !== action.payload.id
      );
      return { ...state, todos: filteredTodoState };
      
    case 'edit': 
      // Create an updated todo object from the payload
      const updatedToDo = { ...action.payload };

      // Find the index of the todo being edited
      const updatedToDoIndex = state.todos.findIndex(
        t => t.id === action.payload.id
      );

      // Create a new todos array with the updated todo in the correct position
      const updatedToDos = [
        ...state.todos.slice(0, updatedToDoIndex),
        updatedToDo,
        ...state.todos.slice(updatedToDoIndex + 1)
      ];

      return { ...state, todos: updatedToDos };
      
    default:
      // Reset to initial state if action type is unknown
      return todosInitialState;
  }
}

export default App; // Export the App component as default
