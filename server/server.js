// app.post('/api/posts/AddPosts',multer().none(),(request,response)=>{
//   database.collection("Collection-Posts").count({},fuction(error,numOfDocs){
//     database.collection("Collection-Posts").insertOne({
//       id:(numOfDocs+1).toString(),
//       description:request.body.newNotes
//     });
//     response.json("Added Successfully");
//   })
// })


var express = require('express');
var { MongoClient } = require('mongodb');
var cors = require('cors');
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// express local host: http://localhost:5000/api/posts