import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { SearchProvider } from "./componentes/SearchProvider.jsx";

createRoot(document.getElementById('root')).render(

  <SearchProvider>

    <BrowserRouter>

      <App />

    </BrowserRouter>

  </SearchProvider>

)