/* Pre parsovanie mi bola poskytnutá pomoc od prednášajúceho */

/* Gramatika */

// Expr ->  And
// Expt -> And + And

// And -> Factor
// And -> Factor * Factor
// And -> Factor Factor

//Factor -> VAR
//Factor -> ( Expr )

// malé písmeno - premenná
// veľké písmeno - negovaná premenná

function tokenize(input) {
    const tokens = [];
    const str = input.replace(/\s+/g, "");

    for (let i = 0; i < str.length; i++) {
        const c = str[i];
        if (/[a-zA-Z]/.test(c)) {
            tokens.push({ type: "VAR", value: c })
        }
        else if (c === "+") tokens.push({ type: "OR" });
        else if (c === "*") tokens.push({ type: "AND" });
        else if (c === "(") tokens.push({ type: "LPAR" });
        else if (c === ")") tokens.push({ type: "RPAR" });
        else throw new Error();
    }
    return tokens;
}

function parseBooleanExpr(input) {
    const tokens = tokenize(input);
    let pos = 0;

    function peek() {
        return tokens[pos] || null;
    }

    function consume(type) {
        const token = peek();
        if (!token || token.type !== type) {
            throw new Error();
        }
        pos++;
        return token;
    }

    function parseFactor() {
        const token = peek();
        if (!token) {
            throw new Error();
        }
        if (token.type === "VAR") {
            const lit = consume("VAR");
            return { type: "VAR", name: lit.value };
        }
        if (token.type === "LPAR") {
            consume("LPAR");
            const expr = parseExpr();
            consume("RPAR");
            return { type: "Par", expr };
        }
        throw new Error();
    }

    function parseAnd() {
        let left = parseFactor();
        while (true) {
            const token = peek();
            if (token && (token.type === "AND" || token.type === "VAR" || token.type === "LPAR")) {
                if (token.type === "AND") {
                    consume("AND");
                }
                const right = parseFactor();
                left = { type: "And", left, right };
            } else break;
        }
        return left;
    }

    function parseExpr() {
        let left = parseAnd();
        while (peek() && peek().type === "OR") {
            consume("OR");
            const right = parseAnd();
            left = { type: "Or", left, right };
        }
        return left;
    }

    const str = parseExpr();
    if (pos !== tokens.length) {
        throw new Error();
    }
    return str;
}

// parsovanie výrazu
function isBooleanExpr(str) {
    try { parseBooleanExpr(str); return true; }
    catch { return false; }
}




function toBool(v) {
    if (v === 1 || v === true) {
        return true;
    } else {
        return false;
    }
}

// vyhodnotenie literálu 
function evalVAR(lit, values) {
    // zisťujeme či je to negovaný literál
    const isNeg = (lit === lit.toUpperCase());
    const base = lit.toLowerCase();
    if (!(base in values)) {
        // ak nemáme hodnotu vrátime chybu
        throw new Error();
    }
    const val = toBool(values[base]);
    return isNeg ? !val : val;
}

// základne vyhodnotenie podreťazca
function evalStr(str, values) {
    switch (str.type) {
        case "VAR": return evalVAR(str.name, values);
        case "And": return evalStr(str.left, values) && evalStr(str.right, values);
        case "Or": return evalStr(str.left, values) || evalStr(str.right, values);
        case "Par": return evalStr(str.expr, values);
    }
}

// vyhodnotenie základného reťazca 
function evalBoolExpr(expr, values) {
    try {
        const str = parseBooleanExpr(expr);
        return evalstr(str, values) ? true : false;
    }
    catch { return false; }
}


// pomocná funkcia na určenie literálu
function isVARNode(n) {
    return n.type === "VAR";
}

// pomocná funkcia na určenie klauzuly obsahujúce iba AND
function isOnlyAndOfVARs(n) {
    if (isVARNode(n)) return true;
    if (n.type === "And") return isOnlyAndOfVARs(n.left) && isOnlyAndOfVARs(n.right);
    return false;
}

// pomocná funkcia na určenie klauzuly obsahujúce iba OR
function isOnlyOrOfVARs(n) {
    if (isVARNode(n)) return true;
    if (n.type === "Or") return isOnlyOrOfVARs(n.left) && isOnlyOrOfVARs(n.right);
    return false;
}

// pomocná funkcia na vnorenie sa do zátvoriek
function delPar(n) {
    return n.type === "Par" ? delPar(n.expr) : n;
}

// určenie, či funkcia je DNF
function isDNF(str) {
    function check(n) {
        n = delPar(n);
        if (n.type === "Or") {
            return check(n.left) && check(n.right);
        }
        return isOnlyAndOfVARs(n);
    }

    str = delPar(str);
    if (isOnlyAndOfVARs(str)) return true;
    if (str.type === "Or") return check(str);

    return false;
}

// určenie, či funkcia je CNF
function isCNF(str) {
    function check(n) {
        n = delPar(n);
        if (n.type === "And") {
            return check(n.left) && check(n.right);
        }
        return isOnlyOrOfVARs(n);
    }

    str = delPar(str);
    if (isOnlyOrOfVARs(str)) return true;
    if (str.type === "And") return check(str);

    return false;
}

module.exports = { isBooleanExpr, parseBooleanExpr, evalStr, isCNF, isDNF, evalBoolExpr };

