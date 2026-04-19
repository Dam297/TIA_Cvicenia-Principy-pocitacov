import { Link, useNavigate } from "react-router-dom";
import { logout } from '../services/authService';
import { getUserRole } from '../services/authService';
import { useState, useEffect } from 'react';


function Nav(props) {
    const navigate = useNavigate();
    const [teacher, setTeacher] = useState(false);

    function logoutClick() {
        logout()
            .then(() => {
                props.setAuthStatus(false);
                navigate("/");
                props.setError('');
            })
            .catch((error) => {
                console.log(error.message);
                props.setError(error.message)
            });
    }


    // periodically refresh (timer)
    useEffect(() => {
        getUserRole().then(
            (list) => setTeacher(list[0]["user_role"] === 'ucitel')
        ).catch((error) => {
            console.error(error);
            props.setError(error.message || "Error getting user role");
            if (error.code === 401 || error.code === 402) {
                props.setAuthStatus(false);
                navigate("/");
            }
        });

        const fetchInterval = setInterval(() => {
            getUserRole().then(
                (list) => setTeacher(list[0]["user_role"] === 'ucitel')
            ).catch((error) => {
                console.error(error);
                props.setError(error.message || "Error getting user role");
                if (error.code === 401 || error.code === 402) {
                    props.setAuthStatus(false);
                    navigate("/");
                }
            });
        }, 20000);
        return () => clearInterval(fetchInterval);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
            <div className="container-fluid">
                <a className="navbar-brand">Cvičenia Princípy počítačov</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav mr-auto">
                        {
                            teacher
                                ?
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/students'>
                                        Úspešnosť študentov
                                    </Link>
                                </li>
                                : ""
                        }
                        <li className="nav-item">
                            <Link className="nav-link" to="/list">
                                Cvičenia a testy
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">
                                Hodnotenie
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" onClick={logoutClick}>
                                Odhlásiť sa
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
