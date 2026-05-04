var { generateNumber } = require('../utils/generateExerciseNumbers/conversionNumbers');
var { generateNumberBcd } = require('../utils/generateExerciseNumbers/conversionBcd');
var { generateOhm } = require('../utils/generateExerciseNumbers/ohm');
var { generateSum } = require('../utils/generateExerciseNumbers/sum');
var { generateReciprocalSum } = require('../utils/generateExerciseNumbers/reciprocalSum');

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
        case 7:
            obj = generateNumberBcd(10, 2);
            concreteExercise["question"] = "Preveďte číslo " + obj["from"] + " z 10 sústavy do BCD kódu";
            concreteExercise["correct_answer"] = obj["to"];
            break;
        case 8:
            obj = generateNumberBcd(2, 10);
            concreteExercise["question"] = "Preveďte číslo " + obj["from"] + " z BCD kódu do 10 sústavy";
            concreteExercise["correct_answer"] = obj["to"];
            break;
        case 9:
            obj = generateOhm();
            concreteExercise["question"] = obj["question"];
            concreteExercise["correct_answer"] = obj["correct_answer"];
            break;
        case 10:
            const choose = Math.floor(Math.random() * 2);
            console.log(choose);
            if (choose === 0) {
                obj = generateSum();
                concreteExercise["question"] = "Výpočítajte celkový odpor sériovo zapojených rezistorov, ak odpor prvého rezistora je " + obj["x1"] + "Ω a odpor druhého rezistora je " + obj["x2"] + "Ω. Výsledok zaokruhlite na dve desatinné miesta, desatinnú čiarku píšte ako bodka";
                concreteExercise["correct_answer"] = obj["result"];
            } else if (choose === 1) {
                obj = generateReciprocalSum();
                concreteExercise["question"] = "Výpočítajte celkový odpor paralelne zapojených rezistorov, ak odpor prvého rezistora je " + obj["x1"] + "Ω a odpor druhého rezistora je " + obj["x2"] + "Ω. Výsledok zaokruhlite na dve desatinné miesta, desatinnú čiarku píšte ako bodka";
                concreteExercise["correct_answer"] = obj["result"];
            }
            break;
        default:
    }
    return concreteExercise;
}

module.exports = { generateExercise };