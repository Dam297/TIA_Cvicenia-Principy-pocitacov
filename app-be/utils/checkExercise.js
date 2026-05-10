var { parseBooleanExpr, isCNF, isDNF, evalStr } = require('../utils/parserBoolean');

/* vráti true / false ak je odpoveď správna / nesprávna */
function checkExercise(id, question, correctAnswer, studentAnswer) {
    let numId = Number(id);
    if (numId <= 8) {
        return correctAnswer === (studentAnswer
            .replace(/^0+/, "") // odstránime nuly zo začiatku
            .replace(/,/g, ".")   // , -> .
            .toUpperCase()        // abcd -> ABCD
            .replace(/\s+/g, "")); // odstrániť prázdne znaky

    } else if (numId === 13) {
        /* DNF */
        try {
            if (studentAnswer.replace(/\s+/g, "") === correctAnswer.replace(/\s+/g, "")) return true;
            const str = parseBooleanExpr(studentAnswer);
            if (isDNF(str) === false) return false;
            var myTable = (JSON.parse(question))["tbody"];
            for (let i = 0; i < 2 * 2 * 2; i++) {
                let ev = evalStr(str, myTable[i]);
                if (ev !== ((myTable[i]["f(x, y, z)"] === 1) ? true : false)) return false;
            }
            return true;
        }
        catch {
            return false;
        }
    } else {
        return correctAnswer === (studentAnswer
            .replace(/,/g, ".")   // , -> .
            .toUpperCase()        // abcd -> ABCD
            .replace(/\s+/g, "")); // odstrániť prázdne znaky
    }
}


module.exports = { checkExercise };