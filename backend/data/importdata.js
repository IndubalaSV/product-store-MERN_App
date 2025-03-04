import { MongoClient } from "mongodb";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
// MongoDB Connection URL
const uri = process.env.MONGO_URI;

// Database and Collection Name
const dbName = "product";
const collectionName = "products";

async function importData() {
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Read JSON File
    const jsonData = JSON.parse(fs.readFileSync("data.json", "utf8"));

    // Insert Data
    const result = await collection.insertMany(jsonData);
    console.log(`${result.insertedCount} documents inserted`);
  } catch (err) {
    console.error("Error importing data:", err);
  } finally {
    // Close connection
    await client.close();
  }
}

importData();
