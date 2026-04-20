import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import SummaryChart from "./Summarychart"; 
import "./App.css";
import { v4 as uuidv4 } from "uuid";

const API = "http://localhost:5000/expenses";

function App() {
  const [expenses, setExpenses] = useState([]); // ✅ NOT undefined
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  

  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: ""
  });

  const loadExpenses = useCallback(async () => {
  let url = API + "?";
  if (filter) url += `category=${filter}&`;
  if (sort) url += `sort=${sort}`;

  const res = await axios.get(url);
  setExpenses(res.data?.expenses || []);
  setTotal(res.data?.total || 0);
}, [filter, sort]);

 useEffect(() => {
  loadExpenses();
}, [loadExpenses]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(API, form, {
  headers: {
    "Idempotency-Key": uuidv4()
  }
});

    setForm({ amount: "", category: "", description: "", date: "" });
    loadExpenses();
  };

 return (
  <div className="container">
    <h1 className="title">💰 Expense Tracker</h1>

    <div className="card">
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit} className="form">
        <input className="input" type="number" placeholder="Amount"
          value={form.amount}
          onChange={e => setForm({...form, amount: e.target.value})} />

        <input className="input" placeholder="Category"
          value={form.category}
          onChange={e => setForm({...form, category: e.target.value})} />

        <input className="input" placeholder="Description"
          value={form.description}
          onChange={e => setForm({...form, description: e.target.value})} />

        <input className="input" type="date"
          value={form.date}
          onChange={e => setForm({...form, date: e.target.value})} />

        <button className="button">Add</button>
      </form>
    </div>

    <div className="card">
      <h3>Filter</h3>
      <input
        className="input"
        placeholder="Search by category"
        onChange={e => setFilter(e.target.value.toLowerCase())}
      />

      <button className="button"
        onClick={() => setSort("date_desc")}>
        Sort by Date
      </button>
    </div>

    <h2 className="total">Total: ₹{total}</h2>

    <div className="card">
      <table className="table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(e => (
            <tr key={e.id}>
              <td>₹{e.amount}</td>
              <td>{e.category}</td>
              <td>{e.description}</td>
              <td>{e.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="card">
      <SummaryChart expenses={expenses} />
    </div>
  </div>
);
}

export default App;