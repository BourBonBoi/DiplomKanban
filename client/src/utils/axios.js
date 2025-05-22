import axios from "axios";
import {getUserFromLocalStorage, removeUserFromLocalStorage} from "./localStorage";
import {setToken, setUser} from "../features/user/userSlice";
import {setActiveBoard, setIsEditing} from "../features/board/boardSlice";

export const authFetch = axios.create({
    baseURL: '/api/v1',
});

authFetch.interceptors.request.use((config) => {
    const {token} = getUserFromLocalStorage();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const checkForUnAuthorizedError = (error, thunkAPI, alertCB, modalCB) => {
    if (error.response.status === 401) {
        thunkAPI.dispatch(alertCB('Unauthorized! Logging out...'));
        setTimeout(() => {
            thunkAPI.dispatch(setUser(null));
            thunkAPI.dispatch(setToken(null));
            thunkAPI.dispatch(setActiveBoard(null));
            thunkAPI.dispatch(setIsEditing(false));
            thunkAPI.dispatch(alertCB(''));
            thunkAPI.dispatch(modalCB());
            removeUserFromLocalStorage();
        }, 2000);
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
}