import API from "../api";

export const getAllSubjects = async (token) => {
    return await API.get("/subject/teacher", {
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then((res) => {
        if(res.status === 200) {
            return res.data
        }
    }).catch((err) => {
        console.log(err)
    });
};