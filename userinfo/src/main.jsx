import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'  // Use Router (BrowserRouter)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>  {/* Wrap App with Router */}
      <App />
    </Router>
  </StrictMode>
)
