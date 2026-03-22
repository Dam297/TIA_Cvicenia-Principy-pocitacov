import Nav from "../components/Nav";
import DescriptionTestExercise from "../components/DescriptionTestExercise";



function DescriptionPage() {
    let itm = SAMPLE_TEST_DESCRIPTION
    return <>
        <Nav />
        <div className="row align-items-center justify-content-center" >
        <DescriptionTestExercise
                    header={itm.name}
                    paragraphs={itm.description}
                    needSuccess={itm.need}
                    maximalTime={itm.time_max}
                    bestSuccess={itm.best_attempt}
                    bestSuccessTime={itm.time_best_attempt}
                    buttonLink={itm.to}
                />
        </div>
    </>;
}

export default DescriptionPage

const SAMPLE_TEST_DESCRIPTION =
    {
        name: "Test",
        description: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec lacinia est, a vulputate eros. Suspendisse dolor turpis, faucibus vel molestie a, rhoncus a eros. Integer pharetra, ex id ultricies convallis, tortor nisi sollicitudin dui, quis mollis sapien lacus ac mi.",
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec lacinia est, a vulputate eros. Suspendisse dolor turpis, faucibus vel molestie a, rhoncus a eros. Integer pharetra, ex id ultricies convallis, tortor nisi sollicitudin dui, quis mollis sapien lacus ac mi."],
        need: "6/10",
        time_max: "45m",
        best_attempt: "-/10",
        time_best_attempt: "-",
        to: "/test_question"
    }
