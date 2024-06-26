const { app } = require("@azure/functions");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const url = process.env.DB_CONNECTIONSTRING

const client = new MongoClient(url);

app.http("get-prof", {
  methods: ["get"],
  authLevel: "anonymous",
  route: "prof/{id}",
  handler: async (request, context) => {

    await client.connect();
    const database = client.db("prof");
    const collection = database.collection("collection1");
    
    let prof = await collection.findOne({ _id: request.params.id });

    if (!prof) {
      return { status: 400, body: "cant find prof" };
    }

    return {
      body: JSON.stringify(prof),
      headers: {
        "Content-Type": "application/json",
      },
    };
  },
});
