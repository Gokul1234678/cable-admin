import axios from "axios";

let axiosInstance=axios.create({
    baseURL:"https://cable-admin-backend.onrender.com",
})
export default axiosInstance;