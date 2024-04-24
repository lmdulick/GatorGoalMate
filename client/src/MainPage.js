import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PostContext, PostProvider } from './PostContext';
import './MainPage.css';
import logo from './GatorGoalMateLogo.png'; 


function MainPage() {
  const [loading, setLoading] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [replyInput, setReplyInput] = useState('');
  const [showReplyForm, setShowReplyForm] = useState({});

  const [image, setImage] = useState(null);
  const [showAllReplies, setShowAllReplies] = useState({}); // State variable for showing or hiding the photo upload form
  const [showPhotoForm, setShowPhotoForm] = useState(false); 
  
  
  // Function for toggling the visibility of the photo upload form
  const handleTogglePhotoForm = () => {
      setShowPhotoForm(!showPhotoForm);
    };

    // Function for handling the uploaded photos
    function handlePhotoUpload(files) {
      let file = files[0]; // get the uploaded file
      let reader = new FileReader();
      reader.onloadend = function() {
          // Update the 'image' state with the data URL of the uploaded image
          setImage(reader.result);
      }
      reader.readAsDataURL(file);
  }

  const location = useLocation();
  const username = location.state.username;

  //console.log("main page username: ", username);

  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts', { mode: 'cors' });
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
  
      // Process posts and their replies to store in desired order
      const processedPosts = data.map(post => ({
        ...post,
        replies: post.replies.reverse() // Reverse replies to store newest first
      }));
  
      setPosts(processedPosts.reverse()); // Reverse posts to store newest first
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


  const handleMakePost = async (username) => {
  
    const newPost = {
      userName: username,
      content: userInput,
      replies: [],
      image: image,
    };

    //console.log(username);

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

  // function to DELETE an entire post
  const handleDeletePost = async (postId, postUserName) => {
    console.log('Deleting post');

    console.log('username: ', username);
    console.log('postUserName: ', postUserName);

    try {
      // Check if the post's username matches the current user's username
      if (postUserName !== username) {
        console.error('You are not authorized to delete this post.');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // Update the posts state to reflect the removal of the deleted post
      const updatedPosts = posts.filter(post => post._id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };


  // function to DELETE a reply from an existing post
  const handleDeleteReply = async (postId, replyIndex, replyUserName) => {
  console.log('Deleting reply');
  //console.log('Deleting post: ', postId);
  //console.log('Reply index: ', replyIndex);

  //console.log('username: ', username);
  //console.log('replyUserName: ', replyUserName);
  try {
    // Check if the reply's username matches the current user's username
    if (replyUserName !== username) {
      console.error('You are not authorized to delete this reply.');
      return;
    }

    const response = await fetch(`http://localhost:5000/api/posts/${postId}/replies/${replyIndex}`, {
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
          replies: post.replies.filter((_, index) => index !== replyIndex),
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

  const handleMakeReply = async (postId, username) => {

    const newReply = {
      userName: username,
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

      <Link to="/">
        <button className="sidebar-button">
            <img src={logo} alt="Logo" className="logo-image" />
         </button>
         </Link>
         <Link to="/profile" state={{ username: username}} className="profile-button">Profile</Link>

          
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
              style={{
                backgroundImage: image ? `url(${image})` : 'none',
                backgroundSize: 'cover',
                height: '200px',
            }}
            />
            <button className='post-button-small' onClick={() => handleMakePost(username)}>✔</button>
            <div className="photo-form">
                <button onClick={handleTogglePhotoForm}>Upload Photos</button>

                {showPhotoForm && (
                    <div className="photo-container">
                        <input
                            type="file"
                            onChange={(e) => handlePhotoUpload(e.target.files)}
                        />
                    </div>
                )}
            </div>
          </div>
        )}

        {/* Render Posts */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-container">
              {post.image && (
                    <img src={post.image} alt="User Post" className="post-image" />
              )}
              <p>
                <strong>{post.userName}</strong> {post.content}
              </p>
              <button className="trash-button" onClick={() => handleDeletePost(post._id, post.userName)}>X</button>
              
              {/* Reply Form */}
              <button className="reply-button" onClick={() => handleToggleReplyForm(post._id)}>Reply</button>
              {showReplyForm[post._id] && (
                <div className="reply-container">
                  <textarea
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    placeholder="Your reply..."
                  />
                  <button className="reply-button" onClick={() => handleMakeReply(post._id, username)}>✔</button>

                </div>
              )}
              
              {/* Display Replies */}
              {post.replies.map((reply, index) => (
              <div key={index} className="reply-container">
              {reply && (
                <>
                  <p><strong>{reply.userName}</strong> {reply.content}</p>
                  
                  {/* NEED TO FIX INDEXING AND 'null' PROBLEMS */}
                  <button className="trash-button" onClick={() => handleDeleteReply(post._id, index, reply.userName)}>X</button>
                
                </>
              )}
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