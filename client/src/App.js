import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [replyInput, setReplyInput] = useState('');
  const [showReplyForm, setShowReplyForm] = useState({});

  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts', { mode: 'cors' });
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      const reversedPosts = data.reverse();
      setPosts(reversedPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    makeAPICall();
  }, []);

  const handleTogglePostForm = () => {
    setShowPostForm(!showPostForm);
  };

  const handleMakePost = async () => {
    const newPost = {
      userName: 'Your Name', // Replace with the actual user's name
      content: userInput,
      replies: [],
    };

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const result = await response.json();
      newPost._id = result.postId; // Assign the generated postId from the response
      setPosts([newPost, ...posts]);
      setUserInput('');
      setShowPostForm(false);
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  const handleToggleReplyForm = (postId) => {
    setShowReplyForm((prevShowReplyForm) => ({
      ...prevShowReplyForm,
      [postId]: !prevShowReplyForm[postId],
    }));
  };

  const handleMakeReply = async (postId) => {
    const newReply = {
      userName: 'Your Name', 
      content: replyInput,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReply),
      });

      if (!response.ok) {
        throw new Error('Failed to add reply');
      }



      // Update the posts state to reflect the newly added reply
      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return {
            ...post,
            replies: [newReply, ...post.replies],
          };
        }
        return post;
      });

      setPosts(updatedPosts);
      console.log('Updated Posts:', updatedPosts); 

      setReplyInput('');

      setShowReplyForm((prevShowReplyForm) => ({
        ...prevShowReplyForm,
        [postId]: false,
      }));
    } catch (error) {
      console.error('Error adding reply:', error.message);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>GatorGoalMate</h1>
      </header>
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {posts.map((post) => (
            <div key={post._id} className="post-container">
              <p>
                <strong>{post.userName}</strong> {post.content}
              </p>
              <button onClick={() => handleToggleReplyForm(post._id)}>Reply</button>
              {showReplyForm[post._id] && (
                <div className="post-container reply-container">
                  <textarea
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    placeholder="Your reply..."
                  />
                  <button onClick={() => handleMakeReply(post._id)}>Submit Reply</button>
                </div>
              )}
              {/* Displaying replies */}
              {post.replies.slice().reverse().map((reply, index) => (
                <div key={index} className="reply">
                  <strong>{reply.userName}</strong> {reply.content}
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
