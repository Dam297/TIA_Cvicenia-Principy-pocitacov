import Nav from "../components/Nav";
import DescriptionTestExercise from "../components/DescriptionTestExercise";
import { getExerciseDescription } from "../services/databaseService";
import { getTestDescription } from "../services/databaseService";
import { insertNewTestAttempt } from "../services/databaseService";
import { secondsToNormal } from "../utils/TimeFormate"
import { NEEDSUCCESS } from "../Const";
import { useState } from "react";
import { useEffect } from "react";



function DescriptionPage({par, setPar}) {
    const [descr, setDescr] = useState([]);
    let id = -1;
    let isExercise = false;

    if(par["DescriptionPage"] != null){
        id = par["DescriptionPage"].id;
        isExercise = par["DescriptionPage"].is_exercise;
    }
    
    // periodically refresh (timer)
    useEffect(() => {
        if (isExercise) {
            getExerciseDescription({ "exercise_id": id }).then(
                (list) => setDescr(list[0])
            );
        } else {
            getTestDescription({ "test_id": id }).then(
                (list) => setDescr(list[0])
            );
        }


        const fetchMessagesInterval = setInterval(() => {
            if (isExercise) {
                getExerciseDescription({ "exercise_id": id }).then(
                    (list) => setDescr(list[0])
                );
            } else {
                getTestDescription({ "test_id": id }).then(
                    (list) => setDescr(list[0])
                );
            }
        }, 2000);
        return () => clearInterval(fetchMessagesInterval);
    }, []);

    return <>
        <Nav />
        <div className="row align-items-center justify-content-center" >
            <DescriptionTestExercise
                header={descr.name}
                paragraphs={descr.description}
                needSuccess={Math.floor(descr.count_of_questions * NEEDSUCCESS) + "/" + descr.count_of_questions}
                maximalTime={(descr.max_time_s === null) ? "" : secondsToNormal(descr.max_time_s, true)}
                bestSuccess={(descr.points === null) ? "" : descr.points + "/" + descr.count_of_questions}
                bestSuccessTime={(descr.sec === null) ? "" : secondsToNormal(descr.sec, true)}
                buttonLink={(isExercise === true) ? "../exercise" : "../test_question"}
                onClickButton={(isExercise) ? () => {setPar({"ExerciseID": id})} : () => {setPar({"TestID": id}); insertNewTestAttempt({ "user_id": 1, "test_id": id }) }}
            />
        </div>
    </>;
}

export default DescriptionPage