import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:3001/publicationKinal/v1/",
    timeout: 3000,
});

export const getPosts = async () => {
    try {
        return await apiClient.get('post/getPosts'); 
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const addComment = async (formData) => {
    try {
        return await apiClient.post(`comment/addComment`, formData);
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};


