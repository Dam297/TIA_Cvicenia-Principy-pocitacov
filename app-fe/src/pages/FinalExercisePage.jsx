import Nav from "../components/Nav";
import HeaderSmall from "../components/HeaderSmall";
import Button from "../components/Button";
import { useState } from 'react'
import { useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { getExerciseAttemptLast } from "../services/databaseService";
import { secondsToNormal } from "../utils/TimeFormate"
import { NEEDSUCCESS } from "../Const";


function FinalExercisePage(props) {
    const [data, setData] = useState({});
    const fetched = useRef(false);

    const navigate = useNavigate();

    // navigate to login page if not authenticated (based on React authState, not DB state) 
    useEffect(() => {
        if (!props.authStatus) {
            navigate("/");
        }
    },[props.authStatus]);


    let id = -1;
    if(props.par["ExerciseID"] != null ){
        id = props.par["ExerciseID"];
    } 

     function getData() {
        getExerciseAttemptLast({ "exercise_id": id}).then(
            (list) => {
                setData(list[0]);
            }
        ).catch((error) => {
            console.error(error);
            props.setError(error.message || "Error getting result of exercise");
            if (error.code === 401 || error.code === 402) {
                props.setAuthStatus(false);
                navigate("/");
            }
        });
    }
    
    useEffect(() => {
            if (fetched.current) return;
            fetched.current = true;
            getData();
        }, []);
    

    return <>
        <Nav authStatus={props.authStatus} setAuthStatus={props.setAuthStatus} setError={props.setError}/>
        <div className="row align-items-center justify-content-center" >
            <div className="col-10 bg-light p-4 m-3">
                <HeaderSmall name={data["name"]} />
                <p className="row m-0 font-weight-bold">Počet správnych odpovedí: {data["count_correct"]}</p>
                <p className="row m-0 font-weight-bold">Počet nesprávnych odpovedí: {data["count_questions"] - data["count_correct"]}</p>
                <p className="row m-0 font-weight-bold">Počet získaných bodov: {data["count_correct"]}</p>
                <p className="row m-0 font-weight-bold">Čas: {secondsToNormal(data["sec"], true)}</p>

                <p className="row m-2 font-weight-bold justify-content-center align-items-center">{((data["sec"] <= data["max_time"]) && ((Number(data["count_correct"]) / Number(data["count_questions"])) >= NEEDSUCCESS)) ? "Úspešný pokus" : "Neúspešný pokus"}</p>

                <div className="row m-2 justify-content-center">
                    <div className="col-auto p-0">
                        <Button text={"Ukončiť"} where="/home" onClickButton={() => {props.setPar({})}} />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default FinalExercisePage