import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SuccessStudentPage from './pages/SuccessStudentPage';
import ExerciseTestPage from './pages/ExerciseTestPage';
import DescriptionPage from './pages/DescriptionPage';
import FinalExerciseTestPage from './pages/FinalExerciseTestPage';
import SuccessStudentsPage from './pages/SuccessStudentsPage';
import TestQuestionPage from './pages/TestQuestionPage';
import { useState } from "react";


function App() {
  const [par, setPar] = useState([]);  


  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<SuccessStudentPage />}
          >
          </Route>
          <Route
            path="/list"
            element={<ExerciseTestPage setPar={setPar} />}
          >
          </Route>
          <Route
            path="/description"
            element={<DescriptionPage par={par} setPar={setPar}/>}
          >
          </Route>
          <Route
            path="/end"
            element={<FinalExerciseTestPage />}
          >
          </Route>
          <Route
            path="/students"
            element={<SuccessStudentsPage />}
          >
          </Route>
          <Route
            path="/test_question"
            element={<TestQuestionPage par={par} setPar={setPar}/>}
          >
          </Route>
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
