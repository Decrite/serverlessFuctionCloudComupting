const { app } = require("@azure/functions");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const url =
"mongodb://{url}"

const client = new MongoClient(url);

app.http("remove-prof", {
  methods: ["delete"],
  authLevel: "anonymous",
  route: "prof/{id}",
  handler: async (request, context) => {
    await client.connect();
    const database = client.db("prof");
    const collection = database.collection("collection1");

    let prof = await collection.deleteOne({ _id: request.params.id });

    let data = await collection.find({}).toArray();

    if (!prof) {
      return { status: 400, body: "cant find prof" };
    }

    return {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  },
});
