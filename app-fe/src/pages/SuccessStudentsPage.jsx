import Nav from "../components/Nav";
import Header from "../components/Header"
import Table from "../components/Table";
import { getTestAttemptBest } from "../services/databaseService";
import { getExerciseAttemptBest } from "../services/databaseService";
import { getExercises } from "../services/databaseService";
import { getTests } from "../services/databaseService";
import { getStudents } from "../services/databaseService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NEEDSUCCESS } from "../Const";


function SuccessStudentsPage(props) {
    const [headerRow, setHeaderRow] = useState([])
    const [rowsArr, setRowsArr] = useState([])
    const navigate = useNavigate();

    // navigate to login page if not authenticated (based on React authState, not DB state) 
    useEffect(() => {
        if (!props.authStatus) {
            navigate('/login')
        }
    }, [props.authStatus]);


    async function loadExerciseForStudent(student_id, exercise_id, count_of_questions) {
        const attempt = await getExerciseAttemptBest({
            "user_id": student_id,
            "exercise_id": exercise_id,

        });
        const maximum = count_of_questions;
        const correct = attempt["count_correct"];
        const score = correct / maximum;
        let b = (score >= NEEDSUCCESS) ? true : false;

        return [((correct == null) ? "" : correct) + "/" + maximum, b];
    }

    async function loadTestForStudent(student_id, test_id, count_of_questions) {
        const attempt = await getTestAttemptBest({
            "user_id": student_id,
            "test_id": test_id,

        });
        const maximum = count_of_questions;
        const correct = attempt["count_correct"];
        const score = correct / maximum;
        let b = (score >= NEEDSUCCESS) ? true : false;

        return [((correct == null) ? "" : correct) + "/" + maximum, b];
    }


    async function loadData() {
        const students = await getStudents();
        const exercises = await getExercises();
        const tests = await getTests();

        setHeaderRow([
            "Meno", "Login",
            ...(exercises.map((value => value["name"]))),
            ...(tests.map((value => value["name"]))),
            "Zhrnutie"
        ]);

        let rowsArr = [];
        let j = 0;

        for (const student of students) {
            let newRow = [];
            let i = 2;
            let student_id = student["user_id"];
            let student_name = student["name"];
            let student_login = student["login"];
            let success = true;

            for (const exercise of exercises) {
                newRow[i] = await loadExerciseForStudent(student_id, exercise["exercise_id"], exercise["count_of_questions"]);
                if (newRow[i][1] === false) {
                    success = false;
                }
                i++;
            }

            for (const test of tests) {
                newRow[i] = await loadTestForStudent(student_id, test["test_id"], test["count_of_questions"]);
                if (newRow[i][1] === false) {
                    success = false;
                }
                i++;
            }

            newRow[0] = [student_name, success];
            newRow[1] = [student_login, success];
            newRow[i] = [(success) ? "OK" : "Fx", success];
            rowsArr[j++] = newRow;
        }

        setRowsArr(rowsArr);
    }

    // periodically refresh (timer)
    useEffect(() => {
        loadData();
        const fetchMessagesInterval = setInterval(() => {
            loadData();
        }, 10000);
        return () => clearInterval(fetchMessagesInterval);
    }, []);

    return <>
        <Nav />
        <Header name="Úspešnosť študentov" />
        <Table header_orig={headerRow} rows={rowsArr} />
    </>;
}

export default SuccessStudentsPage