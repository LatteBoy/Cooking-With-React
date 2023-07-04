import React, { useState } from 'react';
import CounterHooks from './CounterHooks';

export const ThemeContext = React.createContext()

function App() {
  const [theme, setTheme] = useState('green')
  return (
    <ThemeContext.Provider value = {{ backgroundColor: theme }}>
      Counter Hooks
      <CounterHooks initialCount={0} />
      <button onClick={() => setTheme(prevTheme => {
        return prevTheme === 'red' ? 'blue' : 'red'
      })}>Change Theme</button>
    </ThemeContext.Provider>
  )
}

export default App;
