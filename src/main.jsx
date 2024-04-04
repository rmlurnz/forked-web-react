import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RecipesContextProvider } from './context/RecipeContext'
import { AuthContextProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RecipesContextProvider>
        <App />
      </RecipesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
