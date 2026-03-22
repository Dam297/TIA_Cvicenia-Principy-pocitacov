import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SuccessStudentPage from './pages/SuccessStudentPage';
import ExerciseTestPage from './pages/ExerciseTestPage';


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
          <Route
            path="/list"
            element={<ExerciseTestPage/>}
          >
          </Route>
        </Routes>
      
      </BrowserRouter>
    </div>
  )
}

export default App
