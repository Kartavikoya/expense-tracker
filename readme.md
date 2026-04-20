# 💰 Expense Tracker

A simple full-stack Expense Tracker application that allows users to record and view their daily expenses.

---

## 🚀 Features

* Add new expenses (amount, category, description, date)
* View list of all expenses
* Backend API with MongoDB integration
* Handles real-world conditions (retries, idempotency-ready structure)

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB

### Frontend

* React.js

---

## 📁 Project Structure

```
expense-tracker/
│
├── backend/
│   ├── api/
│   │   └── test.js
│   ├── models/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   ├── vercel.json
│   └── expenses.db
│
├── frontend/
│   ├── build/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── .gitignore
├── Assignment.md
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/Kartavikoya/expense-tracker.git
```

---

### 2. Setup Backend

```
cd backend
npm install
npm start
```

Server runs on:

```
http://localhost:5000
```

---

### 3. Setup Frontend

```
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🔗 API Endpoints

### ➤ Create Expense

```
POST /expenses
```

**Request Body:**

```json
{
  "amount": 100,
  "category": "Food",
  "description": "Lunch",
  "date": "2026-04-20"
}
```

---

### ➤ Get All Expenses

```
GET /expenses
```

---

## 🌍 Deployment

### Backend (Vercel)

* Uses `vercel.json`
* Ensure serverless compatibility

### Frontend (Vercel)

* Run build:

```
npm run build
```

---

## Notes

* Make sure MongoDB is running locally or use MongoDB Atlas
* Update DB connection string in `db.js`
* Ignore `node_modules` using `.gitignore`