import Nav from "../components/Nav";
import Timer from "../components/Timer";
import { useState } from 'react';
import { Navigate } from "react-router-dom";




function ExercisePage() {
    const [number, setNumber] = useState(2);
    const [numberQuestion, setNumberQuestion] = useState(1);
    const [navigateTo, setNavigateTo] = useState("");    
    const [i, setI] = useState(3);



    let countQuestion = 10;
    let time = 30 * 60 * 60;
    let question = "Preveď číslo " + number + " z desiatkovej sústavy do dvojkovej sústavy (najpv významnejšie bity)";

    function afterSubmit() {
        if (numberQuestion >= countQuestion) {
            setNavigateTo("/");
        }
        setNumber(Math.floor(Math.random() * (2**i - 0 + 1)));
        setNumberQuestion(numberQuestion + 1);
        setI(i + 1);
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
                    <input type="text" maxLength="16" minLength="1" className="form-control" placeholder="Odpoveď" aria-label="Odpoveď" ></input>
                </div>

                <div className="row m-2 justify-content-end">
                    <div className="col-auto p-0">
                        <a type="button" className="btn btn-primary" onClick={() => { afterSubmit() }}>Ulož odpoveď a choď ďalej</a>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default ExercisePage
