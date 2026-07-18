import axios from "axios";

const api = axios.create({
    baseURL: "https://dashboard.render.com/project/prj-d7n35sgk1i2s739elf7g"
});

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});

export default api;