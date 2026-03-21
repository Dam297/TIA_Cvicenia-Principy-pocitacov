import Nav from "../components/Nav";
import Header from "../components/Header"
import Table from "../components/Table";


function SuccessStudentPage() {
    let headerRow = SAMPLE_SUCCESS_STUDENT[0];
    let rowsObj = SAMPLE_SUCCESS_STUDENT.slice(1);
    return <>
        <Nav />
        <Header name="Hodnotenie" />
        <Table header_orig={headerRow} rows={rowsObj} />
    </>;
}

export default SuccessStudentPage


const SAMPLE_SUCCESS_STUDENT = [
    {
        name: "Názov",
        best_attempt: "Najúspešnejší pokus",
        time_best_attempt: "Trvanie najúspešnejšieho pokusu"
    },
    {
        name: ["Prevod z 2 do 10 sústavy", 1],
        best_attempt: ["8/10", 1],
        time_best_attempt: ["10m 20s", 1]
    },
    {
        name: ["Prevod z 10 do 2 sústavy", 0],
        best_attempt: ["1/10", 0],
        time_best_attempt: ["20s", 0]
    },
    {
        name: ["Test", 0],
        best_attempt: ["-/10", 0],
        time_best_attempt: ["-", 0]
    }
];
