function getExercises() {
    return fetch("/api/v1/exercises", { credentials: "include" }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Not authenticated" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Not authorized" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Error getting exercises" };
        }
        return response.json();
    })
}


function getTests() {
    return fetch("/api/v1/tests", { credentials: "include" }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Not authenticated" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Not authorized" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Error getting tests" };
        }
        return response.json();
    });
}

function getTestOptions(id) {
    return fetch(`/api/v1/tests/questions/options/${id}`, { credentials: "include" }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Not authenticated" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Not authorized" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Error getting description of test" };
        }
        return response.json();
    })
}

function getStudents() {
    return fetch("/api/v1/students", { credentials: "include" }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Not authenticated" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Not authorized" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Error getting students" };
        }
        return response.json();
    });
}

function getSuccessRateList() {
    return fetch("/api/v1/students/success-rates", { credentials: "include" }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Not authenticated" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Not authorized" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Error getting sucess rate" };
        }
        return response.json();
    });
}

function getSuccessRateSpecificStudent() {
    return fetch("/api/v1/students/success-rates/specific-student", { credentials: "include" }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Not authenticated" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Not authorized" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Error getting sucess-rate for student" };
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
                throw { code: 401, message: "Not authenticated" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Not authorized" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Error getting best exercise attempt" };
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
                throw { code: 401, message: "Not authenticated" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Not authorized" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Error getting description of best exercise attempt" };
        }
        return response.json();
    })
}

function getTestAttempt(id) {
    return fetch(`/api/v1/students/test-attempts/${id}`, { credentials: "include" })..then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Not authenticated" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Not authorized" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Error getting test attempt" };
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
                throw { code: 401, message: "Not authenticated" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Not authorized" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Error inserting new test attempt" };
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
                throw { code: 401, message: "Not authenticated" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Not authorized" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Error ending test" };
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
                throw { code: 401, message: "Not authenticated" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Not authorized" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Error getting last test attempt of test" };
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
                throw { code: 401, message: "Not authenticated" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Not authorized" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Error getting best attempt of test" };
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
                throw { code: 401, message: "Not authenticated" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Not authorized" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Error getting description of best test attempt" };
        }
        return response.json();
    })
}

function getTestAttemptQuestion(id) {
    return fetch(`/api/v1/students/test-attempts/questions/${id}`, { credentials: "include" }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // unauthenticated
            if (response.status === 401) {
                throw { code: 401, message: "Not authenticated" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Not authorized" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Error getting question" };
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
                throw { code: 401, message: "Not authenticated" };
            }
            // unauthorized
            else if (response.status === 403) {
                throw { code: 402, message: "Not authorized" };
            }
            // other error HTTP status
            throw { code: response.status, message: "Error ending question" };
        }
        return response.json();
    });
}

export { getSuccessRateList, getSuccessRateSpecificStudent, getTestAttemptBest, getExerciseAttemptBest, getExercises, getTests, getStudents, getExerciseAttemptBestDescription, getTestAttemptBestDescription, insertNewTestAttempt, getTestAttemptQuestion, getTestOptions, getTestAttempt, endTestAttemptQuestion, endTest, getTestAttemptLast }