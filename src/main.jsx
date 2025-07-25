import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'  // ← THIS IS IMPORTANT!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode  basename= "/Nikhil-Kudupudi/">
    <App />
  </React.StrictMode>,
)
