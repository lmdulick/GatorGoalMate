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
    // State variable for showing or hiding the photo upload form
  const [showPhotoForm, setShowPhotoForm] = useState(false);
    // Function for toggling the visibility of the photo upload form
  const handleTogglePhotoForm = () => {
      setShowPhotoForm(!showPhotoForm);
    };
    // Function for handling the uploaded photos
  const handlePhotoUpload = (files) => {
      console.log(files); // You can process and upload files here
    };
    const buttonContainerStyle = {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px' // adjust this value to add space between the buttons
    };

    const [imageURL, setImageURL] = useState(''); // state to hold the image URL

    const handleFileChange = (e) => { // read and set the uploaded file’s URL
      const file = e.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setImageURL(reader.result);
          };
          reader.readAsDataURL(file);
      }
  };
  
  

  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/posts', { mode: 'cors' });
      const data = await response.json();
      setBackendData(data.user);
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

    fetch('http://localhost:5001/api/posts', {
      method:'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(newPost)
    })
    
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
          {backendData?.map(() => (
            <p key={i}>{userName}</p>
          ))}

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

          <div className="photo-form">
      <button onClick={handleTogglePhotoForm}>Upload Photos</button>

      {showPhotoForm && (
        <div className="photo-container">
          <input
            type="file"
            onChange={(e) => handlePhotoUpload(e.target.files)}
          />
          {imageURL && <img src={imageURL} alt="Uploaded" style={{ width: '100px', height: '100px' }} />}
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