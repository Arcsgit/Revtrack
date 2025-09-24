// Simple test server to verify everything works
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Test route
app.get("/test", (req, res) => {
  res.send("✅ Backend is working!");
});

// Demo data
const tasks = [
  { id: 1, title: "Test Task", description: "This is a test", status: "pending" }
];

app.get("/task", (req, res) => {
  res.json(tasks);
});

app.post("/task", (req, res) => {
  const { title, description, status } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title: title || "New Task",
    description: description || "No description",
    status: status || "pending"
  };
  tasks.push(newTask);
  res.json([newTask]);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Test Server running at http://localhost:${PORT}`);
  console.log(`✅ Ready to accept requests!`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  process.exit(0);
});
