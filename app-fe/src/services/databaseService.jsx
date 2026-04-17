function getExercises() {
    return fetch("/api/v1/exercises", { credentials: "include" }).then(
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting list");
            }
            return response.json();
        }).catch((error) => {
            console.log("Error getting list");
            return [];
        });
}

function getTests() {
    return fetch("/api/v1/tests", { credentials: "include" }).then(
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting list");
            }
            return response.json();
        }).catch((error) => {
            console.log("Error getting list");
            return [];
        });
}

function getTestOptions(id) {
    return fetch(`/api/v1/tests/questions/options/${id}`, { credentials: "include" }).then(
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting list");
            }
            return response.json();
        }).catch((error) => {
            console.log("Error getting list");
            return [];
        });
}

function getStudents() {
    return fetch("/api/v1/students", { credentials: "include" }).then(
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting list");
            }
            return response.json();
        }).catch((error) => {
            console.log("Error getting list");
            return [];
        });
}

function getSuccessRateList() {
    return fetch("/api/v1/students/success-rates", { credentials: "include" }).then(
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting list");
            }
            return response.json();
        }).catch((error) => {
            console.log("Error getting list");
            return [];
        });
}

function getSuccessRateSpecificStudent() {
    return fetch("/api/v1/students/success-rates/specific-student", { credentials: "include" }).then(
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting list");
            }
            return response.json();
        }).catch((error) => {
            console.log("Error getting list");
            return [];
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
    }).then(
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting list" + response);
            }
            return response.json();
        }).catch((error) => {
            console.log("Error getting list");
            return [];
        });
}

function getExerciseAttemptBestDescription(param) {
    return fetch("/api/v1/students/exercise-attempts/best/description", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
        credentials: "include"
    }).then(
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting list" + response);
            }
            return response.json();
        }).catch((error) => {
            console.log("Error getting list");
            return [];
        });
}

function getTestAttempt(id) {
    return fetch(`/api/v1/students/test-attempts/${id}`, { credentials: "include" }).then(
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting list");
            }
            return response.json();
        }).catch((error) => {
            console.log("Error getting list");
            return [];
        });
}


async function insertNewTestAttempt(param) {
    return fetch("/api/v1/students/test-attempts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
        credentials: "include"
    }).then(
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting list" + response);
            }
            return response.json();
        }).catch((error) => {
            console.log("Error getting list");
            return [];
        });
}

function endTest(param) {
    return fetch("/api/v1/students/test-attempts", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
        credentials: "include"
    }).then(
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting list" + response);
            }
            return response.json();
        }).catch((error) => {
            console.log("Error getting list");
            return [];
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
    }).then(
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting list" + response);
            }
            return response.json();
        }).catch((error) => {
            console.log("Error getting list");
            return [];
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
    }).then(
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting list" + response);
            }
            return response.json();
        }).catch((error) => {
            console.log("Error getting list");
            return [];
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
    }).then(
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting list" + response);
            }
            return response.json();
        }).catch((error) => {
            console.log("Error getting list");
            return [];
        });
}

function getTestAttemptQuestion(id) {
    return fetch(`/api/v1/students/test-attempts/questions/${id}`, { credentials: "include" }).then(
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting list");
            }
            return response.json();
        }).catch((error) => {
            console.log("Error getting list");
            return [];
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
    }).then(
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting list" + response);
            }
            return response.json();
        }).catch((error) => {
            console.log("Error getting list");
            return [];
        });
}

export { getSuccessRateList, getSuccessRateSpecificStudent, getTestAttemptBest, getExerciseAttemptBest, getExercises, getTests, getStudents, getExerciseAttemptBestDescription, getTestAttemptBestDescription, insertNewTestAttempt, getTestAttemptQuestion, getTestOptions, getTestAttempt, endTestAttemptQuestion, endTest, getTestAttemptLast }