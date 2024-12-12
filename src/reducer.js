export default function reducer(state, action) {
    switch (action.type) {
      case 'ADD_TODO':
        return { ...state, todos: [...state.todos, action.payload] };
      case 'DELETE_TODO':
        return {
          ...state,
          todos: state.todos.filter(todo => todo.id !== action.payload.id),
        };
      case 'UPDATE_TODO':
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
          ),
        };
      case 'RESET_TASBEH':
        return { ...state, tasbeh: 0 };
      case 'SET_TIMER':
        return { ...state, timer: action.payload };
      default:
        return state;
    }
  }
  