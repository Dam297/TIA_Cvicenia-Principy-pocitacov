import Nav from "../components/Nav";
import Header from "../components/Header"
import Table from "../components/Table";


function SuccessStudentsPage() {
    let headerRow = SAMPLE_SUCCESS_STUDENTS[0];
    let rowsObj = SAMPLE_SUCCESS_STUDENTS.slice(1);
    return <>
        <Nav />
        <Header name="Úspešnosť študentov" />
        <Table header_orig={headerRow} rows={rowsObj} />
    </>;
}

export default SuccessStudentsPage

const SAMPLE_SUCCESS_STUDENTS = [
    {
       name: "Meno",
       login: "Login",
       exercise1: "Prevod z 2 do 10 sústavy ",
       exercise2: "Prevod z 10 do 2 sústavy",
       exercise3: "Test",
       summary: "Zhrnutie"
    },
    
    {
       name: ["Janko Hráško", 0],
       login: ["hrasko1", 0],
       exercise1 : ["8/10", 1], 
       exercise2: ["1/10", 0], 
       exercise3: ["-", 0],
       summary: ["Fx", 0]
    },
    {
       name: ["Admin Admin", 1],
       login: ["admin1", 1],
       exercise1: ["10/10", 1], 
       exercise2: ["10/10", 0], 
       exercise3: ["10/10", 0],
       summary: ["OK", 1]
    }
     
];


