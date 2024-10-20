const mongoose = require("mongoose");
const fs = require("fs");

require("dotenv").config();

async function main() {
  /**--------------- Not allowed to be edited - start - --------------------- */
  const mongoUri = process.env.MONGODB_URI;
  const collection = process.env.MONGODB_COLLECTION;

  const args = process.argv.slice(2);

  const command = args[0];
  /**--------------- Not allowed to be edited - end - --------------------- */

  // Connect to MongoDB
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Define a schema for the collection
  const schema = new mongoose.Schema({}, { strict: false });
  const MovieModel = mongoose.model(collection, schema);

  switch (command) {
    case "check-db-connection":
      await checkConnection();
      break;
    case "reset-db":
      await MovieModel.deleteMany();
      break;
    case "bulk-insert":
      const data = fs.readFileSync("./seed.json");
      const parsed = JSON.parse(data);
      await MovieModel.insertMany(parsed);
      break;
    case "get-all":
      const movies = await MovieModel.find();
      if (movies.length === 0){
        console.log("Tidak ada data");
      } else {
        console.log(movies);
      }
      break;
    default:
      throw Error("command not found");
  }

  await mongoose.disconnect();
  return;
}

async function checkConnection() {
  console.log("check db connection started...");
  try {
    await mongoose.connection.db.admin().ping();
    console.log("MongoDB connection is successful!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
  console.log("check db connection ended...");
}

main();
