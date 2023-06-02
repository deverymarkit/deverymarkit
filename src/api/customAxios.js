import axios from "axios";

const BASE_URL = "https://api.mandarin.weniv.co.kr";

export const customAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json"    
    }
})

export const customAuthAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json"    
    }
})

export const customImgAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "multipart/form-data"  
    }
})

customAuthAxios.interceptors.request.use(
    function (config) {
        const loginInfo = JSON.parse(localStorage.getItem("loginStorage"));
        const accessToken = loginInfo.token;
        //const refreshToken = loginInfo.refreshToken;
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
            //config.headers.common["Refresh-Token"] = `Bearer ${refreshToken}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)