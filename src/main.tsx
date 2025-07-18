import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster 
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: 'hsl(240 15% 12%)',
          color: 'hsl(0 0% 98%)',
          border: '1px solid hsl(262 83% 58% / 0.3)',
        },
        success: {
          iconTheme: {
            primary: 'hsl(262 83% 58%)',
            secondary: 'hsl(0 0% 98%)',
          },
        },
        error: {
          iconTheme: {
            primary: 'hsl(0 84.2% 60.2%)',
            secondary: 'hsl(0 0% 98%)',
          },
        },
      }}
    />
  </React.StrictMode>
)