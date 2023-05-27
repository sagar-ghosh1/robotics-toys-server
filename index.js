
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ez7uet8.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
   }
});

async function run() {
   try {
      // Connect the client to the server	(optional starting in v4.7)
      client.connect();





      const toyCollection = client.db("toyDB").collection("robot");

      // find all toy
      app.get("/toy", async (req, res) => {
         const search = req.query.search;
         console.log(search);
         const query = { toyName: { $regex: search, $options: 'i' } }
         const options = {
            sort: { 'price': -1 }
         }
         const cursor = toyCollection.find(query, options).limit(20);
         const result = await cursor.toArray();
         res.send(result);
      });

      // find a specific toy collection
      app.get("/toy/:id", async (req, res) => {
         const id = req.params.id;
         const query = { _id: new ObjectId(id) };
         const options = {
            projection: { category: 0 },
         };
         const result = await toyCollection.findOne(query, options);
         res.send(result);
      });

run().catch(console.dir);

app.get("/", (req, res) => {
   res.send("Robotics Toy is running...");
});

app.listen(port, () => {
   console.log(`Robotics is running on port ${port}`);
});