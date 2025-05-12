import { useState } from 'react';
import { addComment } from '../../services/api';
import toast from 'react-hot-toast';

export const useCommentForm = (postId, onSuccess) => {
  const [userName, setUserName] = useState('');
  const [content, setContent] = useState('');
  const [userPhoto, setUserPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !content) return toast.error("Todos los campos son obligatorios");

    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('content', content);
    formData.append('post', postId);
    if (userPhoto) formData.append('userPhoto', userPhoto);

    setLoading(true);
    const response = await addComment(formData);
    setLoading(false);

    if (response.error) {
      toast.error("Error al enviar el comentario");
    } else {
      toast.success("Comentario agregado correctamente");
      setUserName('');
      setContent('');
      setUserPhoto(null);
      onSuccess(); 
    }
  };

  return {
    userName,
    setUserName,
    content,
    setContent,
    userPhoto,
    setUserPhoto,
    loading,
    handleSubmit,
  };
};