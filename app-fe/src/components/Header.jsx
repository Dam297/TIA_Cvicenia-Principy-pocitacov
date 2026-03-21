function Header({ name }) {
    return (
        <div className="row align-items-center justify-content-center">
            <div className="col-8">
                <h2 className="text-center">{name}</h2>
            </div>
        </div>
    );
}

export default Header