import Nav from "../components/Nav";
import Header from "../components/Header"
import DescriptionTestExercise from "../components/DescriptionTestExercise";
import { getSuccessRateList } from "../services/databaseService";
import { NEEDSUCCESS, NEEDSUCCESSTEST } from "../Const";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { secondsToNormal } from "../utils/TimeFormate"

function ExerciseTestPage(props) {
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    // navigate to login page if not authenticated (based on React authState, not DB state) 
    useEffect(() => {
        if (!props.authStatus) {
            navigate("/");
        }
    }, [props.authStatus]);

    // periodically refresh (timer)
    useEffect(() => {
        getSuccessRateList().then(
            (list) => setList(list)
        ).catch((error) => {
            console.error(error);
            props.setError(error.message || "Error getting list of exercises and tests");
            if (error.code === 401 || error.code === 402) {
                props.setAuthStatus(false);
                navigate("/");
            }
        });

        const fetchInterval = setInterval(() => {
            getSuccessRateList().then(
                (list) => setList(list)
            ).catch((error) => {
                console.error(error);
                props.setError(error.message || "Error getting list of exercises and tests");
                if (error.code === 401 || error.code === 402) {
                    props.setAuthStatus(false);
                    navigate("/");
                }
            });
        }, 2000);
        return () => clearInterval(fetchInterval);
    }, []);

    return <>
        <Nav />
        <Header name="Cvičenia a testy" />
        <div className="row align-items-center justify-content-center" >
            {
                list.map((itm, i) => (
                    <DescriptionTestExercise
                        key={i}
                        header={itm.name}
                        paragraphs=""
                        needSuccess={(itm.is_exercise) ? (Math.floor(itm.count_of_questions * NEEDSUCCESS) + "/" + itm.count_of_questions) : (NEEDSUCCESSTEST)}
                        maximalTime={secondsToNormal(itm.max_time_s, true)}
                        bestSuccess={itm.points}
                        bestSuccessTime={secondsToNormal(itm.sec, true)}
                        buttonLink={"/description"}
                        onClickButton={() => { return props.setPar({ "DescriptionPage": { "id": itm.id, "is_exercise": itm.is_exercise } }) }}
                        buttonText="Detail"
                    />
                ))
            }
        </div>
    </>;
}

export default ExerciseTestPage