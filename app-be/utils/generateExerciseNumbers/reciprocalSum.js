function generateReciprocalSum() {
    let obj = {};
    while (true) {
        let x1 = Math.ceil(Math.random() * 10) + 1;
        let x2 = Math.ceil(Math.random() * 10 + (x1 /(x1 - 1)));

        let numerator = x1 + x2;
        let denominator = x1 * x2;

        let result = Math.round((numerator / denominator));
        if(result == 0){
            continue;
        }
        obj["x1"] = x1;
        obj["x2"] = x2;
        obj["result"] = result;

        return obj;
    }

}

module.exports = { generateReciprocalSum };