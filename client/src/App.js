import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid library for generating unique IDs
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [replyInput, setReplyInput] = useState('');
  const [showReplyForm, setShowReplyForm] = useState({});
  const [showAllReplies, setShowAllReplies] = useState({});
  
  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts', { mode: 'cors' });
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      // put them in reverse cronological order
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
      id: uuidv4(), // Generate a unique ID for the new post
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
  
      // Update the state with the new post (without waiting for server response)
      setPosts([newPost, ...posts]); // Add the new post to the beginning of the array
  
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

  const handleMakeReply = (postId) => { // adjust this to save reples to mongoDB
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
  
    // fetch('http://localhost:5000/api/posts', {
    //   method:'get', // get post
    //   headers: {'Content-Type':'application/json'}, // add reply to end of array of replies
    //   body: JSON.stringify(newPost) // update
    // })

    // fetch('http://localhost:5000/api/posts', {
    //   method:'put',
    //   headers: {'Content-Type':'application/json'},
    //   body: JSON.stringify(newPost)
    // })

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
    console.log(posts); // Use posts directly here, instead of backendData
  }, [posts]); // Use posts as a dependency instead of backendData



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
          {posts.map((post) => {
            console.log('Rendering post with ID:', post._id);
            return (
            <div key={post._id} className="post-container">
              <p>
                <strong>{post.userName}</strong> {post.content}
              </p>
              <button onClick={() => handleToggleReplyForm(post._id)}>
                Reply
              </button>

              {showReplyForm[post._id] && (
                <div className="post-container reply-container">
                  <textarea
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    placeholder="Your reply..."
                  />
                  <button onClick={() => handleMakeReply(post._id)}>
                    Reply
                  </button>
                </div>
              )}

              {/* Displaying replies... */}
            </div>
          );
          })}

          
        </>
      )}
    </div>
  );
}

export default App;