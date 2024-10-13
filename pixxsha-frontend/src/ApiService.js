import axios from 'axios';

export const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
export const TEMPORARY_TOKEN_HEADER = 'Account-Temporary-Access-Token';
export const TOKEN_KEY = 'tokens';
export const TOKEN_REFRESH_ENDPOINT = 'auth/signin/refresh/';

const interceptResponseErrors = (error) => {
    switch (error.response?.data.code) {
        default:
            throw error;
    }
};

const client = axios.create();
client.interceptors.response.use(
    (config) => {
        return config;
    },
    (error) => {
        interceptResponseErrors(error);
    },
);

export const isAuthenticated = () => {
    try {
        // Decode the JWT token to check its expiration date
        const decodedToken = JSON.parse(atob(ApiService.accessToken.split(".")[1]));
        const currentTime = Date.now() / 1000;

        // Check if the token has expired
        if (decodedToken.exp < currentTime) {
            // If the token has expired, the user is not authenticated
            return false;
        }

        // If the token is present and not expired, the user is authenticated
        return true;
    } catch {
        return false;
    }
};


export default class ApiService {

    static get clientHeaders() {
        return {
            'Authorization': `Bearer ${ApiService.accessToken}`
        }
    }

    static get accessToken() {
        return localStorage.getItem(TOKEN_KEY) || document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }

    static setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    }

    static clearToken() {
        localStorage.removeItem(TOKEN_KEY);
    }

    static async signUp() {

    }

    static async signIn(email, password) {
        const { token, user } = (await client.post(
            `${BACKEND_API_URL}/login`,
            {
                email,
                password,
            }
        )).data
        ApiService.setToken(token);
        return { token, user };
    }

    static async addImage() {

    }

    static async getImage() {

    }

    static async getImages() {

    }

    static async updateImage() {

    }

    static async deleteImage() {

    }

    // Files can be placed into 'groups' - similar to folders
    static async getGroups() {

    }

    static async getGroup() {

    }

    static async createGroup() {

    }

    static async updateGroup() {

    }

    static async deleteGroup() {

    }

    static async addImageToGroup() {

    }

    static async removeImageFromGroup() {

    }
}