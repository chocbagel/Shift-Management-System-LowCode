// server.js - minimal shift backend for Week9
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Allow AppSheet to call API (CORS permissive for demo)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// --- In-memory demo data (you can replace with DB later) ---
const employees = [
  { id: "E001", name: "Alice", skill: "Manager" },
  { id: "E002", name: "Bob", skill: "Cashier" }
];

const shifts = [
  { id: "S001", name: "Morning", start: "08:00", end: "12:00", requiredSkill: "Cashier", requiredStaff: 2, date: "2025-12-01" },
  { id: "S002", name: "Evening", start: "16:00", end: "20:00", requiredSkill: "Cook", requiredStaff: 1, date: "2025-12-01" }
];

const assignments = [
  { id: "A001", employeeId: "E001", shiftId: "S001", date: "2025-12-01", status: "Pending" }
];

// Simple forecast demo (can accept ?date=2025-12-01)
app.get('/forecast', (req, res) => {
  const date = req.query.date || new Date().toISOString().slice(0,10);
  // Return an array of hourly forecasts (demo)
  const sample = [];
  for (let h=8; h<=20; h++) {
    sample.push({ date, hour: h, demand: Math.floor(20 + 10*Math.sin(h/3) + Math.random()*5) });
  }
  res.json({ date, forecast: sample });
});

// Basic read endpoints
app.get('/employees', (req, res) => res.json(employees));
app.get('/shifts', (req, res) => res.json(shifts));
app.get('/assignments', (req, res) => {
  const date = req.query.date;
  if (!date) return res.json(assignments);
  const result = assignments.filter(a => a.date === date);
  res.json(result);
});

// Simple POST example to accept a record write from AppSheet (optional)
app.post('/records', (req, res) => {
  // Accept body: { date, hour, demand }
  const row = req.body;
  // In production you'd save to DB; here just return it
  console.log("New record received:", row);
  res.json({ ok: true, saved: row });
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});