
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Register from './components/Register'
import Portfolio from './components/Portfolio'
import ModernEntry from './modern-style/Entry'
import OldAestheticEntry from './old-aesthetic/Entry'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/portfolios' element={<Portfolio />} />
          <Route path='/modern/:uniqueId' element={<ModernEntry />} />
          <Route path='/old-aesthetic/:uniqueId' element={<OldAestheticEntry />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
