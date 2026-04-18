import HeaderBig from "../components/HeaderBig";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { login } from '../services/authService';
import { useState } from "react";



function LoginPage(props) {
    const header = "Vitajte na cvičeniach z predmetu Princípy počítačov";
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);


    const submit = (e) => {
        e.preventDefault();

        if (username === '' || password === '') {
            props.setError('Zadajte správny login a heslo');
            return;
        }

        login(username, password)
            .then(() => {
                props.setAuthStatus(true);
                navigate('/');
            })
            .catch((error) => {
                console.log(error.message);
                props.setError(error.message)
                return;
            });

        // reset error message if the form is valid
        props.setError('');
    }

    return <>
        <div className="d-flex flex-column justify-content-center  vh-100">
            <HeaderBig name={header} />

            <div className="row justify-content-center align-items-center mt-5">
                <div className="col-auto">

                    <form onSubmit={submit}>
                        <div className="form-group">
                            <label htmlFor="username">Login</label>
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                value={username}
                                onChange={handleUsernameChange}
                                placeholder="Zadajte login"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Heslo</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Zadajte heslo"
                            />
                        </div>
                        <button className="btn btn-primary" >Prihlásiť sa</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default LoginPage