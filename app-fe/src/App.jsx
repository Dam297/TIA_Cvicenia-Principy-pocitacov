import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SuccessStudentPage from './pages/SuccessStudentPage';
import ExerciseTestPage from './pages/ExerciseTestPage';
import DescriptionPage from './pages/DescriptionPage';
import FinalExerciseTestPage from './pages/FinalExerciseTestPage';
import SuccessStudentsPage from './pages/SuccessStudentsPage';
import TestQuestionPage from './pages/TestQuestionPage';
import LoginPage from './pages/LoginPage';
import ExercisePage from './pages/ExercisePage';
import { useState } from "react";


function App() {
  const [par, setPar] = useState([]);
  const [authStatus, setAuthStatus] = useState(false);
  
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<SuccessStudentPage authStatus={authStatus} />}
          >
          </Route>
          <Route
            path="/list"
            element={<ExerciseTestPage authStatus={authStatus} setPar={setPar} />}
          >
          </Route>
          <Route
            path="/description"
            element={<DescriptionPage authStatus={authStatus}  par={par} setPar={setPar}/>}
          >
          </Route>
          <Route
            path="/end"
            element={<FinalExerciseTestPage authStatus={authStatus}  par={par} setPar={setPar}/>}
          >
          </Route>
          <Route
            path="/students"
            element={<SuccessStudentsPage authStatus={authStatus}  />}
          >
          </Route>
          <Route
            path="/test_question"
            element={<TestQuestionPage authStatus={authStatus}  par={par} setPar={setPar}/>}
          >
          </Route>
          <Route
            path="/login"
            element={<LoginPage authStatus={authStatus}  setAuthStatus={setAuthStatus} />}
          >
          </Route>
          <Route
            path="/exercise"
            element={<ExercisePage authStatus={authStatus}  />}
          >
          </Route>
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
