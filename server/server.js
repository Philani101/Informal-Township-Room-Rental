import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: '../.env' })

const app = express();
app.use(cors());

const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);

app.get("/users", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("room-rental");
    const users = database.collection("users");
    const allUsers = await users.find().toArray();
    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
