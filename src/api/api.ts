import axios, { AxiosInstance } from "axios";
import { ApiResponse } from "./types";

const BASE_URL = "http://localhost:4000"; //TODO this should come from a settings file

const api: AxiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json"
    },
    baseURL: BASE_URL
});

export const fetchSSMLFromAPI = async (page: number, pageSize: number): Promise<ApiResponse> => {
    try {
        const response = await api.get(`/ssml?page=${page}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error("api :: fetchSSMLFromAPI", error);
        throw new Error("Failed to fetch from API");
    }
};