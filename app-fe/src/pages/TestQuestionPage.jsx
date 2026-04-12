import Nav from "../components/Nav";
import Timer from "../components/Timer";
import { useState } from 'react'
import { Navigate } from "react-router-dom";
import { getTestQuestion } from "../services/databaseService";
import { getTestOptions } from "../services/databaseService";
import { useEffect, useRef } from "react";
import { endTestQuestion } from "../services/databaseService";
import { endTest } from "../services/databaseService";
import { getTestAttempt } from "../services/databaseService";

function secondsRemaining(date, sec) {
    const now = Date.now();
    const targetPlusX = new Date(date).getTime() + sec * 1000;
    return Math.floor((targetPlusX - now) / 1000);
}


function TestQuestionPage({par, setPar}) {
    const [numberQuestion, setNumberQuestion] = useState(0);
    const [countQuestion, setCountQuestion] = useState(0);
    const [question, setQuestion] = useState("");
    const [testQuestionAnswerId, setTestQuestionAnswerId] = useState("");
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState(new Set());
    const [navigateTo, setNavigateTo] = useState("");
    const [time, setTime] = useState(10);
    const fetched = useRef(false);

    let id = -1;
    if(par["TestID"] != null){
        id = par["TestID"];
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
        getTestQuestion({ "test_id": id, "user_id": 1 }).then(
            (list) => {
                setTestQuestionAnswerId(Number(list[0]["test_question_answer_id"]));
                setNumberQuestion(Number(list[0]["count_actual"]));
                setCountQuestion(Number(list[0]["count_maximum"]));
                setQuestion(list[0]["question"]);
                getTestOptions({ "test_question_id": list[0]["test_question_id"] }).then(
                    (list2) => {
                        setOptions(list2);
                    }
                )
            }
        )
    }

    function getTime() {
        getTestAttempt({ "test_id": id, "user_id": 1 }).then(
            (list) => {
                setTime(secondsRemaining(list[0]["start"], list[0]["max_time_s"]));
            }
        );
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

    function afterSubmit() {
        endTestQuestion({ "test_question_answer_id": testQuestionAnswerId, "answered_options": [...selectedOptions] }).then(
            setSelectedOptions(new Set())
        );
        setFalse();
        if ((numberQuestion + 1) > countQuestion) {
            endTest({ "test_id": id, "user_id": 1 });
            setNavigateTo("../end")
        } else {
            getDataQuestion();
            setNumberQuestion(numberQuestion + 1);
        }
    }

    return <>
        <Navigate to={navigateTo} />
        <Nav />
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

