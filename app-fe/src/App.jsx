import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SuccessStudentPage from './pages/SuccessStudentPage';
import ExerciseTestPage from './pages/ExerciseTestPage';
import DescriptionPage from './pages/DescriptionPage';
import FinalExerciseTestPage from './pages/FinalExerciseTestPage';
import SuccessStudentsPage from './pages/SuccessStudentsPage';
import TestQuestionPage from './pages/TestQuestionPage';
import { getListExerciseTestUser } from "./services/databaseService"


function App() {
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
            element={<ExerciseTestPage list={getListExerciseTestUser()}/>}
          >
          </Route>
          <Route
            path="/description"
            element={<DescriptionPage />}
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
            element={<TestQuestionPage />}
          >
          </Route>
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
