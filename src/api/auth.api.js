
import API  from "./api";

export const login = (username, password) =>{
    return API.post("/auth/login", {username, password});
};

export const registro =(data) =>{
    return API.post("/auth/register", {data});
};