function login(username, password) {
  return fetch("/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include"
  })
    .then((response) => {  
      if (!response.ok) {
        // user does not exist
        if (response.status === 401) {
          throw new Error("Nesprávny login alebo heslo"); 
        }
        throw new Error("Chyba pri prihlasovaní");
      }      
    })
}

function logout() {
  return fetch("/api/v1/auth/logout", {method: "DELETE", credentials: "include"})
    .then((response) => {  
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Zlý dotaz, session neexistuje"); 
        }
        throw new Error("Chyba pri odhlasovaní sa");
      }      
    })
    
}

function getUserRole() {
    return fetch("/api/v1/auth/user-role", { credentials: "include" }).then((response) => {  // promise is resolved
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
            throw { code: response.status, message: "Chyba pri ziskávaní oprávnení používateľa" };
        }
        return response.json();
    })
}


export { login, logout, getUserRole };