import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// =======================
// MYSQL CONNECTION
// =======================
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "chatbotdata",
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB Connection Error:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

// =======================
// SEARCH API
// =======================
app.get("/search", (req, res) => {
  const search = (req.query.q || "").toLowerCase();

  let column = "";

  // 🧠 chatbot keyword logic
  if (search.includes("home")) {
    column = "home";
  } else if (search.includes("about")) {
    column = "about";
  } else if (search.includes("contact")) {
    column = "contactinfo";
  } else {
    return res.json([]);
  }

  const sql = `SELECT ${column} FROM datachattable `;

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});


// =======================
// START SERVER
// =======================
app.listen(5000, () => {
  console.log("✅ Server running at http://localhost:5000");
});