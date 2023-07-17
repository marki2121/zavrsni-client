import API from '../api.js';

export const login =  async (username, password) => {
    const response =  await API.get("/auth/login", {
        headers: {
            "Authorization": "Basic " + btoa(username + ":" + password)
        }
    });

    return response.data;
}