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

export const updateSelf = async (token, firstName, lastName, email, phone, address, city, zip, country, aboutMe) => {
    return await API.put("/user/profile/update", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phone,
        address: address,
        city: city,
        zipCode: zip,
        country: country,
        aboutMe: aboutMe
    }, {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then((response) => {
        return response;
    }).catch((error) => {
        return error;
    });
}
