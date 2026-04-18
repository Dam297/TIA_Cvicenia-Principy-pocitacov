import Nav from "../components/Nav";
import DescriptionTestExercise from "../components/DescriptionTestExercise";
import { getExerciseAttemptBestDescription } from "../services/databaseService";
import { getTestAttemptBestDescription } from "../services/databaseService";
import { insertNewTestAttempt } from "../services/databaseService";
import { secondsToNormal } from "../utils/TimeFormate"
import { NEEDSUCCESS } from "../Const";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";


function DescriptionPage(props) {
    const navigate = useNavigate();
    const [descr, setDescr] = useState([]);
    let id = -1;
    let isExercise = false;

    // navigate to login page if not authenticated (based on React authState, not DB state) 
    useEffect(() => {
        if (!props.authStatus) {
            navigate('/login');
        }
    },
        [props.authStatus]);

    if (props.par["DescriptionPage"] != null) {
        id = props.par["DescriptionPage"].id;
        isExercise = props.par["DescriptionPage"].is_exercise;
    } else {
        navigate('/login');
    }

    async function startTest() {
        props.setPar({ "TestID": id });
        try {
            await insertNewTestAttempt({ "test_id": id });
            navigate('/test_question');
        } catch (error) {
            console.log(error);
            props.setError(error.message || "Error starting test");
            if (error.code === 401 || error.code === 402) {
                props.setAuthStatus(false);
                navigate("/login");
            }
        };
    }


    // periodically refresh (timer)
    useEffect(() => {
        if (isExercise) {
            getExerciseAttemptBestDescription({ "exercise_id": id }).then(
                (list) => setDescr(list[0])
            ).catch((error) => {
                console.error(error);
                props.setError(error.message || "Error getting exercise description");
                if (error.code === 401 || error.code === 402) {
                    props.setAuthStatus(false);
                    navigate("/login");
                }
            });
        } else {
            getTestAttemptBestDescription({ "test_id": id }).then(
                (list) => setDescr(list[0])
            ).catch((error) => {
                console.error(error);
                props.setError(error.message || "Error getting test description");
                if (error.code === 401 || error.code === 402) {
                    props.setAuthStatus(false);
                    navigate("/login");
                }
            });
        }


        const fetchMessagesInterval = setInterval(() => {
            if (isExercise) {
                getExerciseAttemptBestDescription({ "exercise_id": id }).then(
                    (list) => setDescr(list[0])
                ).catch((error) => {
                    console.error(error);
                    props.setError(error.message || "Error getting exercise description");
                    if (error.code === 401 || error.code === 402) {
                        props.setAuthStatus(false);
                        navigate("/login");
                    }
                });
            } else {
                getTestAttemptBestDescription({ "test_id": id }).then(
                    (list) => setDescr(list[0])
                ).catch((error) => {
                    console.error(error);
                    props.setError(error.message || "Error getting test description");
                    if (error.code === 401 || error.code === 402) {
                        props.setAuthStatus(false);
                        navigate("/login");
                    }
                });
            }
        }, 2000);
        return () => clearInterval(fetchMessagesInterval);
    }, []);

    return <>
        <Nav authStatus={props.authStatus} setAuthStatus={props.setAuthStatus} setError={props.setError} />
        <div className="row align-items-center justify-content-center" >
            <DescriptionTestExercise
                header={descr.name}
                paragraphs={descr.description}
                needSuccess={Math.floor(descr.count_of_questions * NEEDSUCCESS) + "/" + descr.count_of_questions}
                maximalTime={(descr.max_time_s === null) ? "" : secondsToNormal(descr.max_time_s, true)}
                bestSuccess={(descr.points === null) ? "" : descr.points + "/" + descr.count_of_questions}
                bestSuccessTime={(descr.sec === null) ? "" : secondsToNormal(descr.sec, true)}
                buttonLink={(isExercise === true) ? "../exercise" : ""}
                onClickButton={(isExercise) ? () => { props.setPar({ "ExerciseID": id }) } : () => { startTest() }}
            />
        </div>
    </>;
}

export default DescriptionPage