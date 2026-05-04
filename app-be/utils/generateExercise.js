var { generateNumber } = require('../utils/generateExerciseNumbers/conversionNumbers');

function generateExercise(id) {
    const concreteExercise = {};
    concreteExercise["question"] = "";
    concreteExercise["correct_answer"] = "";
    let obj = {};
    switch (Number(id)) {
        case 1:
            obj = generateNumber(10, 2);
            concreteExercise["question"] = "Preveďte číslo " + obj["from"] + " z 10 do 2 sústavy";
            concreteExercise["correct_answer"] = obj["to"];
            break;
        case 2:
            obj = generateNumber(2, 10);
            concreteExercise["question"] = "Preveďte číslo " + obj["from"] + " z 2 do 10 sústavy";
            concreteExercise["correct_answer"] = obj["to"];
            break;
        case 3:
            obj = generateNumber(10, 16);
            concreteExercise["question"] = "Preveďte číslo " + obj["from"] + " z 10 do 16 sústavy (znaky abecedy píšte veľkými písmenami)";
            concreteExercise["correct_answer"] = obj["to"];
            break;
        case 4:
            obj = generateNumber(16, 10);
            concreteExercise["question"] = "Preveďte číslo " + obj["from"] + " z 16 do 10 sústavy";
            concreteExercise["correct_answer"] = obj["to"];
            break;
        case 5:
            obj = generateNumber(2, 16);
            concreteExercise["question"] = "Preveďte číslo " + obj["from"] + " z 2 do 16 sústavy (znaky abecedy píšte veľkými písmenami)";
            concreteExercise["correct_answer"] = obj["to"];
            break;
        case 6:
            obj = generateNumber(16, 2);
            concreteExercise["question"] = "Preveďte číslo " + obj["from"] + " z 16 do 2 sústavy";
            concreteExercise["correct_answer"] = obj["to"];
            break;
        default:
        // code block
    }
    return concreteExercise;
}

module.exports = { generateExercise };