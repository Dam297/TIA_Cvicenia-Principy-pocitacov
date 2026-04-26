import Nav from "../components/Nav";
import Timer from "../components/Timer";
import { useState } from 'react'
import { Navigate } from "react-router-dom";
import { getTestAttemptQuestion } from "../services/databaseService";
import { getTestOptions } from "../services/databaseService";
import { useEffect, useRef } from "react";
import { endTestAttemptQuestion } from "../services/databaseService";
import { endTest } from "../services/databaseService";
import { getTestAttempt } from "../services/databaseService";
import { useNavigate } from "react-router-dom";

function TestQuestionPage(props) {
    const [numberQuestion, setNumberQuestion] = useState(0);
    const [countQuestion, setCountQuestion] = useState(0);
    const [question, setQuestion] = useState("");
    const [testQuestionAnswerId, setTestQuestionAnswerId] = useState("");
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState(new Set());
    const [navigateTo, setNavigateTo] = useState("");
    const [time, setTime] = useState(10);
    const fetched = useRef(false);

    const navigate = useNavigate();

    // navigate to login page if not authenticated (based on React authState, not DB state) 
    useEffect(() => {
        if (!props.authStatus) {
            navigate("/");
        }
    }, [props.authStatus]);



    let id = -1;
    if (props.par["TestID"] != null) {
        id = props.par["TestID"];
    }

    function setSet(prevSet, item) {
        const key = JSON.stringify(item);
        const next = new Set(prevSet);

        if (next.has(key)) {
            next.delete(key);
        } else {
            next.add(key);
        }

        return next;
    }


    function getDataQuestion() {
        getTestAttemptQuestion(id).then(
            (list) => {
                setTestQuestionAnswerId(Number(list[0]["test_question_answer_id"]));
                setNumberQuestion(Number(list[0]["count_actual"]));
                setCountQuestion(Number(list[0]["count_maximum"]));
                setQuestion(list[0]["question"]);
                getTestOptions(list[0]["test_question_id"]).then(
                    (list2) => {
                        setOptions(list2);
                    }
                ).catch((error) => {
                    console.error(error);
                    props.setError(error.message || "Error getting question options");
                    if (error.code === 401 || error.code === 402) {
                        props.setAuthStatus(false);
                        navigate("/");
                    }
                });
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
        getTestAttempt(id).then(
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

    useEffect(() => {
        if (fetched.current) return;
        fetched.current = true;
        getDataQuestion();
        getTime();
    }, []);


    function setFalse() {
        let list;
        list = document.getElementsByClassName("btn-check");
        for (let i = 0; i < list.length; i++) {
            list[i].checked = false;
        }
    }

    async function afterSubmit() {
        await endTestAttemptQuestion({ "test_question_answer_id": testQuestionAnswerId, "answered_options": [...selectedOptions] }).then(
            setSelectedOptions(new Set())
        ).catch((error) => {
            console.error(error);
            props.setError(error.message || "Error ending test");
            if (error.code === 401 || error.code === 402) {
                props.setAuthStatus(false);
                navigate("/");
            }
            return;
        });

        if ((numberQuestion + 1) > countQuestion) {
            try {
                endTest({ "test_id": id });
                props.setError('');                
            } catch (error) {
                console.log(error);
                props.setError(error.message || "Error ending test");
                if (error.code === 401 || error.code === 402) {
                    props.setAuthStatus(false);
                    navigate("/");
                }
                return;
            };
            setNavigateTo("../end")
        } else {
            getDataQuestion();
            setNumberQuestion(numberQuestion + 1);
        }
        setFalse();
    }

    return <>
        <Navigate to={navigateTo} />
        <Nav authStatus={props.authStatus} setAuthStatus={props.setAuthStatus} setError={props.setError} />
        <div className="row align-items-center justify-content-center" >
            <div className="col-10 bg-light p-4 m-3">
                <div className="row m-0">
                    <div className="col-6 m-0 p-0">
                        <h3 className="text-start">{numberQuestion}/{countQuestion}</h3>
                    </div>
                    <div className="col-6 m-0 p-0">
                        <p className="text-end">Zostavajúci čas: <Timer numSec={time} /></p>
                    </div>
                </div>

                <p className="row m-0 font-weight-bold">{question}</p>
                <div className="row m-1">
                </div>

                {Object.entries(options).map(([key, value]) => (
                    <div key={key}>
                        <div className="btn-group-toggle m-1" role="group" >
                            <input id={key} type="checkbox" className="btn-check" autoComplete="off"></input>
                            <label className="btn btn-lg btn-secondary w-100 text-start" htmlFor={key} onClick={() => { setSelectedOptions(selectedOptions => setSet(selectedOptions, value["test_question_option_id"])) }}>
                                {value["option"]}
                            </label>
                        </div>
                    </div>
                ))}

                <div className="row m-2 justify-content-end">
                    <div className="col-auto p-0">
                        <a type="button" className="btn btn-primary" onClick={() => { afterSubmit() }}>Ulož odpoveď a choď ďalej</a>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default TestQuestionPage

