const mongoose = require('mongoose');

const uri = "mongodb+srv://micapiacenza:qwerty123@cluster0.wwjtkt2.mongodb.net/?retryWrites=true&w=majority";

// Export an async function that connects to MongoDB and returns the connection
async function connectToMongoDB() {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB Atlas!");

    // Test the connection by listing the collections in your database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in the database:', collections.map(col => col.name));

    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = connectToMongoDB;
