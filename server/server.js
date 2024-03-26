const express = require('express');
var { MongoClient } = require('mongodb');
const cors = require('cors');
const multer = require('multer');

var app = express();
app.use(cors());
app.use(express.json());

var CONNECTION_STRING = "mongodb+srv://gatorgoalmate:SWE1!@clusterggm.yfnvpjv.mongodb.net/?retryWrites=true&w=majority&appName=ClusterGGM";
var DATABASE_NAME = "GGM-db";
var database;

MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the application if unable to connect to the database
    }
    database = client.db(DATABASE_NAME);
    console.log("MongoDB Connection Successful");
});

app.get('/api/posts', (request, response) => {
    database.collection('Collection-Posts').find({}).toArray((error, result) => {
        if (error) {
            console.error('Error occurred:', error);
            response.status(500).json({ message: 'Failed to fetch posts' });
            return;
        }
        response.send(result);
    });
});

// app.post('/api/posts/AddPosts', multer().none(), (request, response) => {
//   database.collection("Collection-Posts").countDocuments({}, function(error, numOfDocs) { 
//     database.collection("Collection-Posts").insertOne({
//       id: (numOfDocs + 1).toString(),
//       description: request.body.newNotes
//     }, function(err, result) { // Added a callback function for insertOne
//       if (err) {
//         console.error("Error adding document: ", err);
//         response.status(500).json("Error adding document");
//       } else {
//         response.json("Added Successfully");
//       }
//     });
//   });
// });

// app.post('/api/posts/AddPosts', async (req, res) => {
//   const { userName, content } = req.body;

//   // Connect user's post and replies to MongoDB
//   const client = new Mongoclient(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
//   try {
//       await client.connect();
      
//       const db = client.db('GGM-db');
//       const postsCollection = db.collection('Collection-Posts');

//       // Create a new post document
//       const newPost = {
//           userName,
//           content,
//           replies: []
//       };

//       // Insert the new post into the database
//       const result = await postsCollection.insertOne(newPost);
//       res.status(201).json({ message: 'Post created successfully', postId: result.insertedId });
//   } catch (error) {
//       console.error('Error occurred:', error);
//       res.status(500).json({ message: 'Failed to create post' });
//   } finally {
//       await client.close();
//   }
// });

// app.post('/api/posts', multer().none(), async (request, response) => {
//   const { userName, content } = request.body;

//   // Connect to MongoDB
//   const client = new MongoClient(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
//   try {
//     await client.connect();

//     const db = client.db('GGM-db');
//     const postsCollection = db.collection('Collection-Posts');

//     // Get the count of existing documents
//     const numOfDocs = await postsCollection.countDocuments({});

//     // Create a new post document
//     const newPost = {
//       id: (numOfDocs + 1).toString(),
//       userName,
//       content,
//       replies: []
//     };

//     // Insert the new post into the database
//     const result = await postsCollection.insertOne(newPost);
//     response.status(201).json({ message: 'Post created successfully', postId: result.insertedId });
//   } catch (error) {
//     console.error('Error occurred:', error);
//     response.status(500).json({ message: 'Failed to create post' });
//   } finally {
//     await client.close();
//   }
// });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// express local host: http://localhost:5000/api/posts