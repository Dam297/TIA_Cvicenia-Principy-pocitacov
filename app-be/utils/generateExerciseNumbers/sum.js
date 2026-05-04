function generateSum() {
    let obj = {};
    let x1 =  Math.round(Math.random() * 100 * 100) / 100;
    let x2 =  Math.round(Math.random() * 100 * 100) / 100;

    let result = (Math.round((x1 + x2) * 100) / 100).toFixed(2);
    
    obj["x1"] = x1.toFixed(2);
    obj["x2"] = x2.toFixed(2);
    obj["result"] = result;

    return obj;
}

module.exports = {generateSum};