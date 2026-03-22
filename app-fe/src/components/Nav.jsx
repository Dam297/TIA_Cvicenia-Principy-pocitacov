import { Link } from "react-router-dom";

function Nav() {
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
                        <li className="nav-item">
                            <Link className="nav-link" to="/students">
                                Úspešnosť študentov
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/list">
                                Cvičenia a testy
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Hodnotenie
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/">
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
