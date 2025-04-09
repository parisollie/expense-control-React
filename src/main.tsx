import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BudgetProvider } from './context/BudgetContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  //Vid 197 ,agregamos el context, lo encerramos en <BudgetProvider>
  <React.StrictMode>
    
    <BudgetProvider>
      <App />
    </BudgetProvider>

  </React.StrictMode>,
)
