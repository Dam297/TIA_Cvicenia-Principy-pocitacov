import Nav from "../components/Nav";
import Header from "../components/Header"
import DescriptionTestExercise from "../components/DescriptionTestExercise";
import { getListExerciseTestUser } from "../services/databaseService";
import { NEEDSUCCESS } from "../Const";
import { useState } from "react";
import { useEffect } from "react";
import {secondsToNormal} from "../utils/TimeFormate"

function ExerciseTestPage() {
    const [list, setList] = useState([]);

    // periodically refresh (timer)
    useEffect(() => {
        getListExerciseTestUser().then(
            (list) => setList(list)
        );

        const fetchMessagesInterval = setInterval(() => {
            getListExerciseTestUser().then(
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
                        needSuccess={Math.floor(itm.count_of_questions * NEEDSUCCESS) + "/"+itm.count_of_questions}
                        maximalTime={secondsToNormal(itm.max_time_s, true)}
                        bestSuccess={itm.points}
                        bestSuccessTime={itm.sec}
                        buttonLink={"/description"}
                    />
                ))
            }

        </div>
    </>;
}

export default ExerciseTestPage