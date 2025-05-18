import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Home from './pages/Home'
import './App.css'

function App() {
  

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
