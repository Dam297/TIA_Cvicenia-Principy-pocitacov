function generateSum() {
    let obj = {};
    let x1 =  Math.ceil(Math.random() * 100);
    let x2 =  Math.ceil(Math.random() * 100);

    let result = x1 + x2;
    
    obj["x1"] = x1;
    obj["x2"] = x2;
    obj["result"] = result;

    return obj;
}

module.exports = {generateSum};