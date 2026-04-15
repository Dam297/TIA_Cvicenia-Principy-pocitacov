import HeaderBig from "../components/HeaderBig";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { login } from '../services/authService';



function LoginPage(props) {
    const header = "Vitajte na cvičeniach z predmetu Princípy počítačov";
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();

        login("hrasko1234").then(() => {
            props.setAuthStatus(true);
            navigate('/');
        })
        .catch((error) => {
            console.log(error.message);
        });
    }

    return <>
        <div className="d-flex flex-column justify-content-center  vh-100">
            <HeaderBig name={header} />

            <div className="row justify-content-center align-items-center mt-5">
                <div className="col-auto">
                    <Button text={"Prihlásiť sa"} where={"/"} onClickButton={submit} />
                </div>
            </div>
        </div>
    </>
}

export default LoginPage