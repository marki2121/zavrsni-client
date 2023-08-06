import Api from "../api";

export const addTest = async ( token, subjectId, date, note) => {
    return await Api.post("/test/teacher/" + subjectId + "/create", {
        date: date,
        note: note
    }, {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then((res) => {
        if(res.status === 200) {
            return res.data;
        }
    }).catch((e) => {
        console.log(e);
    })
}

export const getTests = async ( token, subjectId ) => {
    return await  Api.get("/test/teacher/" + subjectId, {
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then((res) => {
        if(res.status === 200) {
            return res.data;
        }
    }).catch((e) => {
        console.log(e);
    })
}

export const getTestsUser = async ( token, subjectId ) => {
    return await  Api.get("/test/" + subjectId + "/applications", {
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then((res) => {
        if(res.status === 200) {
            return res.data;
        }
    }).catch((e) => {
        console.log(e);
    })
}

export const getTestsSubject = async ( token, subjectId ) => {
    return await  Api.get("/test/" + subjectId, {
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then((res) => {
        if(res.status === 200) {
            return res.data;
        }
    }).catch((e) => {
        console.log(e);
    })
}

export const applyForTest = async (token, testId) => {
    return await Api.post("/application/" + testId, {}, {
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then((res) => {
        if(res.status === 200) {
            return res.data;
        }
    }).catch((e) => {
        console.log(e);
    });
}

export const getAllApplicants = async (token, testId) => {
        return await Api.get("/test/teacher/"+ testId + "/applicants", {
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then((res) => {
        if(res.status === 200) {
            return res.data;
        }
    }).catch((e) => {
        console.log(e);
    });
}

export const gradeTestApplicant = async (token, testId, grade) => {
    return await Api.post("/test/teacher/" + testId + "/grade/" + grade, {}, {
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then((res) => {
        if(res.status === 200) {
            return res.data;
        }
    }).catch((e) => {
        console.log(e)
    })
}