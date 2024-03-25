// App.js

import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [backendData, setBackendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [replyInput, setReplyInput] = useState('');
  const [showReplyForm, setShowReplyForm] = useState({});
  const [showAllReplies, setShowAllReplies] = useState({});

  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/GGM-DB', { mode: 'cors' });
      const data = await response.json();
      setBackendData(data.users);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleTogglePostForm = () => {
    setShowPostForm(!showPostForm);
  };

  const handleMakePost = () => {
    const newPost = {
      id: posts.length + 1,
      userName: 'Your Name', // Replace with the actual user's name
      content: userInput,
      replies: [],
    };

    setPosts([newPost, ...posts]);
    setUserInput('');
    setShowPostForm(false);
  };

  const handleToggleReplyForm = (postId) => {
    setShowReplyForm((prevShowReplyForm) => ({
      ...prevShowReplyForm,
      [postId]: !prevShowReplyForm[postId],
    }));
  };

  const handleMakeReply = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            replies: [
              ...post.replies,
              { userName: 'Your Name', content: replyInput }, // Replace with the actual user's name
            ],
          }
        : post
    );

    setPosts(updatedPosts);
    setReplyInput('');
    setShowReplyForm((prevShowReplyForm) => ({
      ...prevShowReplyForm,
      [postId]: false,
    }));
  };

  const handleShowAllReplies = (postId) => {
    setShowAllReplies((prevShowAllReplies) => ({
      ...prevShowAllReplies,
      [postId]: true,
    }));
  };

  useEffect(() => {
    makeAPICall();
  }, []);

  useEffect(() => {
    console.log(backendData);
  }, [backendData]);

  return (
    <div className="container">
      <header>
        <h1>GatorGoalMate</h1>
      </header>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* {backendData.map((user, i) => (
            <p key={i}>{user}</p>
          ))} */}

          <div className="post-form">
            <button onClick={handleTogglePostForm}>Create Post</button>

            {showPostForm && (
              <div className="post-container">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="What's on your mind?"
                />
                <button onClick={handleMakePost}>Post</button>
              </div>
            )}
          </div>

          <div>
            {posts.map((post) => (
              <div key={post.id} className="post-container">
                <p>
                  <strong>{post.userName}</strong> {post.content}
                </p>
                <button onClick={() => handleToggleReplyForm(post.id)}>
                  Reply
                </button>

                {showReplyForm[post.id] && (
                  <div className="post-container reply-container">
                    <textarea
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      placeholder="Your reply..."
                    />
                    <button onClick={() => handleMakeReply(post.id)}>
                      Reply
                    </button>
                  </div>
                )}

{post.replies && (
  <div>
    <h3>Comments</h3>
    {showAllReplies[post.id]
      ? post.replies.slice().reverse().map((reply, index) => (
          <p key={index} className="reply">
            <strong>{reply.userName}</strong> {reply.content}
          </p>
        ))
      : post.replies.slice().reverse().slice(0, 2).map((reply, index) => (
          <p key={index} className="reply">
            <strong>{reply.userName}</strong> {reply.content}
          </p>
        ))}

    {post.replies.length > 2 && !showAllReplies[post.id] && (
      <button onClick={() => handleShowAllReplies(post.id)}>
        ...
      </button>
    )}
  </div>
)}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;