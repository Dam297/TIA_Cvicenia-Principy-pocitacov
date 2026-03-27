
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

export {getListExerciseTestUser}