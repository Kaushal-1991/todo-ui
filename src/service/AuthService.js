import axios  from "axios";
const AUTH_BASE_URL = "http://localhost:8080/api/auth";

export const registerUserAPi = (user) => axios.post(AUTH_BASE_URL + "/register", user);
export const loginUserApi = (usernameOrEmail,password) => axios.post(AUTH_BASE_URL + "/login", {usernameOrEmail,password});
export const logoutUserApi = () => axios.post(AUTH_BASE_URL + "/logout");
export const storeToken = (token) => localStorage.setItem('token', token);
export const getTokenApi = () => localStorage.getItem('token');

export const savedLoggedInUser= (username) => sessionStorage.setItem('loggedInUser', username);
export const isLoggedInUser = () => {
    const user = sessionStorage.getItem('loggedInUser');
    if(user === null) return false;
    return true;
}
export const getLoggedInUser = () => {
    const user = sessionStorage.getItem('loggedInUser');
    return user;
}

export const logoutUserSession = () => {
    sessionStorage.clear('loggedInUser');
    localStorage.clear('token');
}
