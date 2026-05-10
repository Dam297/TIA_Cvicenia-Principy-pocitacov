function generateOhm() {
    let obj = {};
    /* I patrí {1, 2, 3, 4, 5} */

    let current = Math.ceil(Math.random() * 5);
    /* R patrí {1000, 2000, 3000, 4000, 5000 }> */
    let resistance = (Math.ceil(Math.random()*5) * 1000);
    /* U patrí <1000, 25000> */
    let voltage = current * resistance;

    const choose = Math.floor(Math.random() * 3);

    if (choose === 0) {
        obj["question"] = "Pomocou Ohmovho zákona výpočítajte prúd, ak napätie je " + voltage + "V a odpor je " + resistance + "Ω. Výsledok zaokruhlite na celé číslo";
        obj["correct_answer"] = current;
    } else if (choose === 1) {
        obj["question"] = "Pomocou Ohmovho zákona výpočítajte odpor, ak napätie je " + voltage + "V a prúd je " + current + "A.  Výsledok zaokruhlite na celé číslo";
        obj["correct_answer"] = current;
        obj["correct_answer"] = resistance;
    } else {
        obj["question"] = "Pomocou Ohmovho zákona výpočítajte napätie, ak prúd je " + current + "A a odpor je " + resistance + "Ω.  Výsledok zaokruhlite na celé číslo";
        obj["correct_answer"] = current;
        obj["correct_answer"] = voltage;
    }

    return obj;
}

module.exports = {generateOhm};