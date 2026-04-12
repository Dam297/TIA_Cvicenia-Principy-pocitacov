import Nav from "../components/Nav";
import HeaderSmall from "../components/HeaderSmall";
import Button from "../components/Button";
import { useState } from 'react'
import { useEffect, useRef} from "react";
import { Navigate } from "react-router-dom";
import { getFinalTestAttempt } from "../services/databaseService";
import { secondsToNormal } from "../utils/TimeFormate"
import { NEEDSUCCESSTEST } from "../Const";


function FinalExerciseTestPage({par, setPar}) {
    const [data, setData] = useState(0);
    const fetched = useRef(false);

    let id = -1;
    if(par["TestID"] != null ){
        id = par["TestID"];
    } else if(par["ExerciseID"] != null){
        id = par["ExerciseID"];
    }

     function getData() {
        getFinalTestAttempt({ "test_id": id, "user_id": 1 }).then(
            (list) => {
                console.log(list);
                setData(list[0]);
            }
        )
    }
    
    useEffect(() => {
            if (fetched.current) return;
            fetched.current = true;
            getData();
        }, []);
    


    return <>
        <Nav />
        <div className="row align-items-center justify-content-center" >
            <div className="col-10 bg-light p-4 m-3">
                <HeaderSmall name={data["name"]} />

                <p className="row m-0 font-weight-bold">Počet správnych otázok: {data["count_correct"]}</p>
                <p className="row m-0 font-weight-bold">Počet nesprávnych otázok: {data["count_incorrect"]}</p>
                <p className="row m-0 font-weight-bold">Počet neodpovedaných otázok: {data["count_empty"]}</p>
                <p className="row m-0 font-weight-bold">Počet získaných bodov: {data["count_correct"]*1 + data["count_incorrect"]*-2 + data["count_empty"]*-1}</p>
                <p className="row m-0 font-weight-bold">Čas: {secondsToNormal(data["sec"], true)}</p>


                <p className="row m-2 font-weight-bold justify-content-center align-items-center">{((data["count_correct"]*1 + data["count_incorrect"]*-2 + data["count_empty"]*-1) >= NEEDSUCCESSTEST) ? "Úspešný pokus" : "Neúspešný pokus"}</p>

                <div className="row m-2 justify-content-center">
                    <div className="col-auto p-0">
                        <Button text={"Ukončiť"} where="/" onClickButton={() => {setPar({})}} />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default FinalExerciseTestPage