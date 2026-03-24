import Nav from "../components/Nav";
import Header from "../components/Header";
import Timer from "../components/Timer";
import { useState } from 'react'
import { Navigate } from "react-router-dom";





function TestQuestionPage() {
    const [numberQuestion, setNumberQuestion] = useState(0)
    const [navigateTo, setNavigateTo] = useState("")


    let test = SAMPLE_TEST_DESCRIPTION
    let question = SAMPLE_TEST_QUESTIONS[numberQuestion]


    function setFalse() {
        let list;
        list = document.getElementsByClassName("btn-check");
        for (let i = 0; i < list.length; i++) {
            list[i].checked = false;
        }
    }

    function afterSubmit() {
        setFalse();
        if ((numberQuestion + 1) >= test.count) {
            setNavigateTo("../end")
        } else {
            setNumberQuestion(numberQuestion + 1);
        }
    }

    return <>
        <Navigate to={navigateTo} />
        <Nav />
        <Header name={test.name} />
        <div className="row align-items-center justify-content-center" >
            <div className="col-10 bg-light p-4 m-3">
                <div className="row m-0">
                    <div className="col-6 m-0 p-0">
                        <h3 className="text-start">{numberQuestion + 1}/{test.count}</h3>
                    </div>
                    <div className="col-6 m-0 p-0">
                        <p className="text-end">Zostavajúci čas: {Timer(test.time)}</p>
                    </div>
                </div>

                <p className="row m-0 font-weight-bold">{question.question}</p>
                <div className="row m-1">
                </div>

                {Object.entries(question.options).map(([key, value]) => (
                    <div key={key}>
                        <div className="btn-group-toggle m-1" role="group">
                            <input id={key} type="checkbox" className="btn-check" autoComplete="off"></input>
                            <label className="btn btn-lg btn-secondary w-100 text-start" htmlFor={key}>
                                {value}
                            </label>
                        </div>
                    </div>
                ))}


                <div className="row m-2 justify-content-end">
                    <div className="col-auto p-0">
                        <a type="button" className="btn btn-primary" onClick={afterSubmit}>Ulož odpoveď a choď ďalej</a>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default TestQuestionPage


const SAMPLE_TEST_DESCRIPTION =
{
    time: 2400,
    count: 3
}

const SAMPLE_TEST_QUESTIONS = [
    {
        question: "Koľko je 10 + 10?",
        options: ["a) 20", "b) 0", "c) 100", "d) 10"]
    },
    {
        question: "Koľko je 10 - 10?",
        options: ["a) 0", "b) 10", "c) 100", "d) 20"]
    },
    {
        question: "Koľko je 10 * 10?",
        options: ["a) 20", "b) 100", "c) 0", "d) 10"]
    }
];