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

app.get('/api/profile', (request, response) => {  
    database.collection('Collection-Profile').find({}).toArray((error, result) => {
        if (error) {
            console.error('Error occurred:', error);
            response.status(500).json({ message: 'Failed to fetch profiles' });
            return;
        }
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
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
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