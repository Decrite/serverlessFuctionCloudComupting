const { app } = require("@azure/functions");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const url =
"mongodb://{url}"

const client = new MongoClient(url);

app.http("post-prof", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "prof",
  handler: async (request, context) => {
    await client.connect();
    const database = client.db("prof");
    const collection = database.collection("collection1");

    let data = await request.json()

    let newdata = {
      _id: uuidv4(),
      name: data.body.name,
      rating: data.body.rating,
      categoryId: "someValue", 
    };

    let insert = await collection.insertOne(newdata);
    if (!insert) {
      return { status: 400, body: "add" };
    }

    let stupidData = await collection.find({}).toArray();


    return {
      body: JSON.stringify(stupidData),
      headers: {
        "Content-Type": "application/json",
      },
    };
  },
});
