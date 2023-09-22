const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://micapiacenza:Micaela123@cluster0.f1dmgwa.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export an async function that connects to MongoDB and returns the client
async function connectToMongoDB() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected to MongoDB Atlas!");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = connectToMongoDB;
