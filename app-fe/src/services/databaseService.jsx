
function getListExerciseTestUser() {
    return fetch("/api/v1/list").then(
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

function getSuccessExerciseTestUser() {
    return fetch("/api/v1/success").then(
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

function getBestTestAttempt(param) {
    return fetch("/api/v1/best_test_attempt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param)
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

function getExercises() {
    return fetch("/api/v1/exercises").then(
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
    return fetch("/api/v1/tests").then(
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
    return fetch("/api/v1/students").then(
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


function getBestExerciseAttempt(param) {
    return fetch("/api/v1/best_exercise_attempt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param)
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

function getExerciseDescription(param) {
    return fetch("/api/v1/exercise_description", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param)
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

function getTestDescription(param) {
    return fetch("/api/v1/test_description", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param)
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

function insertNewTestAttempt(param) {
    return fetch("/api/v1/insert_new_test_attempt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param)
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

function getTestQuestion(param) {
    return fetch("/api/v1/get_test_question", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param)
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

function getTestOptions(param) {
    return fetch("/api/v1/get_test_options", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param)
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


function getTestAttempt(param) {
    return fetch("/api/v1/get_test_attempt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param)
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
async function endTestQuestion(param) {
    return fetch("/api/v1/end_test_question", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param)
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
    return fetch("/api/v1/end_test", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param)
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

function getFinalTestAttempt(param) {
    return fetch("/api/v1/get_final_test_attempt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param)
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

export { getListExerciseTestUser, getSuccessExerciseTestUser, getBestTestAttempt, getBestExerciseAttempt, getExercises, getTests, getStudents, getExerciseDescription, getTestDescription, insertNewTestAttempt, getTestQuestion, getTestOptions, getTestAttempt, endTestQuestion, endTest, getFinalTestAttempt }

