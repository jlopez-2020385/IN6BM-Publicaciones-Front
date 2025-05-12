import React from 'react';
import { useCommentForm } from '../../shared/hooks/useComment';
import '../../pages/post/PostsPage.css';

export const CommentForm = ({ postId, onSuccess }) => {
  const {
    userName,
    setUserName,
    content,
    setContent,
    userPhoto,
    setUserPhoto,
    loading,
    handleSubmit
  } = useCommentForm(postId, onSuccess);

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        placeholder="Tu nombre"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <textarea
        placeholder="Tu comentario"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <label className="custom-file-upload">
        📷 Subir foto
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setUserPhoto(e.target.files[0])}
          hidden
        />
      </label>
      {userPhoto && <p className="file-name">{userPhoto.name}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Comentar"}
      </button>
    </form>
  );
};