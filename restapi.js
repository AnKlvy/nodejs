const { MongoClient } = require("mongodb");
const Express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");


const app = Express();
app.use(cors());
app.use(Express.json()); 

const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);
let students; 

async function connectToMongoDB() {
  try {
    await client.connect();
    const database = client.db("university");
    students = database.collection("students");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}

app.listen(8080, () => {
  connectToMongoDB();
});

app.get("/", (req, res) => {
    res.send("Hello, World!");
  });


// Read collection
app.get("/api", async (request, response) => {
  try {
    const result = await students.find({}).toArray();
    response.send(result);
  } catch (error) {
    console.error("Error fetching students:", error);
    response.status(500).send("Internal Server Error");
  }
});

// Add a new document to the collection
app.post("/api", async (req, res) => {
    try{
    const result = await students.insertOne(req.body);
    res.send(result);
    }
    catch(error){
        console.error("Error fetching students:", error);
    }
});


// Get a single student
app.get("/api/:_id", async (req, res) => {
  let query = { _id: new ObjectId(req.params._id) };
  let result = await students.findOne(query);
  if (!result) {
    res.status(404).json({ error: "Not found" });
  } else {
    res.status(200).json(result);
  }
});

//Update a student
app.put("/api/:_id", async (req, res) => {
  const query = { _id: new ObjectId(req.params._id) };
  console.log(req.params._id)
  const updates = {
    $set: {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password }
  };
  console.log(req.body)
  try{
    let result = await students.updateOne(query, updates);
    console.log(result)
    res.send(result).status(200);
  }
  catch(e){
    console.log(e)
  }

});

// Delete student
app.delete("/api/:_id", async (req, res) => {
  const query = { _id: new ObjectId(req.params._id) };
  try {
    let result = await students.deleteOne(query);
    if (result.deletedCount > 0) {
      res.status(200).send({});
    } else {
      res.status(404).send("Student not found");
    }
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).send("Internal Server Error");
  }
});