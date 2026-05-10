import Timer from "../components/Timer";

function ExerciseBox({ numberQuestion, countQuestion, time, question, isQuestion, answer, handleAnswer, correctAnswer, afterSubmit, isCorrect, id }) {
    let locQuestion = {};

    if (id === 13) {
        try {
            var myObj = JSON.parse(question);
            locQuestion = <>
                <p className="row m-0 font-weight-bold">{myObj["question"]}</p>
                <p className="row m-0 font-weight-bold">Poznámka: pri písaní môžete používať zátvorky, OR píšte ako znak +, AND píšte ako znak * alebo ho môžete vynechať, premenné píšte malým písmom a negované premenné píšte veľkým písmom</p>
                <div className="row align-items-center justify-content-left">
                    <div className="col-3 table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    {Object.entries(myObj["thead"]).map(([key, value]) => (
                                        <th className="text-center" key={key} scope="col">{value}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(myObj["tbody"]).map(([key, value]) => (
                                    <tr key={key}>
                                        {Object.entries(value).map(([k, v]) => (
                                            <td className="text-center" key={k}>
                                                {v}
                                            </td>
                                        ))
                                        }
                                    </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        }
        catch {
            return;
        }
    } else {
        locQuestion = <p className="row m-0 font-weight-bold">{question}</p>;
    }

    return <div className="row align-items-center justify-content-center" >
        <div className="col-10 bg-light p-4 m-3">
            <div className="row m-0">
                <div className="col-6 m-0 p-0">
                    <h3 className="text-start">{numberQuestion}/{countQuestion}</h3>
                </div>
                <div className="col-6 m-0 p-0">
                    <p className="text-end">Zostavajúci čas: <Timer numSec={time} /></p>
                </div>
            </div>
            {locQuestion}
            {isQuestion
                ?
                <input className="row m-0" value={answer} onChange={handleAnswer} type="text" minLength="1" className="form-control" placeholder="Odpoveď" aria-label="Odpoveď" ></input>
                :

                isCorrect
                    ?
                    <div>
                        <div className="row m-1"></div>
                        <h4 className="row m-0 text-success">Správne</h4>
                        <p className="row m-0"> Zadaná odpoveď: {answer}</p>
                        <p className="row m-0"> Správna odpoveď: {correctAnswer}</p>
                    </div>
                    :

                    <div>
                        <div className="row m-1"></div>
                        <h4 className="row m-0 text-danger">Nesprávne</h4>
                        <p className="row m-0"> Zadaná odpoveď: {answer}</p>
                        <p className="row m-0"> Správna odpoveď: {correctAnswer}</p>
                    </div>
            }
            <div className="row m-2 justify-content-end">
                <div className="col-auto p-0">
                    <a type="button" className="btn btn-primary" onClick={() => { afterSubmit() }}>
                        {isQuestion
                            ?
                            "Ulož odpoveď a choď ďalej"
                            :
                            "Ďalej"
                        }
                    </a>
                </div>
            </div>
        </div>
    </div>;
}


export default ExerciseBox