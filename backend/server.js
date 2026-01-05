const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// CORS for AppSheet + browser access
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// ======== IN-MEMORY DATA (DEMO ONLY) ========

// 1. Employees
const employees = [
  { EmployeeID: "E001", Name: "Amy", Email: "Amy@gmail.com", Position: "Manager", Skills: "Cash Handling, Customer Service, Team Leadership", Availability: "Full-time"},
  { EmployeeID: "E002", Name: "Bob", Email: "Bob@gmail.com", Position: "Cashier", Skills: "Cash Handling", Availability: "Part-time"}
];

// 2. Shifts
const shifts = [
  { ShiftID: "S001", ShiftName: "Morning", StartTime: "08:00", EndTime: "12:00", RequiredSkill: "Cook" },
  { ShiftID: "S001", ShiftName: "Morning", StartTime: "08:00", EndTime: "12:00", RequiredSkill: "Server" },
  { ShiftID: "S001", ShiftName: "Morning", StartTime: "12:00", EndTime: "16:00", RequiredSkill: "Cashier" },
  { ShiftID: "S001", ShiftName: "Morning", StartTime: "12:00", EndTime: "16:00", RequiredSkill: "Manager" },
  { ShiftID: "S001", ShiftName: "Evening", StartTime: "16:00", EndTime: "20:00", RequiredSkill: "Cashier" },
  { ShiftID: "S002", ShiftName: "Evening", StartTime: "16:00", EndTime: "20:00", RequiredSkill: "Cook" }
];

// 3. ShiftAssignments
const shiftAssignments = [
  { AssignmentID: "A001", ShiftID: "S001", EmployeeID: "E001", Date: "2025-12-01", Status: "Pending" }
];

// 4. ShiftRequests
const shiftRequests = [
  { RequestID: "R001", EmployeeID: "E001", Date: "2025-12-03", RequestType: "Leave", Reason: "Sick Leave", ApprovalStatus: "Pending", SubmittedTime: "2025-12-01 20:30" }
];

// 5. DemandForecast
const demand = [
  { RecordID: "D001", Date: "2025-12-01", Hour: 8, Position: "Server", EmployeesNeed: 10 },
  { RecordID: "D002", Date: "2025-12-01", Hour: 8, Position: "Cook", EmployeesNeed: 5 }
];

// 6. Notifications
const notifications = [
  { NotificationID: "N001", EmployeeID: "E001", Message: "Shift approved", CreatedTime: "2025-12-01 10:00" }
];

// ======== API ROUTES ========

// Employees
app.get('/employees', (req, res) => res.json(employees));

// Shifts
app.get('/shifts', (req, res) => res.json(shifts));

// ShiftAssignments
app.get('/shiftassignments', (req, res) => res.json(shiftAssignments));

// Requests
app.get('/shiftrequests', (req, res) => res.json(shiftRequests));

// DemandForecast
app.get('/demand', (req, res) => res.json(demand));

// Notifications
app.get('/notifications', (req, res) => res.json(notifications));


// ======== START SERVER ========
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});