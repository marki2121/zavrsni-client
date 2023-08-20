import axios from "axios";

export default axios.create({
    baseURL: `http://${process.env.REACT_APP_API_BASE_URL}:8080/api`,
    validateStatus: (status) => {
        return status >= 200 && status < 500
    }
});