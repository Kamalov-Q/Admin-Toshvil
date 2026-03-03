import axios from "axios"

export const baseUrl = import.meta.env.BASE_URL

export const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true
});