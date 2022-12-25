import axios from "axios";

export const customAxios = axios.create({
    baseURL: "https://mandarin.api.weniv.co.kr",
    headers: {
        "Content-type": "application/json"    
    }
})

export const customAuthAxios = axios.create({
    baseURL: "https://mandarin.api.weniv.co.kr",
    headers: {
        "Content-type": "application/json"    
    }
})

export const customImgAxios = axios.create({
    baseURL: "https://mandarin.api.weniv.co.kr",
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