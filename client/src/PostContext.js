import React from 'react';

export const PostContext = React.createContext();

export const PostProvider = ({ children }) => {
    const [postImage, setPostImage] = React.useState(null);

    return (
        <PostContext.Provider value={{ postImage, setPostImage }}>
            {children}
        </PostContext.Provider>
    );
};
