import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SuccessStudentPage from './pages/SuccessStudentPage';
import ExerciseTestPage from './pages/ExerciseTestPage';
import DescriptionPage from './pages/DescriptionPage';



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
          <Route
            path="/description"
            element={<DescriptionPage/>}
          >
          </Route>
        </Routes>
      
      </BrowserRouter>
    </div>
  )
}

export default App
