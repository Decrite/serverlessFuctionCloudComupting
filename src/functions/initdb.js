const { app } = require("@azure/functions");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const url =
  "mongodb://prof-rating:lHDOsx3Uwn24FYe05It204icticVwz8ikp894GB9bFamUgW5fDIX2b3KR6887avNcYOn3yioZIDYACDb8evVRw==@prof-rating.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@prof-rating@";
const client = new MongoClient(url);

let myProf = [
  {
    _id: uuidv4(),
    name: "test",
    rating: "1",
    categoryId: "someValue", // Add this field
  },
  {
    _id: uuidv4(),
    name: "test2",
    rating: "2",
    categoryId: "someValue", // Add this field
  },
];

app.http("initdb", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  route: "createnewdb",
  handler: async (request, context) => {
    await client.connect();
    const database = client.db("prof");
    const collection = database.collection("collection1");
    await collection.deleteMany({});
    await collection.insertMany(myProf);

    return { body: "Init is done" };
  },
});
