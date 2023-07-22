import API from '../api.js';

export const login =  async (username, password) => {
    return await API.get("/auth/login", {
        headers: {
            "Authorization": "Basic " + btoa(username + ":" + password)
        }
    }).catch((error) => {
        return error;
    });
}

export const register = async (username, password, passwordConfirmation) => {
    try {
        const response = await API.post("/auth/signup", {
            username,
            password,
            passwordConfirmation
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await response;
    } catch (error) {
        return error;
    }
}