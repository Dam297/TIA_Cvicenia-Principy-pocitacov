import { Link } from "react-router-dom";

function Button({ text, where, onClickButton}) {
    return (
        <Link className="btn btn-primary" to={where} onClick={onClickButton}>
            {text}
        </Link>
    );
}

export default Button