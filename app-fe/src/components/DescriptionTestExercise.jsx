import Button from "./Button";
import Header from "./Header";
import HeaderSmall from "./HeaderSmall";

function DescriptionTestExercise({header, paragraphs, needSuccess, maximalTime, bestSuccess, bestSuccessTime, buttonLink}) {
    return (
        <div className="col-10 bg-light p-4 m-3">
            <HeaderSmall name={header} />
            {
                <p className="row m-0">{paragraphs}</p>
            }

            <div className="row m-0">
                <div className="col-5 p-0">
                    <p><strong>Potrebná úspešnosť: {needSuccess}</strong></p>
                </div>
                <div className="col-5 pl-1">
                    <p><strong>Maximálny čas úspešného pokusu: {maximalTime}</strong></p>
                </div>
                <div className="col-2 p-1">
                </div>
            </div>
            <div className="row m-0">
                <div className="col-5 p-0">
                    <p><strong>Najúspešnejší pokus: {bestSuccess} </strong></p>
                </div>
                <div className="col-5 pl-1">
                    <p><strong>Trvanie najúspešnejšieho pokusu: {bestSuccessTime}</strong></p>
                </div>
                <div className="col-2 p-1">
                    <Button text={"Spustiť"} where={buttonLink}/>
                </div>
            </div>
        </div>

    );
}

export default DescriptionTestExercise