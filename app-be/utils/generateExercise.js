var { generateNumber } = require('../utils/generateExerciseNumbers/conversionNumbers');
var { generateNumberBcd } = require('../utils/generateExerciseNumbers/conversionBcd');
var { generateOhm } = require('../utils/generateExerciseNumbers/ohm');
var { generateSum } = require('../utils/generateExerciseNumbers/sum');
var { generateReciprocalSum } = require('../utils/generateExerciseNumbers/reciprocalSum');
var { generateBinary } = require('../utils/generateExerciseNumbers/conversionBinary');

function generateExercise(id) {
    const concreteExercise = {};
    concreteExercise["question"] = "";
    concreteExercise["correct_answer"] = "";
    let obj = {};
    let choose = 0;
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
            choose = Math.floor(Math.random() * 2);
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
        case 11:
            choose = Math.floor(Math.random() * 2);
            console.log(choose);
            if (choose === 0) {
                obj = generateSum();
                concreteExercise["question"] = "Výpočítajte celkovú kapacitu paralelne zapojených kondenzátorov, ak kapacita prvého kondenzátora je " + obj["x1"] + "F a kapacita druhého kondenzátora je " + obj["x2"] + "F. Výsledok zaokruhlite na dve desatinné miesta, desatinnú čiarku píšte ako bodka";
                concreteExercise["correct_answer"] = obj["result"];
            } else if (choose === 1) {
                obj = generateReciprocalSum();
                concreteExercise["question"] = "Výpočítajte celkovú kapacitu sériovo zapojených kondenzátorov, ak kapacita prvého kondenzátora je " + obj["x1"] + "F a kapacita druhého kondenzátora je " + obj["x2"] + "F. Výsledok zaokruhlite na dve desatinné miesta, desatinnú čiarku píšte ako bodka";
                concreteExercise["correct_answer"] = obj["result"];
            }
            break;
        case 12:
            choose = Math.floor(Math.random() * 2);
            if (choose === 0) {
                obj = generateSum();
                concreteExercise["question"] = "Výpočítajte celkovú indukčnosť sériovo zapojených cievok, ak indukčnosť prvej cievky je " + obj["x1"] + "H a indukčnosť druhej cievky je " + obj["x2"] + "H. Výsledok zaokruhlite na dve desatinné miesta, desatinnú čiarku píšte ako bodka";
                concreteExercise["correct_answer"] = obj["result"];
            } else if (choose === 1) {
                obj = generateReciprocalSum();
                concreteExercise["question"] = "Výpočítajte celkovú indukčnosť paralelne zapojených cievok, ak indukčnosť prvej cievky je " + obj["x1"] + "H a indukčnosť druhej cievky je " + obj["x2"] + "H. Výsledok zaokruhlite na dve desatinné miesta, desatinnú čiarku píšte ako bodka";
                concreteExercise["correct_answer"] = obj["result"];
            }
            break;
        case 13:
            /* tabuľka boolovskej funkcie */
            let tab = {};
            tab["thead"] = { 0: "x", 1: "y", 2: "z", 3: "f(x, y, z)" }
            tab["question"] = "Vytvorte DNF (disjunktívna normálna forma) z Boolovskej funkcie f, danej ako nasledujúca tabuľka:";
            tab["tbody"] = {};
            tab["tbody"][0] = {};
            tab["tbody"][0]["x"] = 0;
            tab["tbody"][0]["y"] = 0;
            tab["tbody"][0]["z"] = 0;

            tab["tbody"][1] = {};
            tab["tbody"][1]["x"] = 0;
            tab["tbody"][1]["y"] = 0;
            tab["tbody"][1]["z"] = 1;

            tab["tbody"][2] = {};
            tab["tbody"][2]["x"] = 0;
            tab["tbody"][2]["y"] = 1;
            tab["tbody"][2]["z"] = 0;

            tab["tbody"][3] = {};
            tab["tbody"][3]["x"] = 0;
            tab["tbody"][3]["y"] = 1;
            tab["tbody"][3]["z"] = 1;

            tab["tbody"][4] = {};
            tab["tbody"][4]["x"] = 1;
            tab["tbody"][4]["y"] = 0;
            tab["tbody"][4]["z"] = 0;

            tab["tbody"][5] = {};
            tab["tbody"][5]["x"] = 1;
            tab["tbody"][5]["y"] = 0;
            tab["tbody"][5]["z"] = 1;

            tab["tbody"][6] = {};
            tab["tbody"][6]["x"] = 1;
            tab["tbody"][6]["y"] = 1;
            tab["tbody"][6]["z"] = 0;

            tab["tbody"][7] = {};
            tab["tbody"][7]["x"] = 1;
            tab["tbody"][7]["y"] = 1;
            tab["tbody"][7]["z"] = 1;

            while (true) {
                /* musí byť aspoň jedna nula a jedna jednotka  */
                let isZero = false;
                let isOne = false;
                let value;
                for (let i = 0; i < 2 * 2 * 2; i++) {
                    value = generateBinary();
                    if (value === 1) {
                        isOne = true;
                    }
                    if (value === 0) {
                        isZero = true;
                    }
                    tab["tbody"][i]["f(x, y, z)"] = value;
                }
                if (isZero && isOne) {
                    break;
                }
            }

            let correctAnswer = "";
            let first = true;

            for (let i = 0; i < 2 * 2 * 2; i++) {
                /* otázka */
                concreteExercise["question"] = JSON.stringify(tab);
                /* odpoveď */
                if (tab["tbody"][i]["f(x, y, z)"]) {
                    if (!first) {
                        correctAnswer = correctAnswer + " + ";
                    }

                    correctAnswer = correctAnswer + (tab["tbody"][i]["x"] === 0 ? "X" : "x");
                    correctAnswer = correctAnswer + (tab["tbody"][i]["y"] === 0 ? "Y" : "y");
                    correctAnswer = correctAnswer + (tab["tbody"][i]["z"] === 0 ? "Z" : "z");

                    if (first) {
                        first = false;
                    }
                }
            }
            concreteExercise["correct_answer"] = correctAnswer;

        default:
    }
    return concreteExercise;
}

module.exports = { generateExercise };