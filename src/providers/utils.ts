import axios from 'axios';

const baseURL = 'http://localhost:8081/';

export const get = <T>(path: string) => {
    return axios.get<T>(`${baseURL}${path}`);
};

export const post = <T>(path: string, payload: any) => {
    return axios.post<T>(`${baseURL}${path}`, payload);
};

export const put = <T>(path: string, payload: any) => {
    return axios.put<T>(`${baseURL}${path}`, payload);
};

export const del = <T>(path: string) => {
    return axios.delete<T>(`${baseURL}${path}`);
};
