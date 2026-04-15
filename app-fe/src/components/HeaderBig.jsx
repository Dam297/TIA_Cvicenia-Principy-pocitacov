function Header({ name }) {
    return (
        <div className="row align-items-center justify-content-center">
            <div className="col-auto">
                <h1 className="text-center">{name}</h1>
            </div>
        </div>
    );
}

export default Header