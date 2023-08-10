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
        if(res.status === 400) {
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

export const getSubject = ( token, id ) => {
    return API.get("/subject/teacher/" + id, {
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
}

export const getSubjectUser = ( token, id ) => {
    return API.get("/subject/" + id, {
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
}

export const getSubjectStudents = ( token, id ) => {
    return API.get("/subject/teacher/" + id + "/students", {
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then((res) => {
        if(res.status === 200) {
            return res.data
        } else if (res.status === 400) {
            return [];
        }
    })
}

export const addSubjectStudent = ( token, subjectId, studentId) => {
    return API.post("/subject/teacher/" + subjectId + "/addStudent/" + studentId, {
        studentId: studentId
    },{
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
}

export const deleteSutdentFromSubject = ( token, subjctId, studentId) => {
    return API.delete("/subject/teacher/" + subjctId + "/removeStudent/" + studentId, {
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
}

export const getUserSubjects = ( token ) => {
    return API.get("/subject/", {
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then((res) => {
        if(res.status === 200) {
            return res.data
        } else if (res.status === 400) {
            return [];
        }
    })
}

export const updateSubject = async ( token, id, name, description, ects, semester, year) => {
    return await API.put("/subject/teacher/" + id + "/update", {
        name: name,
        description: description,
        ects: ects,
        semester: semester,
        year: year
    }, {
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

export const deleteSubject = async (token, id) => {
    return await API.delete("/subject/teacher/" + id, {
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then((r) => {
        if(r.status === 200) {
            return r.data
        }
    }).catch((err) => {
        console.log(err)
    })
}