import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RootStoreProvider } from './Providers/RootStoreProvider.jsx'
import './index.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootStoreProvider>
      <App/>
    </RootStoreProvider>
  </React.StrictMode>,
)
