import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Provider from './Context/Provider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider >
    <App/>
  </Provider>,
)
