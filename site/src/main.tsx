import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './estilos/comum.css'
import './estilos/header.css'
import './estilos/footer.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
