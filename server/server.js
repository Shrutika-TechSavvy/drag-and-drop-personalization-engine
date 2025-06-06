// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/canvasDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema for a canvas item
const itemSchema = new mongoose.Schema({
  uid: String,
  itemType: String,
  name: String,
  emoji: String,
  text: String,
  color: String,
  src: String,
  left: Number,
  top: Number,
});

const CanvasItem = mongoose.model("CanvasItem", itemSchema);

// Get all canvas items
app.get("/items", async (req, res) => {
  const items = await CanvasItem.find();
  res.json(items);
});

// Save canvas items
app.post("/items", async (req, res) => {
  await CanvasItem.deleteMany(); // clear old ones
  await CanvasItem.insertMany(req.body); // save new
  res.json({ success: true });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
