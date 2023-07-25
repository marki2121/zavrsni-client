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

export const addSubjectApi = async (token, name, description, ects, semester, year) => {
    return await API.post("/subject/teacher/create", {
        name: name,
        description: description,
        ects: ects,
        semester: semester,
        year: year
    },{
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then((res) => {
        if(res.status === 200) {
            return res.data
        }
    }).catch((err) => {
        console.log(err)
    });
}