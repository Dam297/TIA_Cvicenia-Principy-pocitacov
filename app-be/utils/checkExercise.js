var { parseBooleanExpr, isCNF, isDNF, evalStr } = require('../utils/parserBoolean');

/* vráti true / false ak je odpoveď správna / nesprávna */
function checkExercise(id, question, correctAnswer, studentAnswer) {
    switch (Number(id)) {
        /* DNF */
        case 13:
            try {
                if(studentAnswer.replace(/\s+/g, "") === correctAnswer) return true;
                const str = parseBooleanExpr(studentAnswer);
                if (isDNF(str) === false) return false;
                var myTable = (JSON.parse(question))["tbody"];
                console.log(myTable);
                for (let i = 0; i < 2 * 2 * 2; i++) {
                    if (evalStr(str, myTable[i]) !== ((myTable[i]["v"] == 1) ? true : false)) return false;
                }
                return true;
            }
            catch {
                return false;
            }
            break;
            try {
                const str = parseBooleanExpr(studentAnswer);
                if (isCNF(str) === false) return false;
                var myTable = (JSON.parse(question))["tbody"];
                for (let i = 0; i < 2 * 2 * 2; i++) {
                    if (evalStr(str, { x: Number(myTable[i]["x"]), y: Number(myTable[i]["y"]), z: Number(myTable[i]["z"]) }) !== (Number(myTable[i]["v"]) === 1 ? true : false)) return false;
                }
                return true;
            }
            catch {
                return false;
            }
            break;
        default:
            return correctAnswer === (studentAnswer
                .replace(/,/g, ".")   // , -> .
                .toUpperCase()        // abcd -> ABCD
                .replace(/\s+/g, "")); // odstrániť prázdne znaky
    }
}

module.exports = { checkExercise };