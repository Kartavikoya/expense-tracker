const connectDB = require("../db"); // adjust path if needed

export default async function handler(req, res) {
  try {
    await connectDB();

    res.status(200).json({ message: "DB connected" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}