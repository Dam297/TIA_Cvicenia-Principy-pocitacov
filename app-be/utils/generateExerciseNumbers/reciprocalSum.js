function generateReciprocalSum() {
    let obj = {};
    while (true) {
        let x1 = Math.ceil(Math.random() * 100);
        let x2 = Math.ceil(Math.random() * 100);

        let numerator = x1 + x2;
        let denominator = x1 * x2;

        let result = (Math.round((numerator / denominator) * 100) / 100).toFixed(2);
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