import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import App from './App'
import './index.css'

axios.defaults.baseURL = import.meta.env.VITE_API_URL || ''

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
