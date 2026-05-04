function generateOhm() {
    let obj = {};
    /* I patrí <0.01, 50.00 */

    let current = Math.round((Math.random() * 49.99 + 0.01) * 100) / 100;
    /* R patrí <1, 1000> */
    let resistance = (Math.ceil(Math.random() * 10000));
    /* U patrí <0.01, 50000 */
    let voltage = Math.round(current * resistance * 100) / 100;

    current = current.toFixed(2);
    resistance = resistance.toFixed(2);
    voltage = voltage.toFixed(2);

    const choose = Math.floor(Math.random() * 3);

    if (choose === 0) {
        obj["question"] = "Pomocou Ohmovho zákona výpočítajte prúd, ak napätie je " + voltage + "V a odpor je " + resistance + "Ω. Výsledok zaokruhlite na dve desatinné miesta, desatinnú čiarku píšte ako bodka";
        obj["correct_answer"] = current;
    } else if (choose === 1) {
        obj["question"] = "Pomocou Ohmovho zákona výpočítajte odpor, ak napätie je " + voltage + "V a prúd je " + current + "A. Výsledok zaokruhlite na dve desatinné miesta, desatinnú čiarku píšte ako bodka";
        obj["correct_answer"] = resistance;
    } else {
        obj["question"] = "Pomocou Ohmovho zákona výpočítajte napätie, ak prúd je " + current + "A a odpor je " + resistance + "Ω. Výsledok zaokruhlite na dve desatinné miesta, desatinnú čiarku píšte ako bodka";
        obj["correct_answer"] = voltage;
    }

    return obj;
}

module.exports = {generateOhm};