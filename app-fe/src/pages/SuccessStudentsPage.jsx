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
import { NEEDSUCCESS, NEEDSUCCESSTEST } from "../Const";


function SuccessStudentsPage(props) {
    const [headerRow, setHeaderRow] = useState([])
    const [rowsArr, setRowsArr] = useState([])
    const navigate = useNavigate();

    // navigate to login page if not authenticated (based on React authState, not DB state) 
    useEffect(() => {
        if (!props.authStatus) {
            navigate("/");
        }
    }, [props.authStatus]);


    async function loadExerciseForStudent(student_id, exercise_id, count_of_questions) {
        try {
            const attempt = await getExerciseAttemptBest({
                "user_id": student_id,
                "exercise_id": exercise_id,
            });
            const maximum = count_of_questions;
            const correct = attempt["count_correct"];
            const score = correct / maximum;
            let b = (score >= NEEDSUCCESS) ? true : false;
            props.setError('');

            return [((correct == null) ? "" : correct) + "/" + maximum, b];
        } catch (error) {
            console.log(error);
            props.setError(error.message || "Error getting success rate of exercise");
            if (error.code === 401 || error.code === 402) {
                props.setAuthStatus(false);
                navigate("/");
            }
            return;
        };

    }

    async function loadTestForStudent(student_id, test_id) {
        try {
            const attempt = await getTestAttemptBest({
                "user_id": student_id,
                "test_id": test_id,
            });
            if (attempt.length > 0) {
                const correct = attempt[0]["sum_points"];
                let b = (correct >= NEEDSUCCESSTEST) ? true : false;
                return [((correct == null) ? "" : correct), false];
            }
            return ["", false];
            props.setError('');
        } catch (error) {
            console.log(error);
            props.setError(error.message || "Error getting success rate of test");
            if (error.code === 401 || error.code === 402) {
                props.setAuthStatus(false);
                navigate("/");
            }
            return ["error", false];
        };
    }


    async function loadData() {
        let students;
        let exercises;
        let tests;
        try {
            students = await getStudents();
            props.setError('');
        } catch (error) {
            console.log(error);
            props.setError(error.message || "Error getting students");
            if (error.code === 401 || error.code === 402) {
                props.setAuthStatus(false);
                navigate("/");
            }
            return;
        };
        try {
            exercises = await getExercises();
            props.setError('');
        } catch (error) {
            console.log(error);
            props.setError(error.message || "Error getting exercises");
            if (error.code === 401 || error.code === 402) {
                props.setAuthStatus(false);
                navigate("/");
            }
            return;
        };
        try {
            tests = await getTests();
            props.setError('');
        } catch (error) {
            console.log(error);
            props.setError(error.message || "Error getting tests");
            if (error.code === 401 || error.code === 402) {
                props.setAuthStatus(false);
                navigate("/");
            }
            return;
        };
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
                newRow[i] = await loadTestForStudent(student_id, test["test_id"]);
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
        setTimeout(() => {
            loadData();
        }, 0);
        const fetchInterval = setInterval(() => {
            loadData();
        }, 10000);
        return () => clearInterval(fetchInterval);
    }, []);

    return <>
        <Nav authStatus={props.authStatus} setAuthStatus={props.setAuthStatus} setError={props.setError} />
        <Header name="Úspešnosť študentov" />
        <Table header_orig={headerRow} rows={rowsArr} />
    </>;
}

export default SuccessStudentsPage