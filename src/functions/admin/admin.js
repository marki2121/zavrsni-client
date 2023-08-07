import Api from "../api";

export const getAllUser = async (token) => {
    return await Api.get("/admin/user/all", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((r) => {
        if(r.status === 200) {
            return r.data
        }
    }).catch((e) => {
        console.log(e)
    })
}

export const getUserById = async ( cookie, id) => {
    return await Api.get("/admin/user/" + id, {
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        }).then((r) => {
        if(r.status === 200) {
            return r.data
        }
        }).catch((e) => {
            console.log(e)
        })
}

export const deleteUser = async (cookie, id) => {
    return await Api.delete("/admin/user/" + id, {
        headers: {
            Authorization: `Bearer ${cookie}`
        }
    }).then((r) => {
        if(r.status === 200) {
            return r.data
        }
    }).catch((e) => {
        console.log(e)
    })
}

export const enableUser = async (cookie, id) => {
    return await Api.put("/admin/user/" + id + "/enable", {},{
        headers: {
            Authorization: `Bearer ${cookie}`
        }
    }).then((r) => {
        if(r.status === 200) {
            return r.data
        }
    }).catch((e) => {
        console.log(e)
    })
}

export const disableUser = async (cookie, id) => {
    return await Api.put("/admin/user/" + id + "/disable", {},{
        headers: {
            Authorization: `Bearer ${cookie}`
        }
    }).then((r) => {
        if(r.status === 200) {
            return r.data
        }
    }).catch((e) => {
        console.log(e)
    })
}

export const promoteUser = async (cookie, id) => {
    return await Api.put("/admin/user/" + id + "/promote", {},{
        headers: {
            Authorization: `Bearer ${cookie}`
        }
    }).then((r) => {
        if(r.status === 200) {
            return r.data
        }
    }).catch((e) => {
        console.log(e)
    })
}

export const demoteUser = async (cookie, id) => {
    return await Api.put("/admin/user/" + id + "/demote", {},{
        headers: {
            Authorization: `Bearer ${cookie}`
        }
    }).then((r) => {
        if(r.status === 200) {
            return r.data
        }
    }).catch((e) => {
        console.log(e)
    })
}

