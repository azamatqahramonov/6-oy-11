
import React from 'react';
import { AppProvider } from './AppContext';
import Home from './pages/Home/index';

function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

export default App;
