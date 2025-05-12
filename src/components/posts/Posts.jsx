import React, { useState } from 'react';
import { usePosts } from '../../shared/hooks/usePosts';
import { CommentForm } from '../comment/Comment';
import '../../pages/post/PostsPage.css';


export const Posts = () => {
    const { posts, loading, getPosts } = usePosts();
    const [visibleForms, setVisibleForms] = useState({}); 

    const toggleForm = (postId) => {
        setVisibleForms(prev => ({
            ...prev,
            [postId]: !prev[postId] 
        }));
    };

    const getImageUrl = (filename) => {
        return `http://localhost:3001/public/uploads/profile-pictures/${filename}`;
    };

    return (
        <div className="posts-container">
            {loading ? (
                <p>Cargando publicaciones...</p>
            ) : (
                <div className="posts-grid">
                    {Array.isArray(posts) && posts.length > 0 ? (
                        posts.map((post) => (
                            <div className="post-card" key={post._id}>
                                <div className="post-content-container">
                                    <div className="post-header">
                                        <img
                                            src={getImageUrl(post.authorPhoto)}
                                            alt={post.authorName}
                                            className="profile-picture"
                                        />
                                        <div>
                                            <h3 className="post-author">{post.authorName}</h3>
                                            <p className="post-date">{new Date(post.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <img
                                        src={getImageUrl(post.profilePicture)}
                                        alt={post.title}
                                        className="post-image"
                                    />
                                    <div className="post-content">
                                        <h3 className="post-title">{post.title}</h3>
                                        <p className="post-description">{post.description}</p>
                                    </div>

                                    <button onClick={() => toggleForm(post._id)}>
                                        {visibleForms[post._id] ? "Cancelar" : "Comentar"}
                                    </button>

                                    {visibleForms[post._id] && (
                                        <CommentForm
                                            postId={post._id}
                                            onSuccess={async () => {
                                                await getPosts();
                                                toggleForm(post._id);
                                            }}
                                        />
                                    )}
                                </div>

                                <div className="post-comments">
                                    <h4 className="comments-title">Comentarios</h4>
                                    <div className="comments-list">
                                        {post.comments?.length > 0 ? (
                                            post.comments.map((comment) => (
                                                <div className="comment-card" key={comment._id}>
                                                    <div className="comment-header">
                                                        <img
                                                            src={comment.userPhoto ? getImageUrl(comment.userPhoto) : 'default-avatar-url'}
                                                            alt={comment.userName}
                                                            className="comment-avatar"
                                                        />
                                                        <div className="comment-meta">
                                                            <span className="comment-author">{comment.userName}</span>
                                                            <span className="comment-date">
                                                                {new Date(comment.createdAt).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className="comment-content">{comment.content}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p style={{ fontSize: '14px', color: '#777' }}>No hay comentarios aún.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay publicaciones disponibles.</p>
                    )}
                </div>
            )}
        </div>
    );
};