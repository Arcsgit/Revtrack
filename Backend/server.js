import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json()); // so we can read JSON request bodies

// Create Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Test route
app.get("/test", (req, res) => {
  res.send("✅ Backend is working and connected to Supabase!");
});

// Get all tasks
app.get("/task", async (req, res) => {
  const { data, error } = await supabase.from("tasks").select("*");

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Insert a new task
app.post("/task", async (req, res) => {
  const { title, description, status } = req.body;

  const { data, error } = await supabase
    .from("tasks")
    .insert([{ title, description, status }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Insert sample data
app.post("/insert-sample-data", async (req, res) => {
  try {
    const sampleTasks = [
      {
        title: "Setup Database",
        description: "Configure Supabase connection and create tables",
        status: "completed"
      },
      {
        title: "Build Frontend",
        description: "Create React components for task management",
        status: "in-progress"
      },
      {
        title: "Add Authentication",
        description: "Implement user login and registration",
        status: "pending"
      },
      {
        title: "Deploy Application",
        description: "Deploy to production environment",
        status: "pending"
      },
      {
        title: "Write Documentation",
        description: "Create user guide and API documentation",
        status: "pending"
      }
    ];

    const { data, error } = await supabase
      .from("tasks")
      .insert(sampleTasks)
      .select();

    if (error) {
      console.error("Error inserting sample data:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ 
      message: "Sample data inserted successfully!", 
      count: data.length,
      data: data 
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Insert single sample task
app.post("/insert-sample-task", async (req, res) => {
  try {
    const sampleTask = {
      title: "New Sample Task",
      description: "This is a sample task created via API",
      status: "pending",
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from("tasks")
      .insert([sampleTask])
      .select();

    if (error) {
      console.error("Error inserting sample task:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ 
      message: "Sample task inserted successfully!", 
      data: data[0] 
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📊 Supabase URL: ${process.env.SUPABASE_URL ? '✅ Configured' : '❌ Missing'}`);
  console.log(`🔑 Supabase Key: ${process.env.SUPABASE_ANON_KEY ? '✅ Configured' : '❌ Missing'}`);
});

