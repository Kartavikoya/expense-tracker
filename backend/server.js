const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Expense = require("./models/Expense");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/expense-tracker")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

/**
 * POST /expenses
 */
app.post("/expenses", async (req, res) => {
  const { amount, category, description, date } = req.body;
  const idempotencyKey = req.headers["idempotency-key"];

  if (!amount || !date) {
    return res.status(400).json({ error: "Amount and date required" });
  }

  if (amount < 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    // Idempotency check
    if (idempotencyKey) {
      const existing = await Expense.findOne({
        idempotency_key: idempotencyKey
      });

      if (existing) return res.json(existing);
    }

    const expenseData = {
  amount,
  category: category?.toLowerCase(),
  description,
  date,
  created_at: new Date()
};

if (idempotencyKey) {
  expenseData.idempotency_key = idempotencyKey;
}

const expense = await Expense.create(expenseData);

    res.json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Insert failed" });
  }
});

/**
 * GET /expenses
 */
app.get("/expenses", async (req, res) => {
  try {
    const { category, sort } = req.query;

    let filter = {};

    if (category) {
      filter.category = new RegExp(category, "i"); // cleaner
    }

    let query = Expense.find(filter);

    if (sort === "date_desc") {
      query = query.sort({ date: -1 });
    }

    const expenses = await query.exec();

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    res.json({ expenses, total });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch failed" });
  }
});

/* Start Server */
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});