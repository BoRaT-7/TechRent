import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
     <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <h1 className="text-3xl font-bold text-white">
        TechRent Admin UI
      </h1>
    </div>
  )
}

export default App
