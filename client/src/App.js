// App.js

import React, { useEffect, useState } from 'react';
import './App.css';
import { useContext } from 'react';
import { PostContext, PostProvider } from './PostContext';




function App() {
  const [backendData, setBackendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [replyInput, setReplyInput] = useState('');
  const [showReplyForm, setShowReplyForm] = useState({});
  const [image, setImage] = useState(null);
  //const { setPostImage } = useContext(PostContext);
  //const { postImage } = useContext(PostContext);
  const [showAllReplies, setShowAllReplies] = useState({});
    // State variable for showing or hiding the photo upload form
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
  


    
  
  



  // const GetPost = async (postId) => {
  //   try {
  //     const response = await fetch('http://localhost:3000/api/posts', { mode: 'cors' });
  //     // http://localhost:3000/api/posts/${postId}
  //     const postData = await response.json();
  //     // Update state or do something with postData
  //     console.log("Post data:", postData);
  //   } catch (error) {
  //     console.error('Error fetching post:', error);
  //   }
  // };

  // // New useEffect to call GetPost function
  // useEffect(() => {
  //   GetPost(/* pass the postId here */);
  // }, []); // Add dependencies if needed`



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
    //setPostImage(image); 
    const newPost = {
      id: posts.length + 1,
      userName: 'Your Name', // Replace with the actual user's name
      content: userInput,
      replies: [],
    };

    fetch('http://localhost:5001/api/posts', { // need this in handlemakereply
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
  
    // fetch('http://localhost:3000/api/posts', {
    //   method:'get', // get post
    //   headers: {'Content-Type':'application/json'}, // add reply to end of array of replies
    //   body: JSON.stringify(newPost) // update
    // })

    // fetch('http://localhost:3000/api/posts', {
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
          {backendData?.map((user, i) => (
            <p key={i}>{user.userName}</p>
          ))}

<div className="post-form">
    <button onClick={handleTogglePostForm}>Create Post</button>

    {showPostForm && (
        <div className="post-container">
            <div className="post-content">
                <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="What's on your mind?"
                    style={{
                        backgroundImage: image ? `url(${image})` : 'none',
                        backgroundSize: 'cover',
                        height: '200px',
                    }}
                />
            </div>
            <button onClick={handleMakePost}>Post</button>

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