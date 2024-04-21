import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';
import logo from './GatorGoalMateLogo.png'; 

function MainPage() {
  const [loading, setLoading] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [replyInput, setReplyInput] = useState('');
  const [showReplyForm, setShowReplyForm] = useState({});
  const [usernames, setUsernames] = useState([]);
  //const [username, setUsername] = useState('');

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

  const fetchProfileUsername = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/profile/usernames');
      if (!response.ok) {
        throw new Error('Failed to fetch profile usernames');
      }
      const usernamesData = await response.json();
      setUsernames(usernamesData);
    } catch (error) {
      console.error('Error fetching profile usernames:', error.message);
    }
  };

  const handleTogglePostForm = () => {
    setShowPostForm(!showPostForm);
  };




  const handleMakePost = async () => {
    await fetchProfileUsername();
  
    const newPost = {
      userName: 'Fallback Name', // Use the first username from the array
      content: userInput,
      replies: [],
    };

    console.log('New Post:', newPost); // Log the new post object to check if userName is present
    
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









  const handleDeleteReply = async (postId, replyId) => {
    console.log('Deleting reply:', postId, replyId);
  
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/replies/${replyId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete reply');
      }
  
      // Update the posts state to reflect the removal of the deleted reply
      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return {
            ...post,
            replies: post.replies.filter((reply) => reply._id !== replyId),
          };
        }
        return post;
      });
  
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting reply:', error.message);
    }
  };
  











  const handleToggleReplyForm = (postId) => {
    setShowReplyForm((prevShowReplyForm) => ({
      ...prevShowReplyForm,
      [postId]: !prevShowReplyForm[postId],
    }));
  };

  const handleMakeReply = async (postId) => {
    await fetchProfileUsername();

    const newReply = {
      userName: usernames.length > 0 ? usernames[0] : 'Fallback Name',
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
    <div className="row">
      <div className="column left">

        <button className="sidebar-button">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-image" />
          </Link>
         </button>

          <Link to="/profile" className="profile-button">Profile</Link>
          
        <button className="post-button" onClick={handleTogglePostForm}>Post</button>
      </div>

      <div className="column right">
        {/* Post Creation Form */}
        {showPostForm && (
          <div className="post-form">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="What's your goal?"
            />
            <button className='post-button' onClick={handleMakePost}>Post</button>
          </div>
        )}

        {/* Render Posts */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-container">
              <p>
                <strong>Name</strong> {post.content}
              </p>
              {/* Reply Form */}
              <button className="reply-button" onClick={() => handleToggleReplyForm(post._id)}>Reply</button>
              {showReplyForm[post._id] && (
                <div className="reply-container">
                  <textarea
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    placeholder="Your reply..."
                  />
                  <button className="reply-button" onClick={() => handleMakeReply(post._id)}>✔</button>
                </div>
              )}
              {/* Display Replies */}
              {post.replies.slice().reverse().map((reply, index) => (
                <div key={index} className="reply-container">
                  <p><strong>{reply.userName}</strong> {reply.content}</p>
                  <button className="trash-button" onClick={() => handleDeleteReply(post._id, reply._id)}>X</button>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MainPage;