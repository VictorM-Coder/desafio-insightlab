import axios from 'axios'

export const SUPPLIERS_API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})
