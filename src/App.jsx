import React, { useEffect, useRef, useState } from 'react'
import './App.css'

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

const App = () => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("")
  const [displayName, setDisplayName] = useState('Sam Money')
  const inputElement = useRef(null);
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (displayName !== 'Sam Money') {
      setToast('Name updated')
      const t = setTimeout(() => setToast(null), 1800)
      return () => clearTimeout(t)
    }
    return undefined
  }, [displayName]);

  const changeName = () => {
    const trimmed = name.trim()
    if (trimmed !== '') {
      setDisplayName(trimmed)
      setName("")
      inputElement.current.focus()
      return
    }
    setToast('Please enter a name')
    setTimeout(() => setToast(null), 1400)
    inputElement.current.focus()
  }

  const width = useWindowWidth();
  
  return (
    <main className="app">
      <div className="card">
        <header className="card-header">
          <h1>useState demo</h1>
          <div className="meta">Window: <span className="muted">{width}px</span></div>
        </header>

        <section className="content">
          <div className="counter"> 
            <button className="btn" onClick={() => setCount(prev => prev + 1)}>Count is {count}</button>
          </div>

          <div className="name-section">
            <p className="label">My name is <span className="display-name">{displayName}</span></p>
            <div className="form-row">
              <input
                ref={inputElement}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter new name"
                aria-label="New name"
              />
              <button className="btn primary" onClick={changeName}>Change Name</button>
            </div>
          </div>
        </section>
      </div>

      {toast && (
        <div className="toast" role="status">{toast}</div>
      )}
    </main>
  )
}

export default App