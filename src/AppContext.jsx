
import React, { createContext, useReducer } from 'react';


const initialState = {
  todos: [],
  tasbehCount: 0,
  timer: 0,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
        ),
      };
    case 'INCREMENT_TASBEH':
      return { ...state, tasbehCount: state.tasbehCount + 1 };
    case 'RESET_TASBEH':
      return { ...state, tasbehCount: 0 };
    case 'SET_TIMER':
      return { ...state, timer: action.payload };
    case 'DECREMENT_TIMER':
      return { ...state, timer: state.timer - 1 };
    default:
      return state;
  }
}

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
