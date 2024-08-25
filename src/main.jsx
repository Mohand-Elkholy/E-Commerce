import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import App from './App.jsx'
import "./../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <NextUIProvider>
      <App />
    </NextUIProvider>,
)
