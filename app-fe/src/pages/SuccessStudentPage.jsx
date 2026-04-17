import Nav from "../components/Nav";
import Header from "../components/Header"
import Table from "../components/Table";
import { getSuccessRateSpecificStudent } from "../services/databaseService";
import { NEEDSUCCESS } from "../Const";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { secondsToNormal } from "../utils/TimeFormate"


function SuccessStudentPage(props) {
    const [rowsObj, setRowsObj] = useState([]);
    const navigate = useNavigate();

    // navigate to login page if not authenticated (based on React authState, not DB state) 
    useEffect(() => {
        if (!props.authStatus) {
            navigate('/login')
        }
    },[props.authStatus]);


    function processData(list) {
        const output = list.map(item => {
            const result = {};
            const score = item["points"] / item["count_of_questions"];
            let b = (score >= NEEDSUCCESS) ? 1 : 0;

            result["name"] = [item["name"], b];
            result["best_attempt"] = [((item["points"] === null) ? "" : item["points"]) + "/" + item["count_of_questions"], b];
            result["time_best_attempt"] = [((item["sec"] === null) ? "" : secondsToNormal(item["sec"], true)), b];
            return result;
        });
        return output;
    }

    // periodically refresh (timer)
    useEffect(() => {
        getSuccessRateSpecificStudent().then(
            (list) => setRowsObj(processData(list))
        );

        const fetchMessagesInterval = setInterval(() => {
            getSuccessRateSpecificStudent().then(
                (list) => setRowsObj(processData(list))
            );
        }, 2000);
        return () => clearInterval(fetchMessagesInterval);
    }, []);

    

    let headerRow = {
        "name": "Názov",
        "best_attempt": "Najúspešnejší pokus",
        "time_best_attempt": "Trvanie najúspešnejšieho pokusu"
    };

    return <>
        <Nav />
        <Header name="Hodnotenie" />
        <Table header_orig={headerRow} rows={rowsObj} />
    </>;
}

export default SuccessStudentPage