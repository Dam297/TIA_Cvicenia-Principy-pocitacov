/* inšpirované z http://www.dcs.fmph.uniba.sk/bakalarky/obhajene/Detail.php?id=428 */

function generateNumber(fromRadix, toRadix) {
    /* číslo z intervalu <96, 4096> */
    let number = (Math.floor(Math.random() * 4000) + 96);
    let from = number.toString(fromRadix).toUpperCase();
    let to = number.toString(toRadix).toUpperCase();
    let obj = {};
    obj["from"] = from;
    obj["to"] = to;
    return obj;
}

module.exports = {generateNumber};