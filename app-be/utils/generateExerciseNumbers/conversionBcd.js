/* inšpirované z http://www.dcs.fmph.uniba.sk/bakalarky/obhajene/Detail.php?id=428 */
let bcdCode = new Map([
    [0, "0000"],
    [1, "0001"],
    [2, "0010"],
    [3, "0011"],
    [4, "0100"],
    [5, "0101"],
    [6, "0110"],
    [7, "0111"],
    [8, "1000"],
    [9, "1001"],
]);


function getByValue(searchValue) {
  for (const [key, value] of bcdCode)
    if (value === searchValue) return key;
  return null;
}


function decToBcd(generated) {
    let tmp = "";
    do {
        tmp = bcdCode.get(generated % 10) + tmp;
        generated = Math.floor(generated / 10);
    } while (generated != 0);

    return tmp;

}

function generateNumberBcd(fromRadix, toRadix) {
    let obj = {};
    obj["from"] = 0;
    obj["to"] = 0;
    let decNumber = Math.floor(Math.random() * 9000) + 1000;
    let bcdNumber = decToBcd(decNumber);

    if ((fromRadix === 10) && (toRadix === 2)) {
        obj["from"] = decNumber;
        obj["to"] = bcdNumber;
    } else if ((fromRadix === 2) && (toRadix === 10)) {
        obj["from"] = bcdNumber;
        obj["to"] = decNumber;
    }
    return obj;
}

module.exports = {generateNumberBcd};