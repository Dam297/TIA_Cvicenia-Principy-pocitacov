import Nav from "../components/Nav";
import Header from "../components/Header"
import DescriptionTestExercise from "../components/DescriptionTestExercise";



function ExerciseTestPage() {
    return <>
        <Nav />
        <Header name="Cvičenia a testy" />
        <div className="row align-items-center justify-content-center" >
            {Object.entries(SAMPLE_EXERCISES_TESTS).map(([key, itm]) => (
                <DescriptionTestExercise
                    key={key}
                    header={itm.name}
                    paragraphs={itm.description}
                    needSuccess={itm.need}
                    maximalTime={itm.time_max}
                    bestSuccess={itm.best_attempt}
                    bestSuccessTime={itm.time_best_attempt}
                    buttonLink={itm.to}
                />
            ))}
        </div>
    </>;
}

export default ExerciseTestPage

const SAMPLE_EXERCISES_TESTS = [
    {
        name: "Prevod z 2 do 10 sústavy",
        description: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec lacinia est, a vulputate eros. Suspendisse dolor turpis, faucibus vel molestie a, rhoncus a eros. Integer pharetra, ex id ultricies convallis, tortor nisi sollicitudin dui, quis mollis sapien lacus ac mi."],
        need: "6/10",
        time_max: "20m",
        best_attempt: "8/10",
        time_best_attempt: "10m 20s",
        to: "/description"
    },
    {
        name: "Prevod z 10 do 2 sústavy",
        description: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec lacinia est, a vulputate eros. Suspendisse dolor turpis, faucibus vel molestie a, rhoncus a eros. Integer pharetra, ex id ultricies convallis, tortor nisi sollicitudin dui, quis mollis sapien lacus ac mi."],
        need: "6/10",
        time_max: "20m",
        best_attempt: "1/10",
        time_best_attempt: "20s",
        to: "/description"
    },
    {
        name: "Test",
        description: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec lacinia est, a vulputate eros. Suspendisse dolor turpis, faucibus vel molestie a, rhoncus a eros. Integer pharetra, ex id ultricies convallis, tortor nisi sollicitudin dui, quis mollis sapien lacus ac mi."],
        need: "6/10",
        time_max: "45m",
        best_attempt: "-/10",
        time_best_attempt: "-",
        to: "/description"
    }
];
