import Nav from "../components/Nav";
import Header from "../components/Header"
import DescriptionTestExercise from "../components/DescriptionTestExercise";
import { getSuccessRateList } from "../services/databaseService";
import { NEEDSUCCESS } from "../Const";
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
            navigate('/login')
        }
    },[props.authStatus]);

    // periodically refresh (timer)
    useEffect(() => {
        getSuccessRateList().then(
            (list) => setList(list)
        );

        const fetchMessagesInterval = setInterval(() => {
            getSuccessRateList().then(
                (list) => setList(list)
            );
        }, 2000);
        return () => clearInterval(fetchMessagesInterval);
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
                        paragraphs={itm.description}
                        needSuccess={Math.floor(itm.count_of_questions * NEEDSUCCESS) + "/" + itm.count_of_questions}
                        maximalTime={secondsToNormal(itm.max_time_s, true)}
                        bestSuccess={itm.points}
                        bestSuccessTime={itm.sec}
                        buttonLink={"/description"}
                        onClickButton={() => { return props.setPar({ "DescriptionPage": { "id": itm.id, "is_exercise": itm.is_exercise } }) }}
                    />
                ))
            }
        </div>
    </>;
}

export default ExerciseTestPage