import HeaderBig from "../components/HeaderBig";
import Button from "../components/Button";



function LoginPage() {
    const header = "Vitajte na cvičeniach z predmetu Princípy počítačov";

    return <>
        <div className="d-flex flex-column justify-content-center  vh-100">
            <HeaderBig name={header} />

            <div className="row justify-content-center align-items-center mt-5">
                <div className="col-auto">
                    <Button text={"Prihlásiť sa"} where={"/"} />
                </div>
            </div>
        </div>
    </>
}

export default LoginPage