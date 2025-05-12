import React from 'react';
import { NavbarHome } from '../../components/navs/NavbarHome';
import { Posts } from '../../components/posts/Posts.jsx';
import './postsPage.css';

export const PostPage = () => {
    return (
        <div>
            <NavbarHome />
            <Posts />
        </div>
    );
};