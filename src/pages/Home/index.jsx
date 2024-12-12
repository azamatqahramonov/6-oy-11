
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../AppContext';

function Home() {
  const { state, dispatch } = useContext(AppContext);
  const [todoText, setTodoText] = useState('');

  const addTodo = (text) => {
    if (text.trim() === '') return;
    const newTodo = { id: Date.now(), text };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
    setTodoText(''); 
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const updateTodo = (id, text) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, text } });
  };

  
  const incrementTasbeh = () => {
    dispatch({ type: 'INCREMENT_TASBEH' });
  };

  const resetTasbeh = () => {
    dispatch({ type: 'RESET_TASBEH' });
  };

  const startTimer = (seconds) => {
    dispatch({ type: 'SET_TIMER', payload: seconds });
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (state.timer > 0) {
        dispatch({ type: 'DECREMENT_TIMER' });
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [state.timer]);

 
  const handleTodoSubmit = (e) => {
    e.preventDefault(); 
    addTodo(todoText); 
  };

  return (
    <div>
      <h1>Home Page</h1>

      <div>
        <h2>Todos</h2>
        <form onSubmit={handleTodoSubmit}>
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder="Add Todo"
          />
          <button type="submit">Add Todo</button>
        </form>
        <ul>
          {state.todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}{' '}
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button onClick={() => updateTodo(todo.id, prompt('Update Todo:', todo.text))}>Update</button>
            </li>
          ))}
        </ul>
      </div>

 
      <div>
        <h2>Tasbeh</h2>
        <button onClick={incrementTasbeh}>+</button>
        <button onClick={resetTasbeh}>Reset</button>
        <p>Count: {state.tasbehCount}</p>
      </div>

 
      <div>
        <h2>Timer</h2>
        <input
          type="number"
          placeholder="Enter seconds"
          onChange={(e) => startTimer(parseInt(e.target.value, 10))}
        />
        <p>Time: {state.timer}</p>
      </div>
    </div>
  );
}

export default Home;
