import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SuccessStudentPage from './pages/SuccessStudentPage';


function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<SuccessStudentPage/>}
            >
          </Route>
        </Routes>
      
      </BrowserRouter>
    </div>
  )
}

export default App
