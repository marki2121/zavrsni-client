import API from "../api";

export const getSelf = async (token) => {
    return await API.get("/user/profile", {
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then((response) => {
        return response;
    }).catch((error) => {
        return error;
    });
}