import Nav from "../components/Nav";
import ExerciseBox from "../components/ExerciseBox";
import { useState } from 'react';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { endExercise, getExerciseAttemptQuestionCorrectAnswer } from "../services/databaseService";
import { getExerciseAttempt } from "../services/databaseService";
import { getExerciseAttemptQuestion } from "../services/databaseService";
import { endExerciseAttemptQuestion } from "../services/databaseService";


function ExercisePage(props) {
    const [numberQuestion, setNumberQuestion] = useState(0);
    const [countQuestion, setCountQuestion] = useState(0);
    const [question, setQuestion] = useState("");
    const [exerciseQuestionAnswerId, setExerciseQuestionAnswerId] = useState("");
    const [time, setTime] = useState(10);
    const [navigateTo, setNavigateTo] = useState("");
    const [isQuestion, setIsQuestion] = useState(true);
    const [answer, setAnswer] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [correct, setCorrect] = useState(false);


    const fetched = useRef(false);
    const navigate = useNavigate();

    // navigate to login page if not authenticated (based on React authState, not DB state) 
    useEffect(() => {
        if (!props.authStatus) {
            navigate("/");
        }
    },
        [props.authStatus]);

    let id = -1;
    if (props.par["ExerciseID"] != null) {
        id = props.par["ExerciseID"];
    }


    function getDataQuestion() {
        getExerciseAttemptQuestion(id).then(
            (list) => {
                setQuestion(list[0]["question"])
                setNumberQuestion(Number(list[0]["count_actual"]));
                setCountQuestion(Number(list[0]["count_maximum"]));
                setExerciseQuestionAnswerId(Number(list[0]["exercise_question_answer_id"]))
            }
        ).catch((error) => {
            console.error(error);
            props.setError(error.message || "Error getting question");
            if (error.code === 401 || error.code === 402) {
                props.setAuthStatus(false);
                navigate("/");
            }
        });
    }

    function getTime() {
        getExerciseAttempt(id).then(
            (list) => {
                setTime(list[0]["remaining_seconds"]);
            }
        ).catch((error) => {
            console.error(error);
            props.setError(error.message || "Error getting time");
            if (error.code === 401 || error.code === 402) {
                props.setAuthStatus(false);
                navigate("/");
            }
        });
    }

    const handleAnswer = (e) => setAnswer(e.target.value);


    useEffect(() => {
        if (fetched.current) return;
        fetched.current = true;
        getDataQuestion();
        getTime();
    }, []);

    async function afterSubmit() {
        if (isQuestion) {
            await endExerciseAttemptQuestion({ "exercise_question_answer_id": exerciseQuestionAnswerId, "student_answer": answer }).then(
                setIsQuestion(false)
            ).catch((error) => {
                console.error(error);
                props.setError(error.message || "Error ending exercise");
                if (error.code === 401 || error.code === 402) {
                    props.setAuthStatus(false);
                    navigate("/");
                }
                return;
            });

            await getExerciseAttemptQuestionCorrectAnswer({ "exercise_question_answer_id": exerciseQuestionAnswerId }).then(
                (result) => {
                    setCorrectAnswer(result[0]["correct_answer"]);
                    setCorrect(result[0]["correct"]);
                }
            ).catch((error) => {
                console.error(error);
                props.setError(error.message || "Error ending exercise");
                if (error.code === 401 || error.code === 402) {
                    props.setAuthStatus(false);
                    navigate("/");
                }
                return;
            });

            if (numberQuestion >= countQuestion) {
                try {
                    endExercise({ "exercise_id": id });
                    props.setError('');
                } catch (error) {
                    console.log(error);
                    props.setError(error.message || "Error ending exercise");
                    if (error.code === 401 || error.code === 402) {
                        props.setAuthStatus(false);
                        navigate("/");
                    }
                    return;
                };
            }
        } else {
            if (numberQuestion >= countQuestion) {
                setNavigateTo("/end-exercise");
            } else {
                getDataQuestion();
                setNumberQuestion(numberQuestion + 1);
                setIsQuestion(true);
                setAnswer("");
                setCorrectAnswer("");
                setCorrect(false);
            }
        }
    }

    return <>
        <Navigate to={navigateTo} />
        <Nav authStatus={props.authStatus} setAuthStatus={props.setAuthStatus} setError={props.setError} />
        <ExerciseBox
            numberQuestion={numberQuestion}
            countQuestion={countQuestion}
            time={time}
            question={question}
            isQuestion={isQuestion}
            answer={answer}
            handleAnswer={handleAnswer}
            correctAnswer={correctAnswer}
            isCorrect={correct}
            afterSubmit={afterSubmit}
        />
    </>;
}

export default ExercisePage
