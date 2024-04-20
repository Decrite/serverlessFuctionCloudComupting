const { app } = require("@azure/functions");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const url =  "mongodb://{url}"

const client = new MongoClient(url);

app.http("get-profs", {
  methods: ["get"],
  authLevel: "anonymous",
  route: "prof",
  handler: async (request, context) => {
    await client.connect();
    const database = client.db("prof");
    const collection = database.collection("collection1");

    let prof = await collection.find({}).toArray();

    return {
      body: JSON.stringify(prof),
      headers: {
        "Content-Type": "application/json",
      },
    };
  },
});
