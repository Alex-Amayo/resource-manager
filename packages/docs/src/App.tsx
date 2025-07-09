import { useState } from 'react';
import { Button } from 'resource-manager-ui';
import './App.css';

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Button  />
      <h1 className="text-primary w-full">Vite + React</h1>
      <div className="card bg-primary">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
