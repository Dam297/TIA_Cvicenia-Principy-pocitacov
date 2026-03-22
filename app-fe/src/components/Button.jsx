import { Link } from "react-router-dom";

function Button({ text, where }) {
    return (
        <Link className="btn btn-primary" to={where}>
            {text}
        </Link>
    );
}

export default Button