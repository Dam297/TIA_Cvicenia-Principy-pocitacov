function getExercises() {
    return fetch("/api/v1/exercises", { credentials: "include" }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Neautentifikovaný" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Nemáte oprávnenie" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Chyba pri ziskávaní cvičení" };
        }
        return response.json();
    })
}


function getTests() {
    return fetch("/api/v1/tests", { credentials: "include" }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Neautentifikovaný" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Nemáte oprávnenie" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Chyba pri ziskávaní testov" };
        }
        return response.json();
    });
}

function getTestOptions(id) {
    return fetch(`/api/v1/tests/questions/options/${id}`, { credentials: "include" }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Neautentifikovaný" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Nemáte oprávnenie" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Chyba pri ziskávaní popisu testu" };
        }
        return response.json();
    })
}

function getStudents() {
    return fetch("/api/v1/students", { credentials: "include" }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Neautentifikovaný" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Nemáte oprávnenie" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Chyba pri ziskávaní študentov" };
        }
        return response.json();
    });
}

function getSuccessRateList() {
    return fetch("/api/v1/students/success-rates", { credentials: "include" }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Neautentifikovaný" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Nemáte oprávnenie" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Chyba pri ziskávaní úspešnosti" };
        }
        return response.json();
    });
}

function getSuccessRateSpecificStudent() {
    return fetch("/api/v1/students/success-rates/specific-student", { credentials: "include" }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Neautentifikovaný" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Nemáte oprávnenie" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Chyba pri ziskávaní úspešnosti študenta" };
        }
        return response.json();
    });
}

function getExerciseAttemptBest(param) {
    return fetch("/api/v1/students/exercise-attempts/best", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
        credentials: "include"
    }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Neautentifikovaný" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Nemáte oprávnenie" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Chyba pri ziskávaní najlepšieho pokusu z cvičenia" };
        }
        return response.json();
    })
}

function getExerciseAttemptBestDescription(param) {
    return fetch("/api/v1/students/exercise-attempts/best/description", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
        credentials: "include"
    }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Neautentifikovaný" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Nemáte oprávnenie" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Chyba pri ziskávaní popisu z najlepšieho pokusu cvičenia" };
        }
        return response.json();
    })
}

function getTestAttempt(id) {
    return fetch(`/api/v1/students/test-attempts/${id}`, { credentials: "include" }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Neautentifikovaný" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Nemáte oprávnenie" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Chyba pri ziskávaní najlepšieho pokusu z testu" };
        }
        return response.json();
    })
}


async function insertNewTestAttempt(param) {
    return fetch("/api/v1/students/test-attempts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
        credentials: "include"
    }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Neautentifikovaný" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Nemáte oprávnenie" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Chyba pri vkládaní nového pokusu (test)" };
        }
        return response.json();
    })
}

function endTest(param) {
    return fetch("/api/v1/students/test-attempts", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
        credentials: "include"
    }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Neautentifikovaný" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Nemáte oprávnenie" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Chyba pri ukončení testu" };
        }
        return response.json();
    });
}

function getTestAttemptLast(param) {
    return fetch("/api/v1/students/test-attempts/last", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
        credentials: "include"
    }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Neautentifikovaný" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Nemáte oprávnenie" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Chyba pri ziskávaní posledného pokusu z testu" };
        }
        return response.json();
    });
}

function getTestAttemptBest(param) {
    return fetch("/api/v1/students/test-attempts/best", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
        credentials: "include"
    }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Neautentifikovaný" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Nemáte oprávnenie" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Chyba pri ziskávaní najlepšieho pokusu z testu" };
        }
        return response.json();
    });
}

function getTestAttemptBestDescription(param) {
    return fetch("/api/v1/students/test-attempts/best/description", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
        credentials: "include"
    }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Neautentifikovaný" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Nemáte oprávnenie" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Chyba pri ziskávaní popisu z posledného pokusu z testu" };
        }
        return response.json();
    })
}

function getTestAttemptQuestion(id) {
    return fetch(`/api/v1/students/test-attempts/questions/${id}`, { credentials: "include" }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Neautentifikovaný" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Nemáte oprávnenie" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Chyba pri ziskávaní otázky z testu" };
        }
        return response.json();
    });
}

async function endTestAttemptQuestion(param) {
    return fetch("/api/v1/students/test-attempts/questions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
        credentials: "include"
    }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Neautentifikovaný" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Nemáte oprávnenie" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Chyba pri odoslaní odpovede z testu" };
        }
    });
}

export { getSuccessRateList, getSuccessRateSpecificStudent, getTestAttemptBest, getExerciseAttemptBest, getExercises, getTests, getStudents, getExerciseAttemptBestDescription, getTestAttemptBestDescription, insertNewTestAttempt, getTestAttemptQuestion, getTestOptions, getTestAttempt, endTestAttemptQuestion, endTest, getTestAttemptLast }