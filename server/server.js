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
