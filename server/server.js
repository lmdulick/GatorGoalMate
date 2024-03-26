const express = require('express');
const Mongoclient = require('mongodb').MongoClient;
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

const CONNECTION_STRING="mongodb+srv://gatorgoalmate:SWE1!@clusterggm.yfnvpjv.mongodb.net/?retryWrites=true&w=majority&appName=ClusterGGM"
const DATABASE_NAME="GGM-db";
var database;



app.listen(5000,()=>{
    Mongoclient.connect(CONNECTION_STRING,(error,client)=>{
        if (error) {
            console.error("Error connecting to MongoDB:", error);
            return;
        }
        database=client.db(DATABASE_NAME);
        console.log("MongoDB Connection Successful");
    });
});

app.get('/api/GGM-db/',(request,response)=>{
  database.collection('Collection-Posts').find({}).toArray((error,result)=>{
    if (error) {
      console.error('Error occurred:', error);
      response.status(500).json({ message: 'Failed to fetch posts' });
      return;
    }
    response.send(result);
  });
});

// app.post('/api/GGM-db/AddPosts',multer().none(),(request,response)=>{
//   database.collection("Collection-Posts").count({},fuction(error,numOfDocs){
//     database.collection("Collection-Posts").insertOne({
//       id:(numOfDocs+1).toString(),
//       description:request.body.newNotes
//     });
//     response.json("Added Successfully");
//   })
// })



app.post('/make-post', async (req, res) => {
  const { userName, content } = req.body;

  // Connect user's initial post to MongoDB
  const client = new Mongoclient(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
      await client.connect();
      
      const db = client.db('GGM-db');
      const postsCollection = db.collection('Collection-Posts');

      // Create a new post document
      const newPost = {
          userName,
          content,
          replies: []
      };

      // Insert the new post into the database
      const result = await postsCollection.insertOne(newPost);
      res.status(201).json({ message: 'Post created successfully', postId: result.insertedId });
  } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ message: 'Failed to create post' });
  } finally {
      await client.close();
  }
});

// express local host: http://localhost:5000/api/GGM-db/