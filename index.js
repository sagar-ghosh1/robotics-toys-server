
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ez7uet8.mongodb.net/?retryWrites=true&w=majority`;

run().catch(console.dir);

app.get("/", (req, res) => {
   res.send("Robotics Toy is running...");
});

app.listen(port, () => {
   console.log(`Robotics is running on port ${port}`);
});