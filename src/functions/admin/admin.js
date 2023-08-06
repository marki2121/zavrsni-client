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