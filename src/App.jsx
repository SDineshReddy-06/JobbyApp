import {BrowserRouter, Route, Routes} from 'react-router-dom'

import './App.css'
import LoginPage from './components/loginPage'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import JobPage from './components/JobPage'
import EachJobPage from './components/EachJobPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage/>
            </ProtectedRoute> }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <EachJobPage/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App