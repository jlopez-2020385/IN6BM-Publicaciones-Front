import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getPosts as getPostsRequest } from '../../services/api';

export const usePosts = () => {
    const [posts, setPosts] = useState([]); 
    const [loading, setLoading] = useState(false);

    const getPosts = async () => {
        setLoading(true);
        try {
            const response = await getPostsRequest();
            if (response && response.data && response.data.success) {
                setPosts(response.data.posts); 
            } else {
                throw new Error(response.data?.message || "Error desconocido");
            }
        } catch (error) {
            toast.error("Error al obtener las publicaciones");
            setPosts([]); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return { posts, loading, getPosts };
};