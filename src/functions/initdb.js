const { app } = require("@azure/functions");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const url =
  "mongodb://{url}"
const client = new MongoClient(url);

let myProf = [
  {
    _id: uuidv4(),
    name: "test",
    rating: "1",
  },
  {
    _id: uuidv4(),
    name: "test2",
    rating: "2",
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
