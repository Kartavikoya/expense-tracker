const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = new mongoose.Schema({
  amount: { 
    type: Number, 
    required: true, 
    min: 0   // ✅ prevents negative values
  },
  category: { 
    type: String, 
    required: true 
  },
  description: String,
  date: { 
    type: String, 
    required: true 
  },
  created_at: { 
    type: Date, 
    default: Date.noww 
  },
  idempotency_key: { 
  type: String, 
  unique: true, 
  sparse: true
}
});

module.exports = mongoose.model("Expense", expenseSchema);