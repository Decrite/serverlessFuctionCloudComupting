const { app } = require("@azure/functions");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const url =
  "mongodb://prof-rating:lHDOsx3Uwn24FYe05It204icticVwz8ikp894GB9bFamUgW5fDIX2b3KR6887avNcYOn3yioZIDYACDb8evVRw==@prof-rating.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@prof-rating@";
const client = new MongoClient(url);

app.http("get-prof", {
  methods: ["get"],
  authLevel: "anonymous",
  route: "prof/{id}",
  handler: async (request, context) => {
    //test
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
