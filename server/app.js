require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

//Connect to MongoDB 
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

async function run() {
  try {
    //Connect the clint to the server
    await client.connect();

    //Send a ping to confirm a successful connection
    await client.db("admin").command({ping: 1});
    console.log("Pinged your deployment. you successfully connected to MongoDB");
  }
  finally {
    //Ensures that the client will close whe you finish/error
    await client.close();
  }
}

run().catch(console.error);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
