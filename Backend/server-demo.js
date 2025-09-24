import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Demo data for testing
const demoTasks = [
  {
    id: 1,
    title: "Setup Database",
    description: "Configure Supabase connection and create tables",
    status: "completed",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Build Frontend",
    description: "Create React components for task management",
    status: "in-progress",
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: "Add Authentication",
    description: "Implement user login and registration",
    status: "pending",
    created_at: new Date().toISOString()
  }
];

let nextId = 4;

// Test route
app.get("/test", (req, res) => {
  res.send("✅ Backend is working in DEMO mode!");
});

// Get all tasks (demo data)
app.get("/task", async (req, res) => {
  try {
    res.json(demoTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Insert a new task (demo data)
app.post("/task", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    const newTask = {
      id: nextId++,
      title: title || "New Task",
      description: description || "No description",
      status: status || "pending",
      created_at: new Date().toISOString()
    };
    
    demoTasks.push(newTask);
    res.json([newTask]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Insert sample data
app.post("/insert-sample-data", async (req, res) => {
  try {
    const sampleTasks = [
      {
        id: nextId++,
        title: "Demo Task 1",
        description: "This is a demo task",
        status: "pending",
        created_at: new Date().toISOString()
      },
      {
        id: nextId++,
        title: "Demo Task 2", 
        description: "Another demo task",
        status: "in-progress",
        created_at: new Date().toISOString()
      }
    ];

    demoTasks.push(...sampleTasks);
    
    res.json({ 
      message: "Demo sample data inserted successfully!", 
      count: sampleTasks.length,
      data: sampleTasks 
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Insert single sample task
app.post("/insert-sample-task", async (req, res) => {
  try {
    const sampleTask = {
      id: nextId++,
      title: "New Demo Task",
      description: "This is a demo task created via API",
      status: "pending",
      created_at: new Date().toISOString()
    };

    demoTasks.push(sampleTask);

    res.json({ 
      message: "Demo task inserted successfully!", 
      data: sampleTask 
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Demo Server running at http://localhost:${PORT}`);
  console.log(`📊 Mode: DEMO (no Supabase connection required)`);
  console.log(`🔧 Available endpoints:`);
  console.log(`   GET  /test - Test connection`);
  console.log(`   GET  /task - Get all tasks`);
  console.log(`   POST /task - Create new task`);
  console.log(`   POST /insert-sample-data - Insert sample data`);
  console.log(`   POST /insert-sample-task - Insert single task`);
});
