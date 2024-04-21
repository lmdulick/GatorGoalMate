const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const CONNECTION_STRING = "mongodb+srv://gatorgoalmate:SWE1!@clusterggm.yfnvpjv.mongodb.net/?retryWrites=true&w=majority&appName=ClusterGGM";
const DATABASE_NAME = "GGM-db";
let database;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB once when the server starts
MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    database = client.db(DATABASE_NAME);
    console.log("MongoDB Connection Successful");

    // Start the server after successful connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the application on connection failure
  });

// GET all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await database.collection('Collection-Posts').find({}).toArray();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

// POST a new post with replies
app.post('/api/posts', async (req, res) => {
  const { userName, content, replies } = req.body;

  if (!userName || !content) {
    return res.status(400).json({ message: 'Missing required fields (userName or content)' });
  }

  try {
    const postsCollection = database.collection('Collection-Posts');

    // Create a new post document
    const newPost = {
      userName,
      content,
      replies: replies || [] // Default to empty array if replies not provided
    };

    // Insert the new post into the database
    const result = await postsCollection.insertOne(newPost);
    res.status(201).json({ message: 'Post created successfully', postId: result.insertedId });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

// POST a reply to an existing post
app.post('/api/posts/:postId/replies', async (req, res) => {
  const { postId } = req.params;
  const { userName, content } = req.body;

  if (!userName || !content) {
    return res.status(400).json({ message: 'Missing required fields (userName or content)' });
  }

  try {
    const postsCollection = database.collection('Collection-Posts');

    // Find the post by ID and update its replies array
    const result = await postsCollection.updateOne(
      { _id: ObjectId(postId) },
      { $push: { replies: { userName, content } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(201).json({ message: 'Reply added successfully' });
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ message: 'Failed to add reply' });
  }
});




// DELETE a reply from an existing post
app.delete('/api/posts/:postId/replies/:replyIndex', async (req, res) => {
  const { postId, replyIndex } = req.params;

  try {
    const postsCollection = database.collection('Collection-Posts');

    // Find the post by ID and remove the reply at the specified index
    const result = await postsCollection.updateOne(
      { _id: ObjectId(postId) },
      { $unset: { [`replies.${replyIndex}`]: 1 } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Reply deleted successfully' });
  } catch (error) {
    console.error('Error deleting reply:', error);
    res.status(500).json({ message: 'Failed to delete reply' });
  }
});





app.get('/api/profile', (request, response) => {  
  database.collection('Collection-Profile').find({}).toArray((error, result) => {
      if (error) {
          console.error('Error occurred:', error);
          response.status(500).json({ message: 'Failed to fetch profiles' });
          return;
      }
      //console.log(result);
      response.send(result);
  });
});

app.post('/api/profile', async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  // Connect user's profile info to MongoDB
  const client = new MongoClient(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
      await client.connect();
      
      const db = client.db('GGM-db');
      const profileCollection = db.collection('Collection-Profile');

      // Create a new profile document
      const newProfile = {
          firstName,
          lastName,
          email,
          username,
          password
      };

      // Insert the new profile into the database
      const result = await profileCollection.insertOne(newProfile);
      res.status(201).json({ message: 'Profile created successfully', profileId: result.insertedId });
  } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ message: 'Failed to create post' });
  } finally {
      await client.close();
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const profile = await database.collection('Collection-Profile').findOne({ username, password });

    if (!profile) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Assuming successful login, return some user data or authentication token
    res.json({ message: 'Login successful', user: profile });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Failed to login' });
  }
});

/*
INSTRUCTIONS ON MongoDB

if you encounter an error while running the backend such as: 
"[nodemon] app crashed - waiting for file changes before starting..."
OR
you don't see "MongoDB Connection Successful"

Follow these steps:
    1) ensure there are no syntax errors in the server.js document
    2) go on the MongoDB website: https://cloud.mongodb.com/
    3) login using the GatorGoalMate gmail and password
    4) click "Network Access" button on the left column
    5) add your IP Address to the list of IP Addresses
       * EVERYTIME YOU REOPEN THE PROJECT AND RERUN THE BACKEND - YOU MUST ADD YOUR IP ADDRESS ON THE MONGODB WEBSITE

To navigate to the database:
    1) On the left column, click: 'Database'
    2) Click: 'ClusterGGM'
    3) Below ClusterGGM, there is a series of buttons; click: 'Collections'
    4) The database name is: 'GGM-db'
    5) The collection name for profiles is: 'Collection-Profile'

The cluster used for this project is: 'ClusterGGM'
The database name for this project is: 'GGM-db'
The collection used for profiles is: 'Collection-Profile'
*/



// express local host: http://localhost:5000/api/profile