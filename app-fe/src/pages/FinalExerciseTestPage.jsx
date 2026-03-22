import Nav from "../components/Nav";
import HeaderSmall from "../components/HeaderSmall";
import Button from "../components/Button";

function FinalExerciseTestPage() {
    let finish = SAMPLE_FINISHED_TEST
    return <>
        <Nav />
        <div className="row align-items-center justify-content-center" >
            <div className="col-10 bg-light p-4 m-3">
                <HeaderSmall name={finish.name} />

                <p className="row m-0 font-weight-bold">Počet správnych otázok: {finish.n_good}</p>
                <p className="row m-0 font-weight-bold">Počet nesprávnych otázok: {finish.n_bad}</p>
                <p className="row m-0 font-weight-bold">Počet neodpovedaných otázok: {finish.n_empty}</p>
                <p className="row m-0 font-weight-bold">Počet získaných bodov: {finish.n_points}</p>
                <p className="row m-0 font-weight-bold">Čas: {finish.time}</p>


                <p className="row m-2 font-weight-bold justify-content-center align-items-center">{(finish.ok === 1) ? "Úspešný pokus" : "Neúspešný pokus"}</p>

                <div className="row m-2 justify-content-center">
                    <div className="col-auto p-0">
                        <Button text={"Ukončiť"} where="/" />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default FinalExerciseTestPage

const SAMPLE_FINISHED_TEST = 
    {
        name: "Test",
        n_good: 10,
        n_bad: 0,
        n_empty: 10,
        n_points: 10,
        time: "20m 15s",
        ok: 1
    };